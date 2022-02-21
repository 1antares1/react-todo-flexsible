import React from "react";
import { render, screen, RenderResult } from "@testing-library/react";

/**
 * Own
 */
import { TaskTableSearch } from "./TaskTableSearch";
import { TodoConfig } from "../data/models";

let dom: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement>;

test("should 'TaskTableSearch' component be created successful", () => {
    dom = render(<TaskTableSearch props={{ onResultsChange: (result: TodoConfig) => {
        // to do
    }}} />);

    expect(dom).toBeDefined();

    const placeholderElement = screen.getByPlaceholderText(/Type any to filter tasks.../i);
    expect(placeholderElement).toBeInTheDocument();
});
