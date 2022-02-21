import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

/**
 * Own
 */
// providers
import { TodoConfig } from "../data";
import { ToDoDataService } from "../providers";

export const TaskTableSearch = ({ props }: { props: { onResultsChange: (result: TodoConfig) => void }}) => {
    const [searchInput, setSearchInput] = useState("");
    const { register, reset } = useForm({
        defaultValues: {
            "search_items": ""
        }
    });

    const searchItems = (searchValue: string, handler?: (result: TodoConfig) => void): void => {
        if (!ToDoDataService.isLoading) {
            setTimeout(() => {
                setSearchInput(searchValue);
                const filteredData = ToDoDataService.filterItems(searchValue);

                if (handler) {
                    handler(filteredData);
                }
            }, 600);
            return;
        }

        reset();
    }

    return (
        <div className="filter-tasks-container">
            <Form>
                <Form.Group className="mb-3" controlId="formSearchItems">
                    <Form.Control
                        type="text"
                        placeholder="Type any to filter tasks..."
                        autoFocus={true}
                        required={true}
                        {...register("search_items", {
                            onChange: (e: any) => {
                                searchItems(e.currentTarget.value, (result: TodoConfig) => {
                                    props.onResultsChange(result);
                                });
                                return null;
                            }
                        })}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}
