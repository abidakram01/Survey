import {
    IWinSurveyPage,
    IResponseDate,
    IResponseCategory,
    IWinCompanyInfo
 } from './index';


export class IWinSurvey {
    _id: {
        $oid: string;
    };
    id: number;
    created_at: IResponseDate;
    updated_at: IResponseDate;
    created_by: string;
    updated_by: string;
    pages: IWinSurveyPage[];
    name: string;
    status: boolean;
    code: any;
    category: IResponseCategory;
    url_code: string;
    company_info: IWinCompanyInfo;
}
