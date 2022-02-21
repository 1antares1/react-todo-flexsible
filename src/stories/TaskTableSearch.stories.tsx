// TaskTableSearch.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

/**
 * Own
 */
import { TaskTableSearch } from "../view/TaskTableSearch";

// models
import { TodoConfig } from "../data/models";

export default {
    title: "TaskTableSearch",
    component: TaskTableSearch,
} as ComponentMeta<typeof TaskTableSearch>;

export let Primary: ComponentStory<typeof TaskTableSearch> = () => <TaskTableSearch props={{ onResultsChange: (result: TodoConfig) => {
    // to do
}}} />;
