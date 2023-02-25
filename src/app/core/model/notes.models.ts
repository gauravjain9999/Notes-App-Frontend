export class Application{
  apiResponseData?: ApiResponseData
  apiResponseStatus?: boolean;
}


export class ApiResponseData{
  username?: string;
  message?: string;
  apiResponseMessage: any;
}
