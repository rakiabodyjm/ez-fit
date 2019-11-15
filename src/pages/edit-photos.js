import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Button, Input, Card, notification, Collapse } from "antd"
import c2 from "../images/c2.jpg"
import { storage, urlRef, carouselUrlRef } from "../config/fire"
import Manage from "./manage"
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
const carouselSelection = ["image1", "image2", "image3", "image4", "image5"]

const Container = styled.div`
  background: #f4f4f4;
  min-height: 450px;
  width: 100%;
  border-radius: 15px;
  padding: 30px;
`
const Center = styled.div`
  text-align: center;
`
const UploadContainer = styled.div``

class EditPhotos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clicked: 0,
      images: {
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
      },
      url: {
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
        boxing: "",
        jiujitsu: "",
        dance: "",
        triathlons: "",
      },
      carousel: {
        one: null,
        two: null,
        three: null,
        four: null,
        five: null,
      },
      carouselurl: {
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
      },
    }
  }

  componentWillMount() {
    urlRef.get().then(doc => {
      this.setState({
        url: doc.data(),
      })
    })

    carouselUrlRef.get().then(doc => {
      this.setState({
        carouselurl: doc.data(),
      })
    })
  }

  notification = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  handleChange = e => {
    const { images } = this.state
    let holder = images
    if (e.target.files[0]) {
      const image = e.target.files[0]
      holder[e.target.id] = image
      this.setState({
        images: holder,
      })
    }
    console.log(images)
  }

  handleCarourselChange = e => {
    const { carousel } = this.state
    let holder = carousel
    if (e.target.files[0]) {
      const image = e.target.files[0]
      holder[e.target.id] = image
      this.setState({
        carousel: holder,
      })
    }
  }

  handleUpload = chosen => {
    const { images, url } = this.state
    let urlContainer = url
    const uploadTask = storage.ref(`images/${chosen}`).put(images[chosen])

    uploadTask.on(
      "state_changed",
      snapshot => {
        // this.notification("success", "Upload Done ")
      },
      error => {
        // this.notification("error", error)
      },
      () => {
        this.notification("success", "Upload Done")
        storage
          .ref("images")
          .child(chosen)
          .getDownloadURL()
          .then(url => {
            urlContainer[chosen] = url
            this.setState({
              url: urlContainer,
            })
          })
          .then(() => {
            urlRef.set(url)
          })
      }
    )
  }
  handleCarouselUpload = chosen => {
    const { carousel, carouselurl } = this.state
    let urlContainer = carouselurl
    const uploadTask = storage.ref(`carousel/${chosen}`).put(carousel[chosen])

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log(snapshot)
      },
      error => {
        console.log(error)
      },
      () => {
        this.notification("success", "Carousel Upload Done")
        storage
          .ref("carousel")
          .child(chosen)
          .getDownloadURL()
          .then(url => {
            urlContainer[chosen] = url
            this.setState({
              carouselurl: urlContainer,
            })
          })
          .then(() => {
            carouselUrlRef.set(carouselurl)
          })
      }
    )
  }

  render() {
    const { Panel } = Collapse
    const { images, url, carousel, carouselurl } = this.state
    return (
      <div>
        <Manage></Manage>
        <LordContainer>
          <Container>
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
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Center>
                      <input
                        type="file"
                        id={each}
                        onChange={this.handleChange}
                      />
                      <button
                        onClick={() => {
                          this.handleUpload(each)
                        }}
                      >
                        Upload
                      </button>
                      <div
                        style={{
                          margin: "auto",
                          paddingTop: "5%",
                          maxWidth: "500px",
                        }}
                      >
                        <img src={url[each]} />
                      </div>
                    </Center>
                  </Card>
                </Panel>
              ))}
            </Collapse>
          </Container>

          <Container>
            <Collapse defaultActiveKey={["0"]}>
              {carouselSelection.map((each, index) => (
                <Panel
                  header={each.charAt(0).toUpperCase() + each.slice(1)}
                  key={`${index}`}
                >
                  <Card
                    key={index}
                    bordered={false}
                    hoverable
                    style={{
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Center>
                      <input
                        type="file"
                        id={each}
                        onChange={this.handleCarourselChange}
                      />
                      <button
                        onClick={() => {
                          this.handleCarouselUpload(each)
                        }}
                      >
                        Upload
                      </button>
                      <div
                        style={{
                          margin: "auto",
                          paddingTop: "5%",
                          maxWidth: "500px",
                        }}
                      >
                        <img src={carouselurl[each]} />
                      </div>
                    </Center>
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
