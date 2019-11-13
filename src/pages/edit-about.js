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

const Section1 = styled.div`
  height: 100vh;
  padding: 3% 1.5% 0% 1.5%;
  @media screen and (max-width: 500px) {
    margin-top: 75%;
  }

  .card-container {
    width: 100%;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }

    .card {
      background-color: yellow;
      width: 240px;
      height: 500px;
      border-radius: 10px;

      @media screen and (max-width: 500px) {
        width: 100%;
        height: 200px;
        margin-bottom: 5%;
      }

      img {
        object-fit: cover;
        height: 100%;
        border-radius: 10px;
        @media screen and (max-width: 500px) {
          width: 100%;
        }
      }
    }
  }
`

const AboutUs = styled.div`
  background-color: #ff8900;
  min-height: auto;
  margin-top: 3%;
  margin-bottom: 1%;
  display: flex;
  flex-wrap: around;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
  .left-panel {
    flex: 1;
    text-align: center;
    /* padding: 5%; */
    padding: 0% 5% 0% 5%;
    color: white;
    h1 {
      color: white;
    }
  }
  .right-panel {
    flex: 1;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
`

const StyledCarousel = styled(Carousel)`
  div {
    img {
      object-fit: cover;
      height: 90vh;
      width: 100%;
    }
  }
`

const StyledCarouselEdit = styled.div`
  border: 5px solid black;

  .container {
    display: flex;
  }

  /* background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6752136752136753) 42%,
    rgba(0, 0, 0, 0.5046612394957983) 100%
  ); */
  div > img {
    cursor: pointer;
    max-height: 500px;
    justify-content: space-between;
    padding: 10px;
  }
  h3 {
    text-align: center;
  }
`

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
    if (e.target.id === "about1") {
      console.log(e.target.id + "pota")
    }

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
        this.notification("error", error)
      })
  }

  notification = (type, message) => {
    notification[type]({
      message: message,
    })
  }
  render() {
    return (
      <Layout>
        <StyledCarouselEdit>
          <div className="container">
            <div>
              <img src={c1} />
            </div>
            <div>
              <img src={c2} />
            </div>
            <div>
              <img src={c1} />
            </div>
            <div>
              <img src={c2} />
            </div>
          </div>
          <h3>Carousel</h3>
        </StyledCarouselEdit>

        <Button
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

        <AboutUs>
          <div className="left-panel">
            <h1>About Us</h1>

            <p>About Us 1</p>
            <Input.TextArea
              defaultValue={this.state.about1}
              rows={4}
              autoSize
              onChange={this.changeHandler}
            />

            <p>About Us 2</p>
            <Input.TextArea
              defaultValue={this.state.about2}
              rows={4}
              autoSize={{ minRows: 1, maxRows: 6 }}
              onChange={this.changeHandler}
            />
            <Button
              style={{
                backgroundColor: "##2E414F",
                marginTop: "10px",
                borderColor: "#2E414F",
              }}
              type="primary"
              icon="upload"
              size="large"
              onClick={this.confirmHandler}
            >
              Update
            </Button>
          </div>
          <div className="right-panel">
            <img src={c2} alt="" />
          </div>
        </AboutUs>

        <Section1>
          <h2>Activities We Offer</h2>

          <div className="card-container">
            <Link to="/yoga">
              <div className="card">
                <img src={c1} alt="" />
              </div>
            </Link>
            <Link to="/crossfit">
              <div className="card">
                <img src={c1} alt="" />
              </div>
            </Link>
            <Link to="/cycling">
              <div className="card">
                <img src={c1} alt="" />
              </div>
            </Link>
            <Link to="/zumba">
              <div className="card">
                <img src={c1} alt="" />
              </div>
            </Link>
            <Link to="/hardcoremax">
              <div className="card">
                <img src={c1} alt="" />
              </div>
            </Link>
          </div>
        </Section1>
      </Layout>
    )
  }
}

export default EditPage
