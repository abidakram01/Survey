import { Component, OnInit, Input } from '@angular/core';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { LocalStorage } from '@ngx-pwa/local-storage';
import { IUserProfile } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Property to switch the Account(login/singup) modal tabs
  @Input()
  selected: string;

  // Property to show form validation message from server
  loginFail = false;

  // Property to show sinning loader near the submit button
  submitted = false;

  // public type: any = 'user';

  // Reactive form object for login
  // https://angular.io/guide/reactive-forms
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false),
    // user_type: new FormControl('user', [Validators.required]),
  });

  // Javascript Getters return form control object,
  // these are used to show validation messages
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // To hide/show password
  public passwordType = 'password';
  public eyeImage = 'fa-eye-slash';

  //Store client_token 
  public client_token: any;

  constructor(
    private navBarService: NavBarService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private localStorage: LocalStorage,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.localStorage.getItem("__rayei-client-token").subscribe((data) => {
      this.client_token = data;
    });
  }

  // toggle(val) {
  //   this.type = val;
  // }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  //facebook login

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then();
  }

  /**
  * Method show the forgot password tab contents
  */
  onForgotClick() {
    this.navBarService.showForgotPassword({ islogin: false, isForgot: true });
  }

  /**
   * Method to toggle password show and hide functionality
   */
  togglePasswordDisplay() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.eyeImage = this.eyeImage === 'fa-eye-slash' ? 'fa-eye' : 'fa-eye-slash';
  }

  /**
   * Method is called on login form submit
   */
  onLogin() {
    if (this.client_token) {
      this.loginForm.value['client_token'] = this.client_token;
    }

    if (this.loginForm.valid) {
      this.submitted = true;
      this.authenticationService.authenticateUser(this.loginForm.value).subscribe(
        response => {
          //Check if client_token is present 
          if (response.client_token) {
            this.localStorage.setItemSubscribe("__rayei-client-token", response.client_token);
            this.router.navigate(['/account-summary']);
          } else {
            this.router.navigate(['/account-summary']);
          }
          // Hides the Accounts(login/singup) modal
          // this.navBarService.displayAccountModal(false);
          // redirecting user to the login page
          // this.authenticationService.setUserProfileForDashboard()
          //     .then(
          //       data => {
          // if( this.activatedRoute.snapshot['_routerState'].url === '/'){

          // }
          //   }
          // )

          this.submitted = false;
        },
        error => {
          this.loginFail = true;
          this.submitted = false;
        },
        () => {
          // Service call to get master data on login service completion
          // if (!this.loginFail) {
          //   this.authenticationService.setUserAndMasterData();
          // }
        }
      );
    } else {
      this.submitted = false;
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
