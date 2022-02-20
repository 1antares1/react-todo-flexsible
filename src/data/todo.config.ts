/**
 * Own
 */
 import { TodoConfig } from "./models";
import { TodoFinalData } from "./todo-database";

export const TodoInitialConfig = {
    "8a6e0804-2bd0-4672-b79d-d97027f9071a": {
        columns: {
            columnId: 0,
            title: "New",
            elements: TodoFinalData
        }
    },
    "ce3ac595-96b2-4a4f-b9ef-d2e15cfe2e4a": {
        columns: {
            columnId: 1,
            title: "In Discovery",
            elements: []
        }
    },
    "8473497d-774a-4f3d-9f41-a6d24eddfe42": {
        columns: {
            columnId: 2,
            title: "In Progress",
            elements: []
        }
    },
    "b3af928b-9dae-4a16-9a47-4ed821c46b1b": {
        columns: {
            columnId: 3,
            title: "Done",
            elements: []
        }
    }
} as TodoConfig;
