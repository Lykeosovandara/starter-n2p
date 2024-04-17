export type ResponseApi<T> = {
    data: T[];
    meta?: {
        take: number;
        itemCount: number;
        pageCount: number;
    }
    
}