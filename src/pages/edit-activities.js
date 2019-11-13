import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Button, Input, Card, notification, Collapse } from "antd"

import { actsRef, faqsRef } from "../config/fire"
// import { Link, Route, BrowserRouter } from "react-router-dom"
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

class EditActivities extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activities: {
        crossfit: "",
        cycling: "",
        hardcoremax: "",
        yoga: "",
        zumba: "",
        aerobic: "",
        boxing: "",
        calisthenics: "",
        bodybuilding: "",
        gymnastics: "",
        mma: "",
        powerlifting: "",
        jiujitsu: "",
        dance: "",
        triathlons: "",
      },
    }
  }

  notification = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  confirmHandler = () => {
    actsRef
      .set(this.state.activities)
      .then(() => {
        this.notification("success", "Edit Activities loaded and set")
      })
      .catch(error => {
        this.notification("error", error)
      })
  }

  changeHandler = e => {
    let temp = this.state.activities
    temp[e.target.id] = e.target.value

    this.setState({
      activities: temp,
    })
  }

  componentDidMount() {
    actsRef.get().then(doc => {
      this.setState({
        activities: {
          crossfit: doc.data().crossfit,
          cycling: doc.data().cycling,
          hardcoremax: doc.data().hardcoremax,
          yoga: doc.data().yoga,
          zumba: doc.data().zumba,
          aerobic: doc.data().aerobic,
          boxing: doc.data().boxing,
          calisthenics: doc.data().calisthenics,
          bodybuilding: doc.data().bodybuilding,
          gymnastics: doc.data().gymnastics,
          mma: doc.data().mma,
          powerlifting: doc.data().powerlifting,
          boxing: doc.data().boxing,
          jiujitsu: doc.data().jiujitsu,
          dance: doc.data().dance,
          triathlons: doc.data().triathlons,
        },
      })
    })
  }

  render() {
    const { TextArea } = Input
    const { Panel } = Collapse

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
                    <TextArea
                      rows={4}
                      id={each}
                      value={this.state.activities[each]}
                      onChange={this.changeHandler}
                    />
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

export default EditActivities
