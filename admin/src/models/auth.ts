export type Auth = {
    readonly accessToken: string;
}
export type AuthError = {
    readonly message: string;
    
    readonly statusCode: number;
}

