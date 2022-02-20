import { TodoData } from "./models/todo.model";

export const TodoInitialData = [
    {
        id: 0,
        task_name: "Create first Solana FlexSmart Contract",
        description: "Create first Solana FlexSmart Contract...",
        created_date: "2022-02-01",
        due_date: "2022-02-08",
        assignee: "José Ramírez",
        tags: null,
        status: 0,
    },
    {
        id: 1,
        task_name: "Deploy with Anchor with Whitepaper",
        description: "Deploy with Anchor with Whitepaper...",
        created_date: "2022-02-01",
        due_date: "2022-02-11",
        assignee: "José Ramírez",
        tags: null,
        status: 0,
    },
    {
        id: 2,
        task_name: "Create PR on connection with new wallet",
        description: "Create PR on connection with new wallet...",
        created_date: "2022-02-02",
        due_date: "2022-02-11",
        assignee: "Nate Zapata",
        tags: "SEO; Blog Post",
        status: 0,
    },
    {
        id: 3,
        task_name: "Meeting with Nate Zapata",
        description: "Meeting with Nate Zapata...",
        created_date: "2022-02-02",
        due_date: "2022-02-11",
        assignee: "Nate Zapata",
        tags: "Long Form; Interviews",
        status: 0,
    },
    {
        id: 4,
        task_name: "Commit the new endpoint in the Node.js",
        description: "Commit the new endpoint in the Node.js...",
        created_date: "2022-02-04",
        due_date: "2022-02-10",
        assignee: "Vitalik Buterin",
        tags: null,
        status: 0,
    }
] as TodoData[];

export const TodoFinalData = [] as TodoData[];
