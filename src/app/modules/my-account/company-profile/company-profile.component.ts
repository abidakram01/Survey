import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  public companyForm = new FormGroup({
    profilepic: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10), // Min digits
      Validators.maxLength(13) // Max digits
    ]),
    email: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    _id: new FormControl('', [Validators.required]),
  });


  constructor() { }

  get name() { return this.companyForm.get('name'); }
  get email() { return this.companyForm.get('email'); }
  get phone() { return this.companyForm.get('phone'); }
  get age() { return this.companyForm.get('age'); }
  get address1() { return this.companyForm.get('address1'); }
  get city() { return this.companyForm.get('city'); }
  get province() { return this.companyForm.get('province'); }
  get country() { return this.companyForm.get('country'); }
  get _id() { return this.companyForm.get('_id'); }

  ngOnInit() {
  }
  onFormSubmit() {
    // emit function will pass the current form data to the parent component(create/delete)
    // https://angular.io/api/core/EventEmitter
    if (this.companyForm.valid) {
      console.log(this.companyForm.value);
    }
  }

}
