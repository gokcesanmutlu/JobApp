import React, { Component } from "react";

class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    decrement = () => {
        this.setState(prevState => ({
            count: prevState.count - 1
        }))
    }
    increment = () => {
        this.setState(prevState = ({
            count: prevState.count + 1
        }))
    }

    render() {
        return(
        <div className="">
            <h1>Counter </h1>
            <p> {this.state.count}</p>
            <button onClick={this.decrement}>Dec</button>
            <button onClick={this.increment}>inc</button>
        </div>)
    }
}
