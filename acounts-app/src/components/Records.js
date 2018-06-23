import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from "../utils/RecordsAPI";
import RecordForm from "./RecordForm";
import  AmountBox from "./AmountBox";

class Records extends Component {
    constructor(){
        super();
        this.state={
            error:null,
            isLoaded:false,
            records:[ ]
        }
    }
    /*组件加载完后渲染从数据库获取到的数据*/
    componentDidMount(){
        RecordsAPI.getAll().then(
            response => this.setState({records:response.data,isLoaded:true}),
        ).catch(
            error => this.setState({error,isLoaded:true}),
        )
    }
    /*添加数据，回调函数，从子组件获取信息*/
    addRecord(record){
        this.setState({
            error:null,
            isLoaded:true,
            records:[
                ...this.state.records,
                record
            ]
        })

    }

    /*更新数据 接口回调数据
    * record  是更新前的数据
    * data 是更新后的数据
    * */

    handleEditRecord(record,data){
        const recordIndex = this.state.records.indexOf(record);//获取原数据的index索引位置
        const newRecords = this.state.records.map((item,index) => {
            if (index !== recordIndex){ //当遍历records 索引不相等表示没有找到，这直接返回原始的所有数据就行
                return item;
            }
            /*这里类似于
            * const a ={"A":"1"}
            * const b ={"A":"2"}
            * const c ={ ...a,...b}
            * 结果c的值为{"A":"2"}
            * */
            return {    //否则找到数据，进行更新数据
                ...item,
                ...data
            }
        });
        this.setState({ //重新更新state的值
            records:newRecords
        })
    }

    /*删除数据时更新state数据*/
    handleDeleteRecord(record){
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item,index) => index !== recordIndex);
        this.setState({
            records:newRecords
        })
    }

    /*所有正的收入相加*/
    credit() {
        let credits = this.state.records.filter( (record) =>{
            return record.amount >=0;
        })
        return credits.reduce((pre,cur) =>{
           return pre + Number.parseInt(cur.amount,0)
        },0);
    }

    /*所有负的支出相加*/
    debit() {
        let debits = this.state.records.filter((record) =>{
            return  record.amount < 0;
        })
        return debits.reduce((pre,cur) =>{
            return pre + Number.parseInt(cur.amount,0)
        },0);
    }

    /*支出和收入总的结果*/
    balance() {
        return this.credit() + this.debit();
    }

  render() {
        const {error,isLoaded,records} = this.state;
        let recordsComponent;
        if (error){
            recordsComponent = <div>{error.message}</div>
        } else if(!isLoaded){
            recordsComponent =  <div>Loding...</div>
        }else{
            recordsComponent = (
                <div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => <Record key={record.id} record={record} handleDelete={this.handleDeleteRecord.bind(this)} handleUpdate={this.handleEditRecord.bind(this)} />)}
                        </tbody>
                    </table>
                </div>
            );
        }
        return (
            <div>
                <h2>Records</h2>
                <div className="row mb-3">
                    <AmountBox text="Credit" type="success" amounts={this.credit()}/>
                    <AmountBox text="Debit" type="danger" amounts={this.debit()}/>
                    <AmountBox text="Balance" type="info" amounts={this.balance()}/>
                </div>
                <RecordForm  handleNewRecord={this.addRecord.bind(this)} />

                {recordsComponent}
            </div>
        )
  }
}
export default Records;
