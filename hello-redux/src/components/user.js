import React,{Component} from "react";
import {getUser} from "../actions";
import {connect} from "react-redux";

class  User extends Component{

    render(){
        const {error,isFetching,userdata}=this.props.users;
        let data;
        if (error){
            data=error;
        }else if (isFetching){
            data="Loading..."
        }else {
            data=userdata.email
        }
            return(
            <div>
                <h1 className="jumbotron-heading text-center">{data}</h1>
                <p className="text-center">
                     <button onClick={()=>this.props.getUser()} className="btn btn-primary mr-2" >Get Name Remotely</button>
                </p>
            </div>
            );
    }
}

const mapStateToProps = (state)=> {
    return {
        users:state.user
    };
}

export  default connect(mapStateToProps,{getUser}) (User) ;