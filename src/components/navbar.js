import React from "react"
import styled from "styled-components"
import { Icon, Drawer } from "antd"
import { Link } from "gatsby"
import fire from "../config/fire"
import logo from "../images/logowhite.png"
import "./layout"

const MainLayout = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
  height: 60px;
  background: #2e414f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0% 2% 0% 1%;

  .burger {
    display: none;
    @media screen and (max-width: 1000px) {
      display: inline-block;
      color: white;
    }
  }

  font-family: "Roboto", sans-serif;
  a {
    color: white;
    text-decoration: none;
  }

  .logo {
    flex: 4;

    margin-top: 2%;
    img {
      width: 100px;
    }
    @media screen and (max-width: 1000px) {
      flex: 15;
    }
  }
  .menuItems {
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 15px;

    .item {
      @media screen and (max-width: 1000px) {
        display: none;
      }
    }
  }
`

class Navbar extends React.Component {
  state = { visible: false }
  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  logout = () => {
    fire.auth().signOut()
  }

  render() {
    return (
      <MainLayout>
        <Drawer
          title="EZ FIT"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          {this.props.user !== "none" ? (
            <div>
              <p>
                <a href="" onClick={this.logout}>
                  Logout
                </a>{" "}
              </p>
            </div>
          ) : (
            <div>
              <p>
                <Link to="/register/" style={{ color: "#2e414f" }}>
                  Sign Up
                </Link>
              </p>
              <p>
                {" "}
                <Link to="/login/" style={{ color: "#2e414f" }}>
                  Login
                </Link>
              </p>
            </div>
          )}
          <p>
            {" "}
            <Link to="/faqs/" style={{ color: "#2e414f" }}>
              FAQs
            </Link>
          </p>{" "}
          <div style={{ borderTop: "1px solid black" }}>
            <h3 style={{ marginTop: "10%" }}>Activities</h3>
            <p>
              <Link to="/activity/yoga/" style={{ color: "#2e414f" }}>
                YOGA
              </Link>
            </p>
            <p>
              {" "}
              <Link to="/activity/crossfit/" style={{ color: "#2e414f" }}>
                Crossfit
              </Link>
            </p>
            <p>
              {" "}
              <Link to="/activity/cycling/" style={{ color: "#2e414f" }}>
                Cycling
              </Link>
            </p>{" "}
            <p>
              {" "}
              <Link to="/activity/zumba/" style={{ color: "#2e414f" }}>
                Zumba
              </Link>
            </p>{" "}
            <p>
              {" "}
              <Link to="/activity/hardcoremax/" style={{ color: "#2e414f" }}>
                Hardcoremax
              </Link>
            </p>{" "}
          </div>
        </Drawer>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="menuItems">
          {this.props.user !== "none" ? (
            <div
              style={{
                marginLeft: "27%",
                display: "flex",
                justifyContent: "space-between",
                width: "350px",
                color: "white",
              }}
            >
              <div className="item">{` Welcome, ${this.props.user.email} `}</div>
              <div className="item">
                <Icon type="menu" onClick={this.showDrawer} />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "280px",
              }}
            >
              <div className="item">
                <Link to="/register/">Become a Member</Link>
              </div>
              <div className="item">
                <Link to="/faqs/">FAQs</Link>
              </div>
              <div className="item">
                <Link to="/login/">
                  Login
                  <Icon type="login" />
                </Link>
              </div>
            </div>
          )}

          <div className="burger">
            <Icon type="menu" onClick={this.showDrawer} />
          </div>
        </div>
      </MainLayout>
    )
  }
}

export default Navbar
