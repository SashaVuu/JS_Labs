import React from "react";
import axios from 'axios';
import api from '../api/api.js';
import { Button, Dropdown, DropdownButton, Table } from "react-bootstrap";

class TaskTable extends React.Component {

    constructor(props) {
        super(props);

        let tasks = [{
            idtask: "",
            name: "",
            status: "",
            start_date: "",
            finish_date: "",
            executor_surname: "",
        }];

        console.log('Props');
        console.log(this.props.tasks);

        this.handleStatusFiltering = this.handleStatusFiltering.bind(this);
        this.handleDeleting = this.handleDeleting.bind(this);
        this.handleEditing = this.handleEditing.bind(this);

    }

    handleStatusFiltering(type) {
        this.props.onFilter(type);
    }

    handleDeleting(id) {
        console.log(`delete: ${id}`);
        this.props.onDelete(id);
    }

    handleEditing(id) {
        console.log(`edit: ${id}`);
        this.props.onEdit(id);

    }

    render() {

        return (
            <div class="table_container">
                <div class="dropdown_status">
                    <DropdownButton onChange={this.handleStatusFiltering} id="dropdown-basic-button" title="Status">
                        <Dropdown.Item onClick={() => this.handleStatusFiltering("in_process")} >in_process</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleStatusFiltering("ready")} >ready</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleStatusFiltering("declined")} >declined</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.handleStatusFiltering("all")} >all</Dropdown.Item>
                    </DropdownButton>
                </div>

                <Table striped bordered hover class="task_table" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date of Start</th>
                            <th scope="col">Date of Finish</th>
                            <th scope="col">Executor</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.tasks.map(task => {
                                return (
                                    <tr>
                                        <td>{task.idtask}</td>
                                        <td>{task.name}</td>
                                        <td>{task.status}</td>
                                        <td>{task.start_date}</td>
                                        <td>{task.finish_date}</td>
                                        <td>{task.executor_surname}</td>
                                        <td>
                                        <Button variant="primary" onClick={() => this.handleDeleting(task.idtask)}>Delete</Button>
                                        </td> 
                                        <td>
                                        <Button variant="primary" onClick={() => this.handleEditing(task.idtask)}>Edit</Button>
                                        </td>
                                    </tr>
                                );
                            }
                            )}
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default TaskTable;