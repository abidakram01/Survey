import { Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment as env } from '../../../../environments/environment';
import { ContactUsService } from '../services';
import { ViewRef_ } from '@angular/core/src/view';
import { LanguageTranslationService } from 'src/app/shared/services/language-translation.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [ContactUsService]
})
export class ContactUsComponent implements OnInit {

  // Property to hold chosen language
  public language: any;

  public contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[+]{0,1}[0-9]+'),
      Validators.maxLength(15)]),
    subject: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    document: new FormControl('')
  });

  public submitted = false;
  public hasServerError = false;
  public contactSuccess = false;

  // Property used to expand/collapse the category drop-down menu
  public categoryDownDownStatus = false;

  // Property to show current selected value
  public selectedCategory = '';
       // public file: File;
  public useLang: { name: string };
  public langEN = { name: 'name_en' };
  public langAR = { name: 'name_ar' };

  public master;

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get category() {
    return this.contactForm.get('category');
  }
  get message() {
    return this.contactForm.get('message');
  }

  constructor(private contactUsService: ContactUsService,
    private localStorage: LocalStorage,
    private languageTranslationService: LanguageTranslationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.localStorage.getItem<string>('master').subscribe(
      (data: string) => {
        this.master = data;
       },
      error => console.warn(error)
    );
    // Gets the chosen language
    this.localStorage.getItem<string>('language').subscribe(
      (language: string) => {
        if (language) {
          this.language = language;
        } else {
          this.language = env.defaultLanguage;
        }
        this.useLang = language === 'en' ? this.langEN : this.langAR;
      },
      err => this.language = env.defaultLanguage
    );

    // Subscribing to the language changes
    this.languageTranslationService.languageTranslation$
    .subscribe(
      (language) => {
        this.language = language;
        this.useLang = language === 'en' ? this.langEN : this.langAR;
        this.detectChanges();
      }
    );
  }


  onContactFormSubmit() {
    if (this.contactForm.valid) {
      this.submitted = true;
    const formData = new FormData();
    formData.append('name', this.contactForm.value.name);
    formData.append('email', this.contactForm.value.email);
    formData.append('phone', this.contactForm.value.phone);
    formData.append('subject', this.contactForm.value.subject);
    formData.append('category', this.contactForm.value.category);
    formData.append('message', this.contactForm.value.message);
    formData.append('document', this.contactForm.value.document);
      this.contactUsService.saveContactUsData(formData)
        .subscribe(
          (data) => {
            this.submitted = false;
            this.contactSuccess = true;
            this.selectedCategory = '';
            // this.contactForm.value.document.reset();
              this.contactForm.reset(); // Added this

          },
          (error) => {
            console.log(error.status, 'error');
            this.hasServerError = true;
            this.submitted = false;
          }
        );
    } else {
      Object.keys(this.contactForm.controls).forEach(field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

   /**
   * To expand/collapse the survey category drop-down
   */
  toggleCategoryDownDown() {
    this.categoryDownDownStatus = this.categoryDownDownStatus ? false : true;
  }

  /**
   * Method to update value of the survey type form value
   * @param category Survey Type data
   */
  onCategorySelect(category) {
    this.selectedCategory = category[this.useLang.name];
    this.contactForm.patchValue({
      category: category.id
    });
  }

  /**
   * To trigger change detection
   */
  detectChanges() {
    if ( this.cdr !== null &&
      this.cdr !== undefined &&
      ! (this.cdr as ViewRef_).destroyed ) {
      this.cdr.detectChanges();
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file: File = fileList[0];
        // this.contactForm.get('profile').setValue(file);
        this.contactForm.patchValue({
          document: file
        });
}
}
}
