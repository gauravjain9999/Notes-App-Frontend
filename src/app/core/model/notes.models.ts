export class Application{
  apiResponseData?: ApiResponseData
  apiResponseStatus?: boolean;
  notesList?: any;
}


export class ApiResponseData{
  username?: string;
  message?: string;
  name?: string;
  authorizationToken?: any;
  apiResponseMessage: any;
}
