import { Controller, useForm } from "react-hook-form";

/**
 * Own
 */
import { TodoColumns, TodoData } from "../data/models";
import { Button, Modal, Form } from "react-bootstrap";
import { ToDoDataService } from "../providers";

export const TaskFormRegister = ({ props, item, index, payload }: { props: {
        show: boolean,
        onYes: (data: any) => void,
        onNo: (reason?: string) => void
    }, item?: { columns: TodoColumns }, index?: string, payload?: TodoData
}) => {
    const onSubmit = (data: any) => {
        if (!data["task_name"] || data["assignee"] < 0 || !data["due_date"]) {
            alert("You must fill in the required fields before creating the task");
            return;
        }

        props.onYes(data);
        reset();
    };
    const prepareDateFormat = (currentDate: string | undefined): string => {
        if (!currentDate) {
            return "2022-01-01";
        }

        return currentDate;
    }

    const { control, register, handleSubmit, reset, formState: { isValid } } = useForm({
        defaultValues: {
            "id": payload?.id,
            "task_name": payload?.task_name,
            "description": payload?.description,
            "tags": payload?.tags,
            "assignee": payload?.assignee,
            "due_date": prepareDateFormat(payload?.due_date),
            "status": payload?.status || item?.columns?.columnId
        }
    });

    return (
        <Modal show={props.show} onHide={() => !props.show} back={"true"}>
            <Modal.Header>
                <Modal.Title>Register new task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label className="field-required">Title</Form.Label>
                        <Form.Control type="text" placeholder="Describe the task title" {...register("task_name")} autoFocus={true} required={true} />
                        <Form.Text className="text-muted">
                            Only the title, below you can describe the task.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter what the task requires" {...register("description")} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTags">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" placeholder="Enter the tags separated by commas" {...register("tags")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAsignee">
                        <Form.Label className="field-required">Asignee</Form.Label>
                        <Form.Select defaultValue={payload?.assignee.toString()} {...register("assignee")} required>
                            <option key={"-1"} value="-1">-- Choose user --</option>
                            {
                                ToDoDataService.getSystemUsers().map((elem) => <option key={elem.key} value={elem.key}>{elem.value}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDueDate">
                        <Form.Label className="field-required">Due date</Form.Label>
                        <Controller
                            name="due_date"
                            control={control}
                            render={({ field }) => <Form.Control {...field} type="date" min="2022-01-01" placeholder="Choose the due date" {...register("due_date")} required />}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onNo("Cancel") }>
                    Cancel
                </Button>
                <Button variant="primary" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                    Create task
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
