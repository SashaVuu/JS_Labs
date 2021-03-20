import React from "react";
import { ToggleButtonGroup, ToggleButton, Button } from "react-bootstrap";

class AddForm extends React.Component {

    constructor(props) {
        super(props);

        this.state =
        {
            idtask:'',
            name: '',
            status: 'declined',
            start_date:'2021-01-01',
            finish_date: '2021-01-02',
            executor_surname: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleExecutorChange = this.handleExecutorChange.bind(this);

        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleFinishChange = this.handleFinishChange.bind(this);

        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleStatusChoosing = this.handleStatusChoosing.bind(this);

    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleExecutorChange(event) {
        this.setState({ executor_surname: event.target.value });
    }

    handleStartChange(event) {
        this.setState({ start_date: event.target.value });
    }
    handleFinishChange(event) {
        this.setState({ finish_date: event.target.value });
    }

    handleAddTask() {

        const newTask = {
            name: this.state.name,
            status: this.state.status,
            start_date: this.state.start_date,
            finish_date: this.state.finish_date,
            executor_surname: this.state.executor_surname
        };
        //Во вне
        this.props.onTaskAdd(newTask);

    }


    handleStatusChoosing(status) {
        console.log(`status is ${status}`);
        this.setState({ status: status });
    }


    render() {
        return (
            <div class="addform">
                <h2>ADD TASK:</h2>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange} />
                </div>

                <div>
                    <label>Status:</label>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.status} >
                        <ToggleButton value="in_process" onClick={ () => this.handleStatusChoosing("in_process") } >in_process</ToggleButton>
                        <ToggleButton value="ready" onClick={ () => this.handleStatusChoosing("ready") } >ready</ToggleButton>
                        <ToggleButton value="declined" onClick={ () => this.handleStatusChoosing("declined") } >declined</ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div >
                    <label>Date of Start:</label>
                    <input
                        type="date"
                        value={this.state.start_date}
                        onChange={this.handleStartChange} />
                </div>

                <div >
                    <label>Date of Finish:</label>
                    <input
                        type="date"
                        value={this.state.finish_date}
                        onChange={this.handleFinishChange} />
                </div>


                <div >
                    <label>Executor:</label>
                    <input
                        type="text"
                        value={this.state.executor_surname}
                        onChange={this.handleExecutorChange} />
                </div>


                <div >
                    <Button variant="primary" onClick={this.handleAddTask} >Add</Button>
                </div>


            </div>
        );
    }

}

export default AddForm;