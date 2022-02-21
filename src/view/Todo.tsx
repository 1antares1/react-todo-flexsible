import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, DragUpdate } from "react-beautiful-dnd";

/**
 * Own
 */
// models
import { TodoInitialConfig, TodoConfig, TodoData } from  "../data";

// components
import ToDoElement from "./TodoElement";
import { ToDoDataService } from "../providers";

const Container = styled.div`
    display: flex;
`;

const TaskColumnStyle = styled.div`
    display: flex;
    width: 100%;
    margin: 16px;
    min-height: 75vh;
`;

const ToDo = ({ props }: { props: { reload: () => void }}) : JSX.Element => {
    const [firstColumns, setColumns] = useState(TodoInitialConfig);

    const onDragEnd = (result: DragUpdate, columns: TodoConfig, setColumnsState: (value: React.SetStateAction<TodoConfig>) => void) => {
        if (!result.destination) {
            return;
        }

        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destinationColumn = columns[destination.droppableId];
            const sourceElements = [...sourceColumn.columns.elements];
            const destinationElements = [...destinationColumn.columns.elements];
            const [deleted] = sourceElements.splice(source.index, 1);
            let newFullData: TodoData[] = [];

            destinationElements.splice(destination.index, 0, deleted);

            deleted.status = destinationColumn.columns.columnId

            setColumnsState({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    columns: {
                        columnId: sourceColumn.columns.columnId,
                        title: sourceColumn.columns.title,
                        elements: sourceElements
                    }
                },
                [destination.droppableId]: {
                    ...destinationColumn,
                    columns: {
                        columnId: destinationColumn.columns.columnId,
                        title: destinationColumn.columns.title,
                        elements: destinationElements
                    }
                }
            });

            Object.keys(columns).forEach((val: string) => {
                if ((columns[val].columns?.elements?.length)) {
                    newFullData = newFullData.concat(...columns[val].columns.elements);
                }
            });

            if (newFullData?.length) {
                ToDoDataService.refreshData(newFullData, true);
            }

            return;
        }

        const columnData = columns[source.droppableId];
        const clonedItems = [...columnData.columns.elements];
        const [deleted2] = clonedItems.splice(source.index, 1);

        clonedItems.splice(destination.index, 0, deleted2);

        setColumnsState({
            ...columns,
            [source.droppableId]: {
                ...columnData,
                columns: {
                    columnId: columnData.columns.columnId,
                    title: columnData.columns.title,
                    elements: clonedItems
                }
            }
        });
    }

    return (<DragDropContext onDragEnd={(result) => onDragEnd(result, firstColumns, setColumns)}>
            <Container>
                <TaskColumnStyle>
                    {Object.entries(firstColumns).map(([columnId, data], idx: number) =>
                        <ToDoElement
                            key={columnId}
                            columnIndex={idx}
                            columnId={columnId}
                            data={data}
                            props={ { reload: props.reload } }
                        />
                    )}
                </TaskColumnStyle>
            </Container>
        </DragDropContext>
    );
};

export default ToDo;
