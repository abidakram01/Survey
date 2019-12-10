export class IUserProfile {
      provider: string;
    first_name: string;
    last_name: string;
    email: string;
    user_id: number;
    admin: boolean;
    profile_pic: string;
    language_code: string;
    photoUrl: string;
    authToken: string;
    idToken: string;
    authorizationCode: string;
    /**
     * Contains the entire object returned from the Facebook API based on the fields you requested.
     * Only available for the Facebook provider.
     * Refer to the Graph API for details: https://developers.facebook.com/docs/graph-api
     */
    facebook?: any;
    /**
     * Contains the entire object returned from the Linked In API based on the fields you requested.
     * Only available for the Linked In provider.
     * Refer to the Linked In docs: https://developer.linkedin.com/docs/fields
     */
    linkedIn?: any;




}
