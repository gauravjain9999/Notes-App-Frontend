export class Application{
  apiResponseData?: ApiResponseData
  apiResponseStatus?: boolean;
  notesList?: any;
}


export class ApiResponseData{
  username?: string;
  message?: string;
  authorizationToken?: any;
  apiResponseMessage: any;
}
