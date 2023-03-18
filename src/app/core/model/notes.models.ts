export class Application{
  apiResponseData?: ApiResponseData
  apiResponseStatus?: boolean;
  notesList?: any;
}


export class ApiResponseData{
  userName?: string;
  message?: string;
  name?: string;
  notesList?:any;
  authorizationToken?: any;
  apiResponseMessage: any;
}
