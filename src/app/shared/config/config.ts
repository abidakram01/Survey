import { Location } from '@angular/common';
/**
 * Application configuration
 */
export const getExtraConfig = (env) => {
  // development api URL
  let siteDomain = 'http://rayei-dev-site.s3-website.us-east-2.amazonaws.com/';
  let apiDomain = 'http://ec2-13-59-72-71.us-east-2.compute.amazonaws.com:8000/v1/';

  if (env.production) {
    // Production api URL
    siteDomain = 'http://rayei-dev-site.s3-website.us-east-2.amazonaws.com/';
    apiDomain = 'http://ec2-13-59-72-71.us-east-2.compute.amazonaws.com:8000/v1/';
  }

  return {
    apiDomain,
    siteDomain,
    defaultLanguage: 'en',
    apiUrl: {
      get login() {
        return apiDomain + 'auth/login/';
      },
      signOut() {
        return apiDomain + 'auth/logout/';
      },
      get singup() {
        return apiDomain + 'auth/signup/';
      },
      get winCompanyList() {
        return apiDomain + 'win/company-list';
      },
      get contactUs() {
        return apiDomain + 'slug';
      },
      get winCompanySuveys() {
        return apiDomain + 'win/surveys';
      },
      get createStaticPage() {
        return apiDomain + 'pages/';
      },
      get fetchMaster() {
        return apiDomain + 'lookup/';
      },
      get getUserProfile() {
        return apiDomain + 'auth/user/profile/';
      },
      get companyProfile() {
        return apiDomain + 'auth/user/profile/';
      },
      get recentSurveys() {
        return apiDomain + 'recent-surveys/';
      },
      get activateAccount() {
        return apiDomain + 'auth/user/activate/${id}/';
      },
      get companySurveys() {
        return apiDomain + 'survey/surveys';
      },
      get getChangePasswordUrl() {
        return apiDomain + 'auth/password/change/';
      },
      get getResetPasswordUrl() {
        return apiDomain + 'auth/password/reset/';
      },
      get getForgotPasswordUrl() {
        return apiDomain + 'auth/password/reset_request/';
      },
      get getLookup() {
        return apiDomain + 'v1/lookup/';
      },
      get deleteSurvey() {
        return (surveyId: number) => `${apiDomain}survey/delete/${surveyId}/`;
      },
      get disableSurvey() {
        return (surveyId: number) => `${apiDomain}survey/disable/${surveyId}/`;
      },
      get listStaticPages() {
        return apiDomain + 'pages/';
      },
      get staticPageAPI() {
        return apiDomain + 'page/';
      },
      get surveyReport() {
        return (id: number) => `${apiDomain}survey/${id}/report`;
      },
      get contactUsAPI() {
        return apiDomain + 'contact-us/';
      },
      get companyToken() {
        return (id: number) => `${apiDomain}company-code/${id}`;
      },
      get companyTokenSurveys() {
        return (id: string) => `${apiDomain}company-surveys/${id}`;
      },
      get surveyCount() {
        return apiDomain + 'dashboard-report/';
      },
      get userDataUrl() {
        return (id: number) => `${apiDomain}user-details/${id}`;
      },
      get handshake() {
        return apiDomain + 'handshake/?lookups=true';
      },
    },
    siteUrl: {
      get share() { return siteDomain + 'survey/attend/'; }
    },
    companyURL: {
      get share() { return siteDomain + 'company/surveys/'; }
    },
    updateProfileUrl(id) {
      return apiDomain + 'auth/user/profile/';
    },
    /**
     * To get url for the static routes
     * @param pageSlug slug of the static content
     */
    staticPageUrl(pageSlug) {
      let url = apiDomain;
      const queryString = '?format=json';
      url += 'page/' + pageSlug + queryString;
      // switch (pageSlug) {
      //   case 'contact-us':
      //     url += 'page/' + pageSlug + queryString;
      //     break;
      //   default:
      //     break;
      // }
      return url;
    },
    /**
     * To get url of the survey routes
     * @param httpMethod HTTP Method used in the service
     * @param karg ID to pass as object { companyId, surveyId}
     */
    getSurveyUrl(httpMethod: string, karg: { companyId?: number, surveyId?: number }) {
      if (
        karg && karg.hasOwnProperty('companyId') &&
        (httpMethod.toLocaleUpperCase() === 'GET' ||
          httpMethod.toLocaleUpperCase() === 'POST')
      ) {
        return apiDomain + 'survey/surveys/';
      } else if (
        karg && karg.hasOwnProperty('surveyId') &&
        (httpMethod.toLocaleUpperCase() === 'GET' ||
          httpMethod.toLocaleUpperCase() === 'PUT' ||
          httpMethod.toLocaleUpperCase() === 'DELETE')
      ) {
        return apiDomain + 'survey/surveys/' + karg.surveyId;
      }
    },

    /**
     * To get url for attend survey
     * @param surveyId Survey ID
     */
    getAttendSurveyUrl(surveyId) {
      return apiDomain + 'answer/' + surveyId;
    },

    /**
     * To get url of the survey routes
     */
    getAllSurveysUrl(id) {
      return apiDomain + 'survey/surveys/?page_size=20&page=1&category__id=' + id + '&survey_type__id=1';
    },

    signOut() {
      return apiDomain + 'auth/logout/';
    },

    // getCategorySurveysUrl(id) {
    //   return apiDomain + 'win/' + id + '/surveys';
    // },

    getBulkUploadUrl() {
      return apiDomain + 'bulk-upload/';
    },

    getEmailSendUrl() {
      return apiDomain + 'survey/share/';
    },

    getLogoUpdateUrl(survey_id) {
      return `${apiDomain}survey-logo/${survey_id}`;
    },
    categoryList(){
      return apiDomain + 'asdfg';
    }
  };
};
