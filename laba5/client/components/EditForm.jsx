import React from "react";
import { ToggleButtonGroup, ToggleButton, Button, Form } from "react-bootstrap";


class EditForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("Props in edit");
        console.log(props);
        this.state =
        {
            idtask: this.props.task_to_edit.idtask,
            name: this.props.task_to_edit.name,
            status: this.props.task_to_edit.status,
            start_date: this.props.task_to_edit.start_date,
            finish_date: this.props.task_to_edit.finish_date,
            executor_surname: this.props.task_to_edit.executor_surname,
            files:this.props.files
        };

        this.handleFinishChange = this.handleFinishChange.bind(this);
        this.handleStatusChoosing = this.handleStatusChoosing.bind(this);
        this.handleUpdateTask = this.handleUpdateTask.bind(this);
        this.handleSendingFiles=this.handleSendingFiles.bind(this);
    }

    handleFinishChange(event) {
        this.setState({ finish_date: event.target.value });
    }

    handleUpdateTask() {
        const task = {
            idtask: this.state.idtask,
            name: this.state.name,
            status: this.state.status,
            start_date: this.state.start_date,
            finish_date: this.state.finish_date,
            executor_surname: this.state.executor_surname
        };

        //Во вне
        this.props.onUpdate(task);

    }

    handleStatusChoosing(status) {
        console.log(`status is ${status}`);
        this.setState({ status: status });
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.task_to_edit) !== JSON.stringify(prevProps.task_to_edit)){
            this.setState({
                idtask: this.props.task_to_edit.idtask,
                name: this.props.task_to_edit.name,
                status: this.props.task_to_edit.status,
                start_date: this.props.task_to_edit.start_date,
                finish_date: this.props.task_to_edit.finish_date,
                executor_surname: this.props.task_to_edit.executor_surname
            });
        }
        
        if(JSON.stringify(this.props.files) !== JSON.stringify(prevProps.files)){
            this.setState({
                files: this.props.files
            });
        }
    }

    handleSendingFiles(event){
        console.log(this.props);
        this.props.onSendFiles(event.target.files[0],this.state.idtask);
    }

    render() {
        console.log("rerender Edit");
        console.log(this.state);
        return (
            <div class="editform" >
                <h2>EDIT TASK:</h2>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        readonly="readonly"
                        value={this.state.name} />
                </div>

                <div class="status">
                    <label>Status:</label>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.status} >
                        <ToggleButton value="in_process" onClick={() => this.handleStatusChoosing("in_process")} >in_process</ToggleButton>
                        <ToggleButton value="ready" onClick={() => this.handleStatusChoosing("ready")} >ready</ToggleButton>
                        <ToggleButton value="declined" onClick={() => this.handleStatusChoosing("declined")} >declined</ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div>
                    <label>Date of Start:</label>
                    <input
                        type="date"
                        readonly="readonly"
                        value={this.state.start_date} />
                </div>

                <div >
                    <label>Date of Finish:</label>
                    <input
                        type="date"
                        value={this.state.finish_date}
                        onChange={this.handleFinishChange} />
                </div>

                <div>
                    <label>Executor:</label>
                    <input
                        type="text"
                        readonly="readonly"
                        value={this.state.executor_surname} />
                </div>

                <div>
                    <Button variant="primary" onClick={this.handleUpdateTask}>Edit</Button>
                </div>

                <div class="filesform">
                    <h2>Files:</h2>
                    <ul>
                    {this.state.files.map(file => {
                        return (
                            <li>{file.originalname}</li>
                            );
                        })
                    }
                     </ul>

                     <input id="text_file" type="file" name="text_file" onInput={this.handleSendingFiles}/>

                </div>


            </div>
        );
    }

}

export default EditForm;