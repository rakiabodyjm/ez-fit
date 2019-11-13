import React from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import c1 from "../images/c2.jpg"
import {
  Input,
  Button,
  Select,
  notification,
  Upload,
  Icon,
  message,
} from "antd"
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
      height: 130%;
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
      padding: 5% 0% 10% 18%;
      @media screen and (max-width: 500px) {
        width: 100%;
        padding: 5% 5% 0% 5%;
      }
      .form-wrapper {
        .register-title {
          font-size: 60px;
          text-align: center;
        }
        .input-wrapper {
          height: 220px;
          display: flex;

          flex-direction: column;
          justify-content: space-between;
        }
        .register-input {
          display: flex;
          .first-name {
            margin-right: 2%;
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

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    trainer: false,

    typeId: "",
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleTrainer = () => {
    if (this.state.trainer) {
      this.setState({
        trainer: false,
      })
    } else {
      this.setState({
        trainer: true,
      })
    }
  }

  signUp = () => {
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === "" ||
      this.state.contactNumber === ""
    ) {
      notification.open({
        duration: 2.5,
        message: "Registration Failed",
        description: "Please fill out all the given details.",
      })
    } else if (this.state.password !== this.state.confirmPassword) {
      notification.open({
        duration: 2.5,
        message: "Password not match",
        description: "Please check your password confirmation",
      })
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {
          console.log("REGISTRATYION SUCCESSFUL!!!!!!!")
          notification.open({
            placement: "bottomRight",
            duration: 2.5,
            message: "Congratulations! Registration Successful!",
          })
          navigate("/")
          const db = fire.firestore()
          if (!this.state.trainer) {
            db.collection("Customer")
              .add({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                contactNumber: this.state.contactNumber,
                userType: "customer",
              })
              .then(function() {
                console.log("Document successfully written!")
              })
              .catch(function(error) {
                console.error("Error writing document: ", error)
              })
          } else {
            db.collection("Trainer")
              .add({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                contactNumber: this.state.contactNumber,
                userType: "trainer",
                activities: this.state.activities,
                specialization: this.state.specialization,
                yearsOfExperience: this.state.year,
                institution: this.state.institution,
                affiliation: this.state.affiliation,
                typeOfId: this.state.typeId,
              })
              .then(function() {
                console.log("Document successfully written!")
              })
              .catch(function(error) {
                console.error("Error writing document: ", error)
              })
          }
        })
        .catch(err => {
          notification.open({
            duration: 2.5,
            message: err.message,
          })
        })
    }
  }

  handleChange = value => {
    console.log(`selected ${value}`)
  }

  handleAct = value => {
    // console.log(`selected ${value}`)
    this.setState({
      activities: value,
    })
  }

  handleAfi = value => {
    // console.log(`selected ${value}`)
    this.setState({
      affiliation: value,
    })
  }

  handleIns = value => {
    // console.log(`selected ${value}`)
    this.setState({
      institution: value,
    })
  }

  handleYear = value => {
    // console.log(`selected ${value}`)
    this.setState({
      year: value,
    })
  }
  handleSpec = value => {
    // console.log(`selected ${value}`)
    this.setState({
      specialization: value,
    })
  }

  render() {
    const { Option } = Select
    const children = []
    for (let i = 10; i < 36; i++) {
      children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
      )
    }

    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`)
        }
      },
    }

    return (
      <Layout>
        <Wrapper>
          <div className="left-panel">
            <img src={c1} alt="" />
          </div>
          <div className="right-panel">
            {" "}
            <div className="container">
              <form action="">
                <div className="form-wrapper">
                  <div className="register-title">Register</div>
                  <div className="input-wrapper">
                    <div className="register-input">
                      <Input
                        placeholder="First Name"
                        className="first-name"
                        name="firstName"
                        onChange={this.handleOnChange}
                      />
                      <Input
                        placeholder="Last Name"
                        className="last-name"
                        name="lastName"
                        onChange={this.handleOnChange}
                      />
                    </div>
                    <div className="email">
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        onChange={this.handleOnChange}
                      />
                    </div>
                    <div className="password">
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={this.handleOnChange}
                      />
                    </div>
                    <div className="confirm-password">
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        onChange={this.handleOnChange}
                      />
                    </div>
                    <div className="contact-number">
                      <Input
                        placeholder="Contact Number"
                        name="contactNumber"
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "5%" }}>
                    {this.state.trainer === true ? (
                      <div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Activity</p>
                          <Select
                            onChange={this.handleAct}
                            name="activities"
                            defaultValue="Aerobic"
                            style={{ width: "100%" }}
                          >
                            <Option value="Aerobic">Aerobic</Option>
                            <Option value="Body Building">Body Building</Option>
                            <Option value="Boxing">Boxing</Option>
                            <Option value="Calisthenics">Calisthenics</Option>
                            <Option value="Cross Fit">Cross Fit</Option>
                            <Option value="Cycling">Cycling</Option>
                            <Option value="Gymnastics">Gymnastics</Option>
                            <Option value="Marathon Running">
                              Marathon Running
                            </Option>
                            <Option value="MMA">MMA</Option>
                            <Option value="Muat Thai">Muat Thai</Option>
                            <Option value="Pole Dancing">Pole Dancing</Option>
                            <Option value="Power Lifting">Power Lifting</Option>
                            <Option value="Swimming">Swimming</Option>
                            <Option value="Triathlons">Triathlons</Option>
                            <Option value="Weight Lifting">
                              Weight Lifting
                            </Option>
                            <Option value="Wrestling">Wrestling</Option>
                            <Option value="Yoga">Yoga</Option>
                          </Select>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Specialization</p>
                          <Select
                            onChange={this.handleSpec}
                            name="Agility"
                            defaultValue="Agility"
                            style={{ width: "100%" }}
                          >
                            <Option value="Agility">Agility</Option>
                            <Option value="Athletics">Athletics</Option>
                            <Option value="Body Building Preparation">
                              Body Building Preparation
                            </Option>
                            <Option value="Cardio">Cardio</Option>
                            <Option value="Cutting">Cutting</Option>
                            <Option value="Endurance">Endurance</Option>
                            <Option value="Fat Loss">Fat Loss</Option>
                            <Option value="Muscle Gain">Muscle Gain</Option>
                            <Option value="Muscle Strengthening">
                              Muscle Strengthening
                            </Option>
                            <Option value="Recovery">Recovery</Option>
                            <Option value="Supplementation">
                              Supplementation
                            </Option>
                            <Option value="Toning">Toning</Option>
                            <Option value="Weight Gain">Weight Gain</Option>
                            <Option value="Weight Loss">Weight Loss</Option>
                          </Select>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Years of Experience</p>
                          <Select
                            onChange={this.handleYear}
                            name="years"
                            defaultValue="1 - 2 years"
                            style={{ width: "100%" }}
                          >
                            <Option value="1 - 2 years">1 - 2 years</Option>
                            <Option value="3 - 5 years">3 - 5 years</Option>
                            <Option value="5 - 10 years">5 - 10 years</Option>
                            <Option value="10 - 15 years">10 - 15 years</Option>
                            <Option value="15 - 20 years">15 - 20 years</Option>
                            <Option value="20 years and over">
                              20 years and over
                            </Option>
                          </Select>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Affliation (Optional)</p>
                          <Select
                            onChange={this.handleAfi}
                            mode="tags"
                            style={{ width: "100%" }}
                            tokenSeparators={[","]}
                          >
                            {children}
                          </Select>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Gym Institution (Optional)</p>
                          <Input
                            placeholder="Gym Institution"
                            onChange={this.handleOnChange}
                            name="institution"
                          />
                        </div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Upload Certification</p>
                          <Upload {...props}>
                            <Button>
                              <Icon type="upload" /> Click to Upload
                            </Button>
                          </Upload>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Upload Valid ID for Verification</p>
                          <div>
                            <Upload {...props}>
                              <Button>
                                <Icon type="upload" /> Click to Upload
                              </Button>
                            </Upload>
                          </div>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                          <p>Type of ID uploaded</p>
                          <Input
                            placeholder="Type of ID uploaded"
                            name="typeId"
                            onChange={this.handleOnChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div style={{ marginTop: "5%" }}>
                    <Button
                      onClick={this.signUp}
                      type="primary"
                      block
                      style={{ background: "#2e414f", borderColor: "#2e414f" }}
                    >
                      REGISTER
                    </Button>
                  </div>
                  {this.state.trainer !== true ? (
                    <div>
                      <div className="or">
                        <p>OR</p>
                      </div>
                      <div>
                        <Button
                          type="default"
                          block
                          onClick={this.handleTrainer}
                          style={{ marginBottom: "2%" }}
                        >
                          Register as trainer
                        </Button>
                      </div>
                      <div>
                        <Button
                          type="primary"
                          block
                          style={{
                            background: "#3b5998",
                            borderColor: "#3b5998",
                          }}
                        >
                          Register with Facebook
                        </Button>
                      </div>

                      <hr />
                      <div style={{ textAlign: "center" }}>
                        <Link to="/login/">
                          <Button type="default" block>
                            LOGIN HERE!
                          </Button>
                        </Link>

                        <span>Already have an account?</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Button
                        type="default"
                        block
                        onClick={this.handleTrainer}
                        style={{ marginTop: "2%" }}
                      >
                        Register as customer
                      </Button>
                    </div>
                  )}
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

export default Register
