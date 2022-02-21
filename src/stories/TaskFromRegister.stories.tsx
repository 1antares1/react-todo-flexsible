// TaskTableSearch.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

/**
 * Own
 */
import { TaskFormRegister } from "../view/TaskFormRegister";

export default {
    title: "TaskFormRegister",
    component: TaskFormRegister,
} as ComponentMeta<typeof TaskFormRegister>;

export let Primary: ComponentStory<typeof TaskFormRegister> = () => <TaskFormRegister props={{
    show: true,
    onYes: (result: any) => {
        if (result) {
            // to do
        }
    },
    onNo: () => false
}}
index={"0"}
payload={{
    id: 0,
    task_name: "Create first Solana FlexSmart Contract",
    description: "Create first Solana FlexSmart Contract...",
    created_date: "2022-02-01",
    due_date: "2022-02-08",
    assignee: "José Ramírez",
    tags: "",
    status: 0,
}} />;

