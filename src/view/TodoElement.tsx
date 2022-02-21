import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "@emotion/styled";

/**
 * Own
 */
// models
import { TodoColumns, TodoData } from  "../data";

// providers
import { ToDoDataService } from "../providers";

// components
import { TaskFormRegister, TaskTableCard, TaskTableInformation } from ".";

const TaskTable = styled.div`
    display: flex;
    background: #f3f3f3;
    min-height: 100px;
    flex-direction: column;
    min-width: 340px;
    border-radius: 10px;
    padding: 20px 20px;
    margin-right: 45px;
    -webkit-box-shadow: 4px 6px 15px -3px #000000;
    box-shadow: 4px 6px 15px -3px #000000;

    .column-title-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;

        .task-add-action {
            color: white;
            background-color: #589a00;
            border: none;
            border-radius: 4px;
            width: 85px;
            height: 34px;
            box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%), 0 6px 7px 0 rgb(0 0 0 / 19%);
            padding-top: 5px;

            :active {
                background-color: #539100;
            }
        }
    }
`;

const TaskTitle = styled.span`
    color: #FD7A5B;
    background: rgb(24 136 255 / 15%);
    align-self: flex-start;
    padding: 6px 12px;
    border-radius: 5px;
    font-weight: 500;
`;

const TaskSkeletonContainer = styled.ul`
    width: 100%;
    padding-left: 0px;

    div {
        padding-left: 0px;
        padding-right: 0px;
    }

    li {
        width: 100%;
        h6 {
            margin-bottom: 0px;
            span {
                display: flex;
                flex-direction: column;
                justify-content: start;
                padding-left: 14px;
            }
        }
        p {
            margin-top: 12px;
        }
    }

    .skeleton-actions-container {
        display: flex;
        flex-direction: row;
        justify-content: end;
        padding-right: 14px;
        padding-bottom: 12px;

        span:first-of-type {
            padding-right: 4px;
        }
    }
`;

const ToDoElement = ({
        columnId,
        data,
        columnIndex,
        props
    }: { columnId: string, data: { columns: TodoColumns }, columnIndex: number, props: {reload: () => void } }): JSX.Element => {
    const [showTaskFormRegisterState, setTaskFormRegisterState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const refreshList = (currentData: TodoData[], result: TodoData[]) =>{
        currentData = result;
        ToDoDataService.refreshData(currentData);

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 0);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        props.reload = () => {
            alert("Reload here!");
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
            }, 0);
        }
      return () => {
        // to do
      }
    }, []);

    return(<Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
                <TaskTable ref={provided.innerRef} {...provided.droppableProps}>
                    <section className="column-title-container">
                        <TaskTitle>{ data.columns.title }</TaskTitle>
                        <span>
                            <button type="button" className="task-add-action" onClick={() => setTaskFormRegisterState(true)}>
                                Add task
                            </button>
                            <TaskFormRegister props={{
                                show: showTaskFormRegisterState,
                                onYes: (result: any) => {
                                    if (result) {
                                        ToDoDataService.addOrReplaceItem(result, false, (success: boolean, reason?: any) => {
                                            if (success) {
                                                refreshList(result, reason);
                                                setTaskFormRegisterState(false);
                                            }
                                        });
                                    }
                                },
                                onNo: () => setTaskFormRegisterState(false)
                            }} item={{ columns: data.columns }} index={columnId}></TaskFormRegister>
                        </span>
                    </section>
                    {
                        isLoading && <TaskSkeletonContainer>
                            {Array(4).fill(0).map((item, index) => (
                                <div key={index}>
                                    <TaskTableInformation>
                                        <li className="card">
                                            <SkeletonTheme height={180} baseColor="#202020" highlightColor="#444" />
                                            <p className="card-channel">
                                                <Skeleton height={18} width={`90%`} />
                                            </p>
                                            <h6 className="card-title">
                                                <Skeleton width={`30%`} height={15} />
                                            </h6>
                                            <div className="card-metrics">
                                                <div className="skeleton-actions-container">
                                                    <Skeleton circle={true} height={28} width={28} />
                                                    <Skeleton circle={true} height={28} width={28} />
                                                </div>
                                            </div>
                                        </li>
                                    </TaskTableInformation>
                                </div>
                            ))}
                        </TaskSkeletonContainer>
                    }
                    {
                        !isLoading && data.columns.elements.map((item, idx) =>
                            <TaskTableCard
                                    key={item.id}
                                    item={item}
                                    index={idx}
                                    onChange={(val: TodoData, result: TodoData[]) => {
                                        if (val) {
                                            refreshList(data.columns.elements, result);
                                        }
                                    }}
                                />)
                    }
                    { provided.placeholder }
                </TaskTable>
            )}
        </Droppable>
    );
};

export default ToDoElement;
