import React from "react";
import AddForm from "./AddForm.jsx";
import EditForm from "./EditForm.jsx";
import TaskTable from "./TaskTable.jsx";
import TasksStore from '../stores/TasksStore';
import TasksActions from "../actions/TasksActions";
import { Button } from "react-bootstrap";



function getStateFromFlux() {
    return {
        isLoading: TasksStore.isLoading(),
        tasks: TasksStore.getTasks(),
        task_to_edit: TasksStore.getTask(),
        files: TasksStore.getFiles(),
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        var data = getStateFromFlux();

        this.state = Object.assign(data, { file_to_upload: null });

        this.isAdd = true;

        this._onChange = this._onChange.bind(this);
        this.handleFiltering = this.handleFiltering.bind(this);
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleDeleting = this.handleDeleting.bind(this);
        this.handleUpdating = this.handleUpdating.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleAdding = this.handleAdding.bind(this);
        this.handleSendingFiles = this.handleSendingFiles.bind(this);
    }

    componentWillMount() {
        TasksActions.getAllTasks();
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
        TasksStore.emitChange();
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        console.log("change");
        this.setState(getStateFromFlux());
    }

    handleFiltering(sorting_param) {
        console.log(`sorting_param = ${sorting_param}`);
        if (sorting_param == "all") {
            TasksActions.getAllTasks();
        }
        else {
            TasksActions.sortTasks(sorting_param);
        }
    }

    handleTaskAdd(task) {
        TasksActions.addNewTask(task);
        TasksActions.getAllTasks();
    }

    handleDeleting(id) {
        console.log(`will delete: ${id}`)
        TasksActions.deleteTask(id);
        TasksActions.getAllTasks();
    }

    handleUpdating(id) {
        console.log(`will update: ${id}`)
        TasksActions.updateTask(id);
        TasksActions.getAllTasks();
    }

    handleEditing(id) {
        console.log(`will edit: ${id}`)
        TasksActions.getTaskById(id);
        TasksActions.getAllFiles(id);
        this.isAdd = false;
    }

    handleSendingFiles(file, id) {
        TasksActions.insertNewFile(file, id);
    }

    handleAdding() {
        this.isAdd = true;
        TasksStore.emitChange();
    }

    render() {
        console.log("rerender main");
        console.log(this.state);
        let form;
        if (this.isAdd) {
            form = <AddForm onTaskAdd={this.handleTaskAdd} />;
        } else {
            form = <EditForm task_to_edit={this.state.task_to_edit} files={this.state.files}
                onUpdate={this.handleUpdating} onSendFiles={this.handleSendingFiles} />;
        }
        return (<div class="global_container">
            <TaskTable tasks={this.state.tasks} onFilter={this.handleFiltering} onEdit={this.handleEditing}
                onDelete={this.handleDeleting} />
            <div class="addnew_button">
                <Button variant="primary" onClick={this.handleAdding}>Add New</Button>
            </div>
            {form}
        </div>);

    }
}

export default App;