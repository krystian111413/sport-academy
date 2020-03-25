import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../../services/employees.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';
import {MatDialog} from '@angular/material';
import {Employee} from '../../models/employee';
import {ConfirmDialogService} from '../../../../shared/confirm-dialog/services/confirm-dialog.service';

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
  medicalExaminationForm: FormGroup;
  OHSTestsForm: FormGroup;
  sanelForm: FormGroup;
  studentCardForm: FormGroup;
  dealForm: FormGroup;
  usefulPermissionsGroup: FormGroup;
  employee: Employee;

  constructor(private employeesService: EmployeesService,
              private confirmDialogService: ConfirmDialogService,
              public dialog: MatDialog,
              formBuilder: FormBuilder,
              activatedRoute: ActivatedRoute,
              private location: Location,
              private domSanitizer: DomSanitizer,
              private toastrService: ToastrService) {
    this.usefulPermissionsGroup = formBuilder.group({
      frogman: [false],
      swimmingInstructor: [false],
      yachtSailor: [false],
      helmsman: [false],
    });
    this.dealForm = formBuilder.group({
      dealType: ['', Validators.required],
      place: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['']
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
      releaseDate: ['', Validators.required],
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
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.taxOfficeAddressForm = formBuilder.group({
      address: ['', Validators.required]
    });
    this.permissionsGroup = formBuilder.group({
      lifeguard: this.lifeguardForm,
      firstAid: this.firstAidForm,
      usefulPermissions: this.usefulPermissionsGroup,
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
        this.location.back();
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
          deal: {
            place: value.deal.place,
            startDate: value.deal.startDate,
            endDate: value.deal.endDate,
            dealType: value.deal.dealType
          },
          permissions: {
            lifeguard: {
              releaseDate: value.permissions.lifeguard.releaseDate
            },
            firstAid: {
              refreshedDate: value.permissions.firstAid.refreshedDate,
              endDate: value.permissions.firstAid.endDate,
            },
            usefulPermissions: {
              frogman: value.permissions.usefulPermissions.frogman,
              swimmingInstructor: value.permissions.usefulPermissions.swimmingInstructor,
              yachtSailor: value.permissions.usefulPermissions.yachtSailor,
              helmsman: value.permissions.usefulPermissions.helmsman,
            },
            anotherPermission: value.permissions.anotherPermission,
            medicalExamination: {
              refreshedDate: value.permissions.medicalExamination.refreshedDate,
              endDate: value.permissions.medicalExamination.endDate,
            },
            ohstests: {
              refreshedDate: value.permissions.ohstests.refreshedDate,
              endDate: value.permissions.ohstests.endDate,
            },
            sanel: {
              endDate: value.permissions.sanel.endDate
            },
            studentCard: {
              endDate: value.permissions.studentCard.endDate
            }
          }

        }
      );
      this.employee = value;
    });
  }

  onFileSelected($event: Event, fileName: string): void {
    const file = $event.target['files'][0];
    this.fileUpload(file, fileName);
  }

  fileUpload(file: any, fileName: string): void {
    this.employeesService.uploadFileForEmployee(fileName, file, this.id).subscribe(value => {
      this.toastrService.success('Zdjęcie zaktualizowane');
      this.replaceImage(file, fileName);
    }, error => {
      console.log(error);
      this.toastrService.warning('Problem z wysłanie zdjęcia');
    });
  }

  showImage(fileName: string) {
    let data;
    switch (fileName) {
      case 'deal':
        data = this.employee.deal.image;
        break;
      case 'lifeguard':
        data = this.employee.permissions.lifeguard.image;
        break;
      case 'firstAid':
        data = this.employee.permissions.firstAid.image;
        break;
      case 'frogman':
        data = this.employee.permissions.usefulPermissions.frogmanImage;
        break;
      case 'swimmingInstructor':
        data = this.employee.permissions.usefulPermissions.swimmingInstructorImage;
        break;
      case 'helmsman':
        data = this.employee.permissions.usefulPermissions.helmsmanImage;
        break;
      case 'yachtSailor':
        data = this.employee.permissions.usefulPermissions.yachtSailorImage;
        break;
      case 'anotherPermission':
        data = this.employee.permissions.anotherPermissionImage;
        break;
      case 'medicalExamination':
        data = this.employee.permissions.medicalExamination.image;
        break;
      case 'ohstests':
        data = this.employee.permissions.ohstests.image;
        break;
      case 'sanel':
        data = this.employee.permissions.sanel.image;
        break;
      case 'studentCard':
        data = this.employee.permissions.studentCard.image;
        break;
    }
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      // width: '250px',
      data: {base64Image: data}
    });
  }

  private replaceImage(file: any, fileName: string): void {
    let reader = new FileReader();
    reader.onload = ev => {
      switch (fileName) {
        case 'deal':
          this.employee.deal.image = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'lifeguard':
          this.employee.permissions.lifeguard.image = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'firstAid':
          this.employee.permissions.firstAid.image = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'frogman':
          this.employee.permissions.usefulPermissions.frogmanImage = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'swimmingInstructor':
          this.employee.permissions.usefulPermissions.swimmingInstructorImage = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'helmsman':
          this.employee.permissions.usefulPermissions.helmsmanImage = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'yachtSailor':
          this.employee.permissions.usefulPermissions.yachtSailorImage = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'anotherPermission':
          this.employee.permissions.anotherPermissionImage = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'medicalExamination':
          this.employee.permissions.medicalExamination.image = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'ohstests':
          this.employee.permissions.ohstests.image = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'sanel':
          this.employee.permissions.sanel.image = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
        case 'studentCard':
          this.employee.permissions.studentCard.image = {
            data: btoa(reader.result.toString()),
            type: ''
          };
          break;
      }

    };
    reader.readAsBinaryString(file);
  }

  isPhoto(fileName: string): boolean {
    if (!this.employee) {
      return false;
    }
    switch (fileName) {
      case 'deal':
        return !!this.employee.deal.image;
      case 'lifeguard':
        return !!this.employee.permissions.lifeguard.image;
      case 'firstAid':
        return !!this.employee.permissions.firstAid.image;
      case 'frogman':
        return !!this.employee.permissions.usefulPermissions.frogmanImage;
      case 'swimmingInstructor':
        return !!this.employee.permissions.usefulPermissions.swimmingInstructorImage;
      case 'helmsman':
        return !!this.employee.permissions.usefulPermissions.helmsmanImage;
      case 'yachtSailor':
        return !!this.employee.permissions.usefulPermissions.yachtSailorImage;
      case 'anotherPermission':
        return !!this.employee.permissions.anotherPermissionImage;
      case 'medicalExamination':
        return !!this.employee.permissions.medicalExamination.image;
      case 'ohstests':
        return !!this.employee.permissions.ohstests.image;
      case 'sanel':
        return !!this.employee.permissions.sanel.image;
      case 'studentCard':
        return !!this.employee.permissions.studentCard.image;
    }
  }

  onDelete(): void {
    this.confirmDialogService.open({message: 'Czy na pewno chesz usunąć pracownika?'}).subscribe(value => {
      if (value) {
        this.employeesService.deleteInstance(this.id).subscribe(value => {
          if (value) {
            this.toastrService.success('Pracownik usunięty');
            this.location.back();
          } else {
            this.toastrService.warning('Nie można usunąć pracownika');
          }
        });
      }
    });

  }
}
