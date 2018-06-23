import React, { Component } from 'react';
import './App.css';
import {connect} from "react-redux";
import {increment,decrement} from "./actions";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import User from "./components/user";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
            <h1 className="jumbotron-heading text-center">{this.props.count}</h1>
        </div>
        <p className="text-center">
            <button onClick={() => this.props.increment('ddd')}  className="btn btn-primary mr-2">Increase</button>
            <button  onClick={() => this.props.decrement()}  className="btn btn-danger my-2">Decrease</button>
        </p>
        <User/>
      </div>
    );
  }
}
//这个返回的count就是props的一个属性
const mapStateToProps = (state)=> {
    return {
        count:state.counter
    };
}
/*传递方法给组件作为参数调用*/
/*const mapDispatchToProps =(dispatch) =>{
   /!* return{
        increment:(name) => {dispatch(increment(name))}
    }*!/
   return  bindActionCreators({increment},dispatch);
}*/

App.propTypes={
    count:PropTypes.number.isRequired,
    increment:PropTypes.func.isRequired,
    decrement:PropTypes.func.isRequired
}
export default connect(mapStateToProps,{increment,decrement})(App) ;
