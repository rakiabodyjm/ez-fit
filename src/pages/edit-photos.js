import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import {
  Button,
  Input,
  Card,
  notification,
  Collapse,
  Upload,
  Modal,
  Icon,
} from "antd"

import { storage } from "../config/fire"
// import { Link } from "gatsby"

const LordContainer = styled.div`
  padding: 10% 15%;
  background: #f4f4f4;
  height: 100%;
  width: 100%;
`

const selection = [
  "crossfit",
  "cycling",
  "hardcoremax",
  "yoga",
  "zumba",
  "aerobic",
  "boxing",
  "calisthenics",
  "bodybuilding",
  "gymnastics",
  "mma",
  "powerlifting",
  "jiujitsu",
  "dance",
  "triathlons",
]

const Container = styled.div`
  /* display: flex;
  justify-content: center; */
  background: #f8f8ff;
  /* margin-top: 100px; */
  min-height: 450px;
  width: 100%;
  border-radius: 15px;
  padding: 30px;
`

class EditPhotos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      crossfit: null,
      cycling: null,
      hardcoremax: null,
      yoga: null,
      zumba: null,
      aerobic: null,
      boxing: null,
      calisthenics: null,
      bodybuilding: null,
      gymnastics: null,
      mma: null,
      powerlifting: null,
      boxing: null,
      jiujitsu: null,
      dance: null,
      triathlons: null,
    }
  }

  notification = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  confirmHandler = () => {
    //   this.notification("success", "Images Loaded and Set")
  }

  changeHandler = file => {}

  componentDidMount() {}

  handleChange = file => {
    console.log("this file", file)
  }

  render() {
    const { Panel } = Collapse

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div>
        <Layout />
        <LordContainer>
          <Container>
            <Button
              style={{
                backgroundColor: "##2E414F",
                marginTop: "10px",
                borderColor: "#2E414F",
                marginBottom: "30px",
                width: "100%",
              }}
              type="primary"
              icon="upload"
              size="large"
              onClick={this.confirmHandler}
            >
              Update
            </Button>
            <Collapse defaultActiveKey={["0"]}>
              {selection.map((each, index) => (
                <Panel
                  header={each.charAt(0).toUpperCase() + each.slice(1)}
                  key={`${index}`}
                >
                  <Card
                    key={index}
                    bordered={false}
                    hoverable
                    style={{
                      width: "100%",
                      height: "100%",
                      marginBottom: "50px",
                    }}
                  >
                    <Upload
                      listType="picture-card"
                      onChange={this.handleChange}
                    >
                      {uploadButton}
                    </Upload>
                  </Card>
                </Panel>
              ))}
            </Collapse>
          </Container>
        </LordContainer>
      </div>
    )
  }
}

export default EditPhotos
