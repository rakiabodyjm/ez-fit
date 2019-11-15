import React from "react"
import { Link } from "gatsby"
import { Carousel, Button, Input, notification } from "antd"
import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
import styled from "styled-components"
import c1 from "../images/c1.jpg"
import c2 from "../images/c2.jpg"
import { aboutusRef } from "../config/fire"
import Manage from "./manage"
const LordContainer = styled.div`
  padding: 10% 15%;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #f4f4f4;
  min-height: 450px;
  width: 100%;
  border-radius: 15px;
  padding: 30px;
`

const btnStyle = {
  backgroundColor: "#FF8900",
  width: "180px",
  height: "50px",
  borderColor: "#FF8900",
  borderRadius: "0px",
  // position: "fixed",
  // top: 140,
  // right: -65,
  // zIndex: 1000,
  // transform: "rotate(270deg)",
}
class EditPage extends React.Component {
  componentDidMount() {
    aboutusRef.get().then(doc => {
      this.setState({
        about1: doc.data().about1,
        about2: doc.data().about2,
      })
    })
  }

  state = {
    about1: null,
    about2: null,
  }

  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })

    console.log(this.state.about1 + " " + this.state.about2)
  }

  confirmHandler = e => {
    aboutusRef
      .set(this.state)
      .then(() => {
        this.notification("success", "About Us Details Saved")
      })
      .catch(error => {
        // this.notification("error", error)
        console.log(error)
      })
  }

  notification = (type, message) => {
    notification[type]({
      message: message,
    })
  }
  render() {
    return (
      <div>
        <Manage />
        <LordContainer>
          <Container>
            <h1>About Us</h1>

            <p>About Us 1</p>
            <Input.TextArea
              id="about1"
              defaultValue={this.state.about1}
              rows={4}
              autoSize
              onChange={this.changeHandler}
            />

            <p>About Us 2</p>
            <Input.TextArea
              id="about2"
              defaultValue={this.state.about2}
              rows={4}
              autoSize={{ minRows: 1, maxRows: 6 }}
              onChange={this.changeHandler}
              onPaste={this.changeHandler}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={btnStyle}
                type="primary"
                icon="upload"
                size="large"
                onClick={this.confirmHandler}
                onPaste={this.changeHandler}
              >
                Update
              </Button>
            </div>
          </Container>
        </LordContainer>
      </div>
    )
  }
}

export default EditPage
