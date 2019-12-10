import { IResponseDate } from './IResponseDate';

export class ICompanyInfo {
    created_at: IResponseDate;
    updated_at: IResponseDate;
    created_by: string;
    updated_by: string;
    user_id: number;
    organisation: string;
    phone: number;
    address: string;
    email: string;
    profile_pic: string;
    logo: string;
    fax: number;
    account_type: string;
    tc_agree: number;
}