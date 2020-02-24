import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeesService} from "../../services/employees.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent implements OnInit {

  formGroup: FormGroup;
  id: string;

  constructor(private employeesService: EmployeesService,
              formBuilder: FormBuilder,
              activatedRoute: ActivatedRoute,
              private location: Location,
              private toastrService: ToastrService) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      city: ['', Validators.required],
      age: ['', Validators.required],
      pesel: ['', Validators.required]
    });
    this.id = activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.employeesService.update(this.id, this.formGroup.value).subscribe(success => {
      if (success){
        this.toastrService.success("Employee saved");
        this.location.back();
      } else {
        this.toastrService.error("Error occurs while saving employee")
      }
    });
  }
}
