import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../../services/employees.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {UsefulPermission} from '../../models/employee';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';
import {MatDialog} from '@angular/material';

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
  private base64Image: any;

  constructor(private employeesService: EmployeesService,
              public dialog: MatDialog,
              formBuilder: FormBuilder,
              activatedRoute: ActivatedRoute,
              private location: Location,
              private domSanitizer: DomSanitizer,
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
        if (this.selectedFile) {
          this.fileUpload();
        } else {
          this.toastrService.success('Employee saved');
          this.location.back();
        }
      } else {
        this.toastrService.error('Error occurs while saving employee');
      }
    });
  }

  private downloadEmployeeAndApplyToForm(): void {
    this.employeesService.getInstance(this.id).subscribe(value => {
      this.formGroup.setValue(
        {
          id: value.id,
          firstName: value.firstName,
          surName: value.surName,
          pesel: value.pesel,
          personalAddress: value.personalAddress,
          taxOfficeAddress: value.taxOfficeAddress,
          yearOfBirthday: value.yearOfBirthday,
          deal: value.deal,
          permissions: {
            lifeguard: {
              refreshedDate: value.permissions.lifeguard.refreshedDate,
              endDate: value.permissions.lifeguard.endDate,
            },
            firstAid: value.permissions.firstAid,
            usefulPermissions: value.permissions.usefulPermissions,
            anotherPermission: value.permissions.anotherPermission,
            medicalExamination: value.permissions.medicalExamination,
            ohstests: value.permissions.ohstests,
            sanel: value.permissions.sanel,
            studentCard: value.permissions.studentCard
          }

        }
      );
      // this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(value.permissions.lifeguard.image.data);
      this.base64Image = value.permissions.lifeguard.image.data;
    });
  }

  onFileSelected($event: Event): void {
    // @ts-ignore
    this.selectedFile = $event.target.files[0];
    this.formGroup.markAsDirty();
  }

  fileUpload(): void {
    this.employeesService.uploadFileForEmployee(this.selectedFile, this.id).subscribe(value => {
      this.toastrService.success('Employee saved');
      this.location.back();
    }, error => {
      console.log(error);
      this.toastrService.warning('Can not upload this file');
    });
  }

  showLifeguardImage() {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      // width: '250px',
      data: {base64Image: this.base64Image}
    });
  }
}
