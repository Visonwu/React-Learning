import React, { Component } from 'react';
import {connect} from "react-redux";
import {addReminder,deleteReminder,clearReminders} from "../actions";
import PropTypes from "prop-types";
import moment from "moment";

class App extends Component {
    constructor(...args){
        super(...args);
        this.state={
            text:"",
            dueDate:"",
        }
    }
    /*添加一个Reminder*/
    addReminder(){
        this.props.addReminder(this.state.text,this.state.dueDate)
    }

    /*删除reminder*/
    deleteReminder(id){
        this.props.deleteReminder(id);
    }

    /*清空列表*/
    clearReminders(){
        this.props.clearReminders();
    }

    /*添加一个Reminder组件*/
    renderReminder(){
      const {reminders} =this.props;
        return (
            <ul className="list-group col-sm-8 mt-2">
                {
                    reminders.map( reminder => {
                         return (
                              <li key={reminder.id} className="list-group-item">
                                  <div className="list-item">
                                      <div>{reminder.text} </div>
                                      <div><em>{moment(new Date( reminder.dueDate)).fromNow(true)}</em></div>
                                  </div>
                                  <div className="list-item delete-button" onClick={()=>this.deleteReminder(reminder.id)}>&#x2715;</div>
                              </li>
                          )
                    })
                }
            </ul>
        )

    }


  render() {
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline">
            <div className="form-group">
                <input
                        type="text"
                       className="form-control mr-2"
                       placeholder="I have ..."
                        onChange={(e)=> {this.setState({text:e.target.value})}}
                />
                <input
                    type="datetime-local"
                    className="form-control"
                    placeholder="I have ..."
                    onChange={(e)=> {this.setState({dueDate:e.target.value})}}
                />
            </div>
            <button
                className="btn btn-success"
                onClick={() => this.addReminder()}
            >Add Reminder
            </button>
            {this.renderReminder()}
            <div className="btn btn-danger mt-3" onClick={() => this.clearReminders()}>
                Clear Reminders
            </div>
        </div>
      </div>
    );
  }
}

const  mapStateToProps =(state) => {
    return {
        reminders:state
    }
}

App.propType = {
    reminders:PropTypes.array.isRequired,
    addReminder:PropTypes.func.isRequired
}

export default connect(mapStateToProps,{addReminder,deleteReminder,clearReminders})(App) ;
