import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../../services/employees.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  medicalExaminationForm: FormGroup;
  OHSTestsForm: FormGroup;
  sanelForm: FormGroup;
  studentCardForm: FormGroup;
  dealForm: FormGroup;
  id: string;
  usefulPermissionsGroup: FormGroup;

  constructor(private employeesService: EmployeesService,
              formBuilder: FormBuilder,
              activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private toastrService: ToastrService) {
    this.usefulPermissionsGroup = formBuilder.group({
      frogman: [false],
      swimmingInstructor: [false],
      yachtSailor: [false],
      helmsman: [false],
    });
    this.taxOfficeAddressForm = formBuilder.group({
      address: ['', Validators.required]
    });
    this.dealForm = formBuilder.group({
      place: ['', Validators.required],
      dealType: ['', Validators.required],
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
      releaseDate: ['', Validators.required]
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
      this.id = employee.id;
      this.toastrService.success('Pracownik dodany');
      // this.location.back();
      this.router.navigateByUrl(`/main/employees/${this.id}`);

    }, error => {
      this.toastrService.error('Bład podczas dodawnia pracownika');
    });
  }

}
