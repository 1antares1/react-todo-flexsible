import style from "@emotion/styled";
import { useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";

/**
 * Own
 */
// models
import { TodoData } from "../data/models";

// providers
import { ToDoDataService } from "../providers";

// components
import { TaskFormRegister } from "./TaskFormRegister";

export const TaskTableInformation = style.div`
    display: flex;
    background: white;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 15px;
    min-height: 105px;
    border-radius: 5px;
    margin: 15px 0px 5px 0px;
    background: linear-gradient(145deg, #fefefe, #d5d5d5);
    box-shadow:  14px 14px 29px #ababab,
                 -14px -14px 29px #ffffff;

    .nested-info-details {
        display: flex;
        color: #7d7d7d;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 400px;
    }

    .task-actions-container {
        span {
            width: 64px;
            height: 64px;
        }

        span:first-of-type {
            margin-right: 8px;
        }

        button {
            background-color: white;
            border: none;
            border-radius: 4px;
            width: 30px;
            height: 28px;
            padding-top: 0px;
            box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%), 0 6px 7px 0 rgb(0 0 0 / 19%);
        }

        .task-edit-action {
            background-color: #4CAF50;

            :active {
                background-color: #04AA6D;
            }
        }

        .task-delete-action {
            background-color: #f44336;

            :active {
                background-color: #f81936;
            }
        }
    }

    p {
        color: #4b4b4b;
    }
`;

export const TaskTableCard = ({ item, index, onChange, ...props }
    : { item: TodoData, index: number, onChange: (cval: TodoData, result: TodoData[]) => void }) => {
    const [showTaskFormRegisterState, setTaskFormRegisterState] = useState(false);
    const prepareItem = (currentItem: TodoData): TodoData => {
        const findItem = ToDoDataService.getSystemUsers().filter(x => x.value === currentItem.assignee)[0];

        if (!findItem) {
            return currentItem;
        }

        currentItem.assignee = findItem.key;
        return currentItem;
    };
    const taskTitle = useMemo(() => item.task_name, [item]);
    const i18nTexts = ["Are you sure to remove this task?"];

    return (
        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskTableInformation>
                        <p>{taskTitle}</p>
                        <div className="nested-info-details">
                            <p>
                                <span>
                                { new Date(new Date(item.due_date)
                                    .setDate(new Date(item.due_date).getDate() + 1))
                                    .toLocaleDateString("en-us", {
                                        month: "short",
                                        day: "2-digit",
                                })}
                                </span>
                            </p>
                            <div className="task-actions-container">
                                <span>
                                    <button className="task-edit-action" onClick={() => setTaskFormRegisterState(true)}>
                                        <FaEdit fontSize={ "16px" } color={ "white" } />
                                    </button>
                                    <TaskFormRegister props={{
                                        show: showTaskFormRegisterState,
                                        onYes: (result: any) => {
                                            if (result) {
                                                ToDoDataService.addOrReplaceItem(result, false, (success: boolean, reason?: any) => {
                                                    if (success) {
                                                        onChange(result, reason);
                                                    }
                                                });
                                            }
                                        },
                                        onNo: () => setTaskFormRegisterState(false)
                                    }}
                                    index={String(item.id)}
                                    payload={prepareItem(item)}></TaskFormRegister>
                                </span>
                                <span>
                                    <button type="button" className="task-delete-action" onClick={() => {
                                            if (window.confirm(i18nTexts[0])) {
                                                ToDoDataService.addOrReplaceItem(item, true, (success: boolean, result?: any) => {
                                                    if (success) {
                                                        onChange(item, result);
                                                    }
                                                });
                                            }
                                        }}>
                                        <FaTrash fontSize={ "16px" } color={ "white" } />
                                    </button>
                                </span>
                            </div>
                        </div>
                    </TaskTableInformation>
                </div>
            )}
        </Draggable>
    )
}
