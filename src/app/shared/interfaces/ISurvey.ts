 import { IPage } from './IPage';
import { SurveyStatus } from '../enum/SurveyStatus';

export interface ISurvey {
  id?: number | string;
  company_id?: number;
  name?: string;
  description?: string;
  get_user_data?: boolean;
  thankyou_message?: string;
  expiry_date?: { $date: number} | number;
  category?: { category ?: string; status?: boolean, component_id?: string };
  status: SurveyStatus;
  pages: IPage[];
  _id?: { $oid: string };
  created_at?: { $date?: number };
  updated_at?: { $date?: number };
  created_by?: string;
  updated_by?: string;
  url_code?: string;
  survey_types?: string;
  survey_language?: string;
  survey_logo?: string;
  code?: any;
  company_info?: {
    created_at?: {
      $date?: number
    },
    updated_at?: {
      $date?: number
    },
    created_by?: string,
    updated_by?: string,
    user_id?: 2,
    organisation?: string,
    phone?: string,
    address?: string,
    email?: string,
    profile_pic?: string,
    logo?: string,
    fax?: string,
    account_type?: string,
    slug?: null,
    tc_agree?: 1,
    activation_token?: null
  };
  component_id?: string;
  survey_type?: number;
  user_type?: string;
  user_info?: {
    user_type?: string,
    first_name?: string,
    last_name?: string,
    email?: string
    phone?: string
  };
  duration_id?:  any ;
  prize_id?: any ;

}


// 20190126052342
// http://35.200.169.173/api/2/surveys

