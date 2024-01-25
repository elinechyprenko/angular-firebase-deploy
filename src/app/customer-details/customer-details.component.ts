import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    location: ['', [Validators.required]]
  })

  // name: AbstractControl = this.form.controls.name;
  // email: AbstractControl = this.form.controls.email;;
  // phone: AbstractControl = this.form.controls.phone;
  // location: AbstractControl = this.form.controls.location;

  constructor(public httpService: HttpService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    // this.createControls();
  }
    onSubmit(): void {
      this.httpService.createData(this.form.value)
    }

    // private createControls() {
    //   this.name.setValue('');
    //   this.email.setValue('');
    //   this.phone.setValue('');
    //   this.location.setValue('');
    // }
  }
