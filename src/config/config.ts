interface BaseResponse {
    code : number,
    status : string
}

export interface SuccessReponse<Model> extends BaseResponse {
    data : Model | Model[];
}

export interface ErrorResponse extends BaseResponse {
    msg? : string | string[]
}