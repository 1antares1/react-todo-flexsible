import React from "react";
import { render, RenderResult, screen } from "@testing-library/react";

/**
 * Own
 */
import { TaskFormRegister } from "./TaskFormRegister";

let dom: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement>;

test("should 'TaskFromRegister' component be created successful", () => {
    dom = render(<TaskFormRegister
        props={{
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
        }}/>
    );

    expect(dom).toBeDefined();
});
