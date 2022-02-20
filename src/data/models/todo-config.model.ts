/**
 * Own
 */
import { TodoData } from "./todo.model";

export interface TodoConfig {
    [key: string]: {
        columns: TodoColumns;
    }
}

export interface TodoColumns {
    columnId: number;
    title: string;
    elements: TodoData[];
}
