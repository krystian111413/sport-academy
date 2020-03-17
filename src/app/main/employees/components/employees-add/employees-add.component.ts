import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsefulPermission} from '../../models/employee';
import {EmployeesService} from '../../services/employees.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.scss']
})
export class EmployeesAddComponent implements OnInit {

  formGroup: FormGroup;
  permissionsGroup: FormGroup;
  personalAddressForm: FormGroup;
  taxOfficeAddressForm: FormGroup;
  lifeguardForm: FormGroup;
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
  id: string;

  constructor(private employeesService: EmployeesService,
              formBuilder: FormBuilder,
              activatedRoute: ActivatedRoute,
              private location: Location,
              private toastrService: ToastrService) {
    this.taxOfficeAddressForm = formBuilder.group({
      address: ['', Validators.required]
    });
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
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      pesel: ['', Validators.required],
      personalAddress: this.personalAddressForm,
      taxOfficeAddress: this.taxOfficeAddressForm,
      yearOfBirthday: ['', Validators.required],
      deal: this.dealForm,
      permissions: this.permissionsGroup

    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.employeesService.addEmployee(this.formGroup.value).subscribe(employee => {
        this.toastrService.success('Pracownik dodany');
        this.id = employee.id;
        this.fileUpload();
        this.location.back();
    }, error => {
      this.toastrService.error('Bład podczas dodawnia pracownika');
    });
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
}
