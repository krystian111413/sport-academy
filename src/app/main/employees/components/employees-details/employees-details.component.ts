import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../../services/employees.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {UsefulPermission} from '../../models/employee';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent implements OnInit {

  formGroup: FormGroup;
  permissionsGroup: FormGroup;
  personalAddressForm: FormGroup;
  taxOfficeAddressForm: FormGroup;
  lifeguardForm: FormGroup;
  id: string;
  firstAidForm: FormGroup;
  usefulPermissions: UsefulPermission[] = [
    UsefulPermission.frogman,
    UsefulPermission.helmsman,
    UsefulPermission.powerboating,
    UsefulPermission.swimmingInstructor,
    UsefulPermission.yachtSailor,
  ];
  medicalExaminationForm: FormGroup;
  OHSTestsForm: FormGroup;
  sanelForm: FormGroup;
  studentCardForm: FormGroup;
  dealForm: FormGroup;
  selectedFile = null;

  constructor(private employeesService: EmployeesService,
              formBuilder: FormBuilder,
              activatedRoute: ActivatedRoute,
              private location: Location,
              private toastrService: ToastrService) {
    this.dealForm = formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.studentCardForm = formBuilder.group({
      endDate: ['']
    });
    this.sanelForm = formBuilder.group({
      endDate: ['', Validators.required]
    });
    this.medicalExaminationForm = formBuilder.group({
      refreshedDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.OHSTestsForm = formBuilder.group({
      refreshedDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.lifeguardForm = formBuilder.group({
      filePath: [''],
      refreshedDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.firstAidForm = formBuilder.group({
      refreshedDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.personalAddressForm = formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      buildingNumber: ['', Validators.required],
      code: ['', Validators.required],
    });
    this.taxOfficeAddressForm = formBuilder.group({
      address: ['', Validators.required]
    });
    this.permissionsGroup = formBuilder.group({
      lifeguard: this.lifeguardForm,
      firstAid: this.firstAidForm,
      usefulPermissions: [[]],
      anotherPermission: [''],
      medicalExamination: this.medicalExaminationForm,
      ohstests: this.OHSTestsForm,
      sanel: this.sanelForm,
      studentCard: this.studentCardForm,
    });
    this.formGroup = formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      pesel: ['', Validators.required],
      personalAddress: this.personalAddressForm,
      taxOfficeAddress: this.taxOfficeAddressForm,
      yearOfBirthday: ['', Validators.required],
      deal: this.dealForm,
      permissions: this.permissionsGroup

    });
    this.id = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.downloadEmployeeAndApplyToForm();
  }

  onSave(): void {
    this.employeesService.update(this.id, this.formGroup.value).subscribe(success => {
      if (success) {
        this.toastrService.success('Employee saved');
        this.fileUpload();
        this.location.back();
      } else {
        this.toastrService.error('Error occurs while saving employee');
      }
    });
  }

  private downloadEmployeeAndApplyToForm(): void {
    this.employeesService.getInstance(this.id).subscribe(value => {
      this.formGroup.setValue(value);
      // this.firstAidForm.setValue(value.permissions.firstAid);
    })
  }

    onFileSelected($event: Event): void {
    // @ts-ignore
    this.selectedFile = $event.target.files[0];
  }

  fileUpload(): void {
    this.employeesService.uploadFileForEmployee(this.selectedFile, this.id).subscribe(value => {
      console.log('successful upload');
      console.log(value);
    });
  }

  downloadFile() {
    this.employeesService.downloadFile(this.id);
  }

}
