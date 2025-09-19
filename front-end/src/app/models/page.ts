export interface Page {
    total: number;
    currentPage: number;
    pageSize: number;
}
export interface PageResponse<T> {
    content: T[];
    totalElements: number;
}