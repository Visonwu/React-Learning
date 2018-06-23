import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export  default  class  RecordForm extends Component{
    constructor(...args){
        super(...args);
        this.state = {
            date:"",
            title:"",
            amount:"",
        }
    }
    /*验证 当日期，标题，数量都不为空时 按钮才生效*/
    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }
    /*文本框填入数据时更新相关state 不然文本框（日期，标题，数量）无法填入*/
    handleChange(e){
        let name,obj;
        name = e.target.name;
        this.setState ((
            obj={},
             obj["" + name] = e.target.value,
            obj
        ))
    }
    /*提交表单，添加数据*/
    handleSubmit(event){
        /*默认的submit是get方式，用下面这种方式阻止默认get方法*/
       event.preventDefault();

       /*文本框填入的信息*/
       const data = {
           date:this.state.date,
           title:this.state.title,
           amount:Number.parseInt(this.state.amount,0)
       }

       /*post方法提交数据，添加到后端*/
       RecordsAPI.create(data).then(
            response => {this.props.handleNewRecord(response.data)
                this.setState ({
                    date:"",
                    title:"",
                    amount:"",
                })
            }
        ).catch(
            error => console.log(error)
        )

    }

    render (){
        return(
        <form className= "form-inline mb-3 "  onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group mr-1">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date}/>
            </div>
            <div className="form-group mr-1">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title"  value={this.state.title}/>
            </div>
            <div className="form-group mr-1">
                <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount"  value={this.state.amount}/>
            </div>
            <button className="btn btn-primary" disabled={ !this.valid() }>Create Record</button>
        </form>
        )
    }
};