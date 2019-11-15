import React, { useState, useEffect } from "react"
import { Carousel, Button } from "antd"
import Layout from "../components/layout"
import Image from "../components/image"
import styled from "styled-components"
import c1 from "../images/c1.jpg"
import c2 from "../images/c2.jpg"
import { actsRef, urlRef, selection } from "../config/fire"
import { Router, Link } from "@reach/router"

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

const Wrapper = styled.div`
  height: 50vh;
  margin-top: 2%;

  .container {
    margin-top: 2%;
    display: flex;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }

    .left-panel {
      flex: 1.5;
      height: 400px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        height: 350px;
      }
    }
    .right-panel {
      flex: 1;

      padding: 0% 5% 0% 5%;
      p {
        font-size: 30px;
      }
    }
  }
`

const AboutUs = styled.div`
  background-color: #ff8900;
  height: 50vh;
  margin-top: 3%;
  margin-bottom: 1%;

  display: flex;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
  .left-panel {
    flex: 1;
    text-align: center;
    padding: 5%;
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

const Template = props => {
  const [activities, setActivities] = useState(
    actsRef.get().then(doc => {
      setActivities({
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
      })
    })
  )
  const [url, setUrl] = useState(
    urlRef.get().then(doc => {
      setUrl(doc.data())
    })
  )
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <Layout>
      <Wrapper>
        <Link to="/">
          <Button style={{ marginLeft: "2%" }}>Back</Button>
        </Link>

        <div className="container">
          <div className="left-panel">
            <img src={url[props.act]} alt="" />
          </div>
          <div className="right-panel">
            <h3>{props.act}</h3>
            <br />
            <p>{activities[props.act]}</p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

const ActivityTemplate = () => {
  return (
    <Router>
      <Template path="/activity/:act" />
    </Router>
  )
}
export default ActivityTemplate
