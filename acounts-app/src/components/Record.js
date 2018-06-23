import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from  '../utils/RecordsAPI';

export  default  class  Record extends Component{

    constructor(...args){
        super(...args)
        /*编辑状态是否开启*/
        this.state={
            edit:false
        }
    }

    /*点击编辑或者取消时变化  记录信息展示或者 编辑信息展示*/
    handleToggle(){
        this.setState({
            edit: !this.state.edit
        })
    }

    /*更新数据*/
    handleEdit(e){
        e.preventDefault();
        const record={
            date:this.refs.date.value,
            title:this.refs.title.value,
            amount:Number.parseInt(this.refs.amount.value,0),
        }
       RecordsAPI.update(this.props.record.id,record).then(
           reponse => {
               this.props.handleUpdate(this.props.record,reponse.data);
               this.setState({
                   edit:false,
               })
           }
       ).catch(
           error => console.log(error)
       )
    }

    /*删除数据*/
    handleDelete(e){
        e.preventDefault();
        RecordsAPI.remove(this.props.record.id).then(
            response => {
                this.props.handleDelete(this.props.record);
            }
        ).catch(
            error => console.log(error)
        )
    }

    /*每条记录信息展示*/
    recordForm(){
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)} >Edit</button>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }

    /*编辑数据时的信息展示*/
    editForm(){
        return(
            <tr>
                <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title" /></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount"/></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>Update</button>
                    <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>Cancell</button>
                </td>
            </tr>
        )
    }

    render() {
            if(this.state.edit){
                 return  this.editForm();
            }else{
                return  this.recordForm();
            }
    }
}

Record.propTypes={
    date:PropTypes.string,
    title:PropTypes.string,
    amount:PropTypes.number
}
