export interface TodoData {
    id: number;
    task_name: string;
    description: string;
    created_date: string;
    assignee: string;
    due_date: string;
    status: number;
    tags?: string;
    notes?: string;
}
