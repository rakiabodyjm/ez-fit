import React, { Component } from "react"

class counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0,
    }
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>Current count: {this.state.count} </p>
        <button>Plus</button>
        <button>Minus</button>
      </div>
    )
  }
}

export default counter
