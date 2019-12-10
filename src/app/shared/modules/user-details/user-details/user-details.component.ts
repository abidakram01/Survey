import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { UserCollectService } from 'src/app/shared/services/user-collect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userID;
  public formError = false;
  public serverError = false;

  public userForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    forename: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9\+\-\s]{5,20}$')]),
    status: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    // town: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nationality: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    religion: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required])
  });

  get title() {
    return this.userForm.get('title');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  get forename() {
    return this.userForm.get('forename');
  }

  get surname() {
    return this.userForm.get('surname');
  }

  get dob() {
    return this.userForm.get('dob');
  }

  get mobile() {
    return this.userForm.get('mobile');
  }

  get email() {
    return this.userForm.get('email');
  }

  get status() {
    return this.userForm.get('status');
  }

  get city() {
    return this.userForm.get('city');
  }

  get nationality() {
    return this.userForm.get('nationality');
  }

  // get city() {
  //   return this.userForm.get('city');
  // }

  get language() {
    return this.userForm.get('language');
  }

  get religion() {
    return this.userForm.get('religion');
  }

  get country() {
    return this.userForm.get('country');
  }

  constructor(private submitObject: UserCollectService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
  }

  /**
   * Survey submit click event
   * @param event Form submit event
   */
  onFormSubmit(event) {
    console.log(this.userForm);
    if (this.userForm.valid) {
      let formData = new FormData();
      formData.append('title', this.userForm.value.title);
      formData.append('email', this.userForm.value.email);
      formData.append('mobile', this.userForm.value.mobile);
      formData.append('forename', this.userForm.value.forename);
      formData.append('surname', this.userForm.value.surname);
      formData.append('gender', this.userForm.value.gender);
      formData.append('dob', this.userForm.value.dob);
      // formData.append('religion', this.userForm.value.religion);
      formData.append('country', this.userForm.value.country);
      formData.append('city', this.userForm.value.city);
      formData.append('town', this.userForm.value.town);
      // formData.append('ethnic', this.userForm.value.ethnic);
      formData.append('nationality', this.userForm.value.nationality);
      formData.append('language', this.userForm.value.language);
      formData.append('photo', this.userForm.value.photo);
      formData.append('status', this.userForm.value.status);
      console.log(formData);
      this.submitObject.submitData(this.userID, formData)
        .subscribe(
          (data) => {
            this.formError = true;
            this.router.navigate(['/survey/thankyou']);
            console.log(data);
          },
          (error) => {
            this.serverError = true;
            console.log(error.status, 'error');
          }
        );
    }
    else{
      this.formError = true;
    }
  //  event.preventDefault();
    // this.surveyDataService.onSurveyAttendFormSubmit(
    //   this.surveyData,
    //   this.questionForm
    // );
  }

  fileChange(event) {console.log(event);
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.userForm.patchValue({
          photo: file
        });
    }
  }
}