/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import fire from "../config/fire"
import Header from "./header"
import "./layout.css"
import Navbar from "./navbar"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
    this.authListener = this.authListener.bind(this)
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({
          user: null,
        })
      }
    })
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user === null ? "none" : this.state.user} />
        <div>
          <main>{this.props.children}</main>
        </div>
      </>
    )
  }
}

export default Layout
