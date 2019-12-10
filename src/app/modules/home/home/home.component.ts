import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy,ChangeDetectorRef ,Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavBarService } from '../../../shared/services/nav-bar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { LanguageTranslationService } from '../../../shared/services/language-translation.service';
import { LocalStorageUpdateService } from 'src/app/shared/services/local-storage-update.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ViewRef_ } from '@angular/core/src/view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  // Account Modal content
  @ViewChild('modalContent')
  modalContent: string;

  isForgot = false;
  isLogin = true;
    public langModalStatus = false;
  public selectLangFlag = 'ar';
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };
  public language: string;
  public langDisplayClass = 'hide';


  // Account Tab Switcher, default set to login
  public tabSwitcher = 'login';

  private accountNavBtnActionUnsubscribe: Subject<void> = new Subject();
  private forgotPasswordLinkActionUnsubscribe: Subject<void> = new Subject();

  constructor(
    private navBarService: NavBarService,
    private modalService: NgbModal,
    private redirect: Router,
    private localStorage: LocalStorage,
    private languageTranslationService: LanguageTranslationService,
    private localStorageUpdate: LocalStorageUpdateService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private authenticationService: AuthenticationService 
  ) {

    // // Shared Service function of NavBarService to display the account modal
    // this.navBarService.accountNavBtnAction$
    // .pipe(takeUntil(this.accountNavBtnActionUnsubscribe))
    // .subscribe(
    //   (modalStatus: any) => {
    //     if (modalStatus.status) {
    //       this.tabSwitcher = modalStatus.tab;
    //       this.modalService.open(this.modalContent, {
    //         centered: true // To align modal to the center
    //       });
    //     } else {
    //       this.modalService.dismissAll();
    //     }
    //   }
    // );

    // this.navBarService.forgotPasswordLinkAction$
    // .pipe(takeUntil(this.forgotPasswordLinkActionUnsubscribe))
    // .subscribe(
    //   (data) => {
    //     this.isForgot = data.isForgot;
    //     this.isLogin = data.islogin;
    //   }
    // );

   this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        this.selectLangFlag = language;
        this.language = language;
        this.languageTranslationService.onLanguageChange(language);
      },
      error => console.warn(error)
    );

      this.localStorageUpdate.localStorage$.subscribe(data => {
      this.localStorage.getItem<string>('language').subscribe(
        (language: string) => {
          this.selectLangFlag = language;
          this.languageTranslationService.onLanguageChange(language);
        },
        error => console.warn(error)
      );
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
     }


  ngOnInit() {
    this.authenticationService.getMasterData().subscribe(
        (response: { master: any }) => {
          // Stores this in local storage
          if (response) {
            if (response) {
              this.localStorage.setItemSubscribe("__rayei-lookup", response);
            }
          }
        }
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

  redirectPage(){
    this.localStorage.getItem<boolean>('is_authenticated').subscribe(
      (auth: boolean) => {
        if(auth){
          this.redirect.navigate(['/account-summary']);
        } else {
          this.redirect.navigate(['/signup']);
        }
      });
  }
  detectChanges() {
    if (this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed) {
      this.cdr.detectChanges();
    }
  }


}
