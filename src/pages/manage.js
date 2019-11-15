import React, { Component } from "react"
import { Layout, Menu, Icon } from "antd"
import styled from "styled-components"
import logo from "../images/logowhite.png"
import { Link } from "gatsby"

const { Header, Content, Footer, Sider } = Layout

const ManageLayout = styled.div`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #2e414f;
    display: flex;
  }

  li {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    margin-bottom: 0px;
    height: 100px;
  }

  li a {
    align-self: auto;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover {
    background-color: #ff8900;
  }
`
export class Manage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      colllapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <ManageLayout>
        <div>
          <ul>
            <Link to="/">
              <li>
                <div
                  style={{
                    display: "block",
                    color: "white",
                    textAlign: "center",
                    padding: " 14px 16px",
                    textDecoration: "none",
                    objectFit: "contain",
                    width: "100px",
                    objectFit: "contain",
                  }}
                >
                  <img
                    stlye={{
                      maxWidth: "100px",
                    }}
                    src={logo}
                  />
                </div>
              </li>
            </Link>

            <li>
              <a href="/edit-photos">Photos</a>
            </li>
            <li>
              <a href="/edit-about">About Us Index</a>
            </li>
            <li>
              <a href="/edit-activities">Activities Description</a>
            </li>
            <li>
              <a href="/edit-faqs">FAQs Q & A</a>{" "}
            </li>
          </ul>
        </div>
      </ManageLayout>
    )
  }
}

export default Manage
