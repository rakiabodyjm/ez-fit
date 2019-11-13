import React from "react"
import styled from "styled-components"
import { Link, navigate } from "gatsby"
import c1 from "../images/c1.jpg"
import { Input, Button, Alert, notification } from "antd"
import Layout from "../components/layout"
import fire from "../config/fire"

const Wrapper = styled.div`
  display: flex;
  max-height: 100vh;
  @media screen and (max-width: 500px) {
    flex-direction: column-reverse;
  }

  .try-us {
    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  .left-panel {
    flex: 1.2;

    img {
      height: 100%;
      object-fit: cover;
      @media screen and (max-width: 500px) {
        display: none;
      }
    }
  }

  .right-panel {
    flex: 1;
    .container {
      width: 80%;
      padding: 15% 0% 10% 18%;
      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 5% 5% 0% 5%;
      }

      .form-wrapper {
        .login-title {
          text-align: center;
          font-size: 60px;
        }
        .login-input {
          margin-bottom: 5%;
          .username {
            margin-bottom: 2%;
          }
        }
        .or {
          margin-top: 3%;
          text-align: center;
        }
      }
    }
  }
`

class Login extends React.Component {
  state = {
    alert: null,
    username: "",
    password: "",
  }

  openNotification = message => {
    notification.open({
      placement: "bottomRight",
      duration: 4.5,
      message: message,
      description: "You have successfully logged in!",
    })
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  login = e => {
    const { username, password } = this.state
    let message = null

    e.preventDefault()
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(u => {
        console.log("LOGIN SUCCESSFUL!!!!!!!!!!!!!!!!")
        navigate("/")
        const message = `Welcome back! ${this.state.username}`
        this.openNotification(message)
      })
      .catch(error => {
        console.log(error)

        if (username === "" && password === "") {
          this.setState({
            alert: "Username and Password Missing",
          })
        }
        if (username === "" && password !== "") {
          this.setState({
            alert: "Username Missing",
          })
        }
        if (username !== "" && password === "") {
          this.setState({
            alert: "Password Missing",
          })
        }
        if (username !== "" && password !== "") {
          this.setState({
            alert: "Username and Password Incorrect",
          })
        }
      })
  }

  handleAlert() {
    if (this.state.alert) {
      return <Alert message={this.state.alert} type="error" />
    }
  }

  render() {
    return (
      <Layout>
        <Wrapper>
          <div className="left-panel">
            <img src={c1} alt="" />
          </div>
          <div className="right-panel">
            {" "}
            <div className="container">
              <div>{this.handleAlert()}</div>
              <form action="">
                <div className="form-wrapper">
                  <div className="login-title">Login</div>
                  <div className="login-input">
                    <Input
                      placeholder="EMAIL"
                      className="username"
                      onChange={this.handleOnChange}
                      name="username"
                      type="email"
                    />
                    <Input
                      type="password"
                      placeholder="PASSWORD"
                      className="password"
                      onChange={this.handleOnChange}
                      name="password"
                    />
                  </div>
                  <div>
                    <Button
                      type="primary"
                      block
                      style={{ background: "#2e414f", borderColor: "#2e414f" }}
                      onClick={this.login}
                    >
                      LOGIN
                    </Button>
                  </div>
                  <div className="or">
                    <p>OR</p>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      block
                      style={{
                        background: "#3b5998",
                        borderColor: "#3b5998",
                        marginBottom: "2%",
                      }}
                    >
                      Login with Facebook
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      block
                      style={{ background: "#DD4B39", borderColor: "#DD4B39" }}
                    >
                      Login with Google
                    </Button>
                  </div>
                  <hr />
                  <div style={{ textAlign: "center" }}>
                    <Link to="/register/">
                      <Button type="default" block>
                        REGISTER HERE!
                      </Button>
                    </Link>

                    <span>Dont have an account yet?</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Button
            className="try-us"
            type="primary"
            style={{
              backgroundColor: "#FF8900",
              width: "180px",
              height: "50px",
              borderColor: "#FF8900",
              borderRadius: "0px",
              position: "fixed",
              top: 140,
              right: -65,
              zIndex: 1000,
              transform: "rotate(270deg)",
            }}
          >
            TRY US FOR FREE
          </Button>
        </Wrapper>
      </Layout>
    )
  }
}

export default Login
