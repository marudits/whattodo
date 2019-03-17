export interface TodoItem {
    id?: string;
    created_at?: number;
    created_by?: string;
    category?: string;
    title?: string;
    description?: string;
    is_done?: boolean;
}