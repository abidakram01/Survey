import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';

// Local Storage package
// https://www.npmjs.com/package/@ngx-pwa/local-storage
import { LocalStorage } from '@ngx-pwa/local-storage';

import { LanguageTranslationService } from '../../../services/language-translation.service';

import { NavBarService } from '../../../services/nav-bar.service';

// Reactive form builder service
// https://angular.io/guide/reactive-forms#generating-form-controls-with-formbuilder
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { IUserProfile } from 'src/app/shared/interfaces';
import { Router, RouterEvent, NavigationEnd, ActivatedRoute, UrlSegment, UrlSerializer } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { LocalStorageUpdateService } from 'src/app/shared/services/local-storage-update.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewRef_ } from '@angular/core/src/view';
import {HandshakeService} from '../../../services/handshake-service';





@Component({
  selector: 'app-rayei',
  templateUrl: './rayei.component.html',
  styleUrls: ['./rayei.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RayeiComponent implements OnInit {

  constructor(
    private languageTranslationService: LanguageTranslationService,
    private localStorage: LocalStorage,
    private navBarService: NavBarService,
    private authenticationService: AuthenticationService,
    private redirect: Router,
    private sanitization: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private localStorageUpdate: LocalStorageUpdateService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private handshakeService: HandshakeService
  ) {
    if (this.redirect.url.includes('company/surveys/')) {
      this.companySurveyFlag = true;
    }

    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        this.selectLangFlag = language;
        this.language = language;
        this.languageTranslationService.onLanguageChange(language);
      },
      error => console.warn(error)
    );

    this.localStorage.getItem<string>('survey_types').subscribe(
      (types: Object) => {
        if (types) {
          this.surveyTypes = types;
        } else {
          // this.navBarService.getCategoryList().subscribe(list => {
          //   this.localStorage.setItemSubscribe('survey_types', list);
          //   this.surveyTypes = list;
          // });
        }
      },
      error => console.warn(error)
    );

    this.localStorage.getItem<string>('client_token').subscribe(
      (data) => {
        if (data) {
          // this.master = data;
        } else {
          // this.handshakeService.doHandshakeAndFetchLookups();
        }
      },
      error => console.warn(error)
    );

    this.localStorage.getItem<string>('lookups').subscribe(
      (data) => {
        if (data) {
          // this.master = data;
        } else {
          // this.handshakeService.doHandshakeAndFetchLookups();
        }
      },
      error => console.warn(error)
    );

    this.authenticationService.userAuth$.subscribe(data => {
      this.userLoggedIn = data;
      if (this.userLoggedIn) {
        this.getUserData();
      }
    });

    this.localStorageUpdate.localStorage$.subscribe(data => {
      this.localStorage.getItem<string>('language').subscribe(
        (language: string) => {
          this.selectLangFlag = language;
          this.languageTranslationService.onLanguageChange(language);
        },
        error => console.warn(error)
      );
      this.getUserData();
    });

    this.languageTranslationService.languageTranslation$.subscribe(language => {
      this.useLang = language === 'en' ? this.langEN : this.langAR;
      this.selectLangFlag = language;
      this.language = language;
      if (language === 'en') {
        this.renderer.removeClass(document.body, 'style-arabic');
      } else {
        this.renderer.addClass(document.body, 'style-arabic');
      }
      this.detectChanges();
    });

    // Shared Service function of NavBarService to display the account modal
    this.navBarService.accountNavBtnAction$.pipe(takeUntil(this.accountNavBtnActionUnsubscribe)).subscribe((modalStatus: any) => {
      if (modalStatus.status) {
        this.tabSwitcher = modalStatus.tab;
        this.modalService.open(this.modalContent, {
          centered: true // To align modal to the center
        });
      } else {
        this.modalService.dismissAll();
      }
    });

    this.navBarService.forgotPasswordLinkAction$.pipe(takeUntil(this.forgotPasswordLinkActionUnsubscribe)).subscribe(data => {
      this.isForgot = data.isForgot;
      this.isLogin = data.islogin;
    });
  }

  @ViewChild('modalContent')
  modalContent: string;

  public langModalStatus = false;
  public selectLangFlag: any;

  public userLoggedIn = true;
  public userData;
  public profile_pic;
  public userProfile: IUserProfile;

  public winDropDownStatus = false;
  public showUserDropDown = false;
  public mobileViewMenu = false;

  public surveyTypes;
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };

  public navSelected;
  public companySurveyFlag = false;

  isForgot = false;
  isLogin = true;

  public language: any;

  // Account Tab Switcher, default set to login
  public tabSwitcher = 'login';

  private accountNavBtnActionUnsubscribe: Subject<void> = new Subject();
  private forgotPasswordLinkActionUnsubscribe: Subject<void> = new Subject();

  /**
   * Method to change language value
   * @param event Event object
   */
  public langDisplayClass = 'hide';

  private scrollTop = 0;
  public topNavClass = false;

  ngOnInit() {
    this.getUserData();
    this.redirect.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.redirect.url.includes('company/surveys/')) {
        this.companySurveyFlag = true;
      } else {
        this.companySurveyFlag = false;
      }
      // this.activeNavIcon();
    });
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  /**
   * Method is called when user click on the profile icon from the nav bar.
   * When called this method checks user authentication status.
   * If authenticated, then a user account dropdown menu will be showed else,
   * call shared service method to show account modal
   */
  displayAccountModal(tabID, e = null) {
    if (!this.userLoggedIn) {
      // Call service to show login modal
      this.navBarService.displayAccountModal({ status: true, tab: tabID });
    } else {
      this.showUserDropDown = true;
    }
  }

  /**
   * Calls shared service method to show change password modal
   */
  displayPasswordModal() {
    this.navBarService.displayPasswordModal();
  }

  /**
   * Method to show/hide win dropdown menu
   */
  toggleWinDropDownStatus() {
    this.winDropDownStatus = this.winDropDownStatus ? false : true;
  }

  /**
   * Method to show/hide mobile view menu
   */
  toggleMobileViewMenu() {
    this.mobileViewMenu = this.mobileViewMenu ? false : true;
  }

  /**
   * Method to show/hide language dropdown menu
   */
  displayLangModal() {
    this.langModalStatus = this.langModalStatus ? false : true;
  }
  selectLang(language: string) {
    this.selectLangFlag = language;
    // this.displayLangModal();
    this.languageTranslationService.onLanguageChange(this.selectLangFlag);
  }
  languageDrop() {
    this.langDisplayClass = this.langDisplayClass === 'hide' ? 'd-block' : 'hide';
  }

  flagchange() {
    this.langDisplayClass = this.langDisplayClass === 'hide' ? 'd-block' : 'hide';
  }

  /**
   * Method listens to the page click event
   * @param event MouseEvent
   */
  @HostListener('document:click', ['$event'])
  onClickEvent(event) {
    // To hide the win drop down menu
    if (this.winDropDownStatus === true && !event.target.className.includes('win-dropdown')) {
      this.toggleWinDropDownStatus();
    }

    // To Hide user drop down menu
    if (this.showUserDropDown === true && !event.target.className.includes('user-menu-status')) {
      this.showUserDropDown = false;
    }

    // To Hide lang drop down menu
    if (this.langDisplayClass === 'd-block' && !event.target.className.includes('lang-selected')) {
      this.languageDrop();
      this.flagchange();
    }
  }

  signOut() {
    this.authenticationService.signOut();
    // add api call to service, subscribe and redirect
    this.redirect.navigate(['/']);
  }

  getUserData() {
    this.localStorage.getItem<boolean>('is_authenticated').subscribe(
      (auth: boolean) => {
        this.userLoggedIn = auth;
        if (this.userLoggedIn === true) {
          // console.log(this.userLoggedIn);
          this.profile_pic = `url('/assets/img/user-default.jpg')`;
          this.localStorage.getItem<string>('userData').subscribe(
            (user: IUserProfile) => {
              this.userData = user;
            // alert(this.userData.admin);
              if (this.userData && this.userData.profile_pic !== '') {
                this.profile_pic = this.sanitization.bypassSecurityTrustStyle(`url(${this.userData.profile_pic})`);
              }

              // console.log( this.userData + "user1");
            },
            error => console.warn(error)
          );
        }
      },
      error => console.warn(error)
    );
  }

  ngOnDestroy() {
    this.accountNavBtnActionUnsubscribe.next();
    this.accountNavBtnActionUnsubscribe.complete();

    this.forgotPasswordLinkActionUnsubscribe.next();
    this.forgotPasswordLinkActionUnsubscribe.complete();
  }

  /**
   * Function to change selected tab in tab switcher
   */
  toggleTabSwitcher(selected) {
    this.tabSwitcher = selected;
    if (this.isForgot === true) {
      this.isForgot = false;
      this.isLogin = true;
    }
  }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.scrollTop = window.pageYOffset;
    if (this.scrollTop >= 10) {
      this.topNavClass = true;
    } else {
      this.topNavClass = false;
    }
  }
}
