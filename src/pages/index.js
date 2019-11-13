import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Carousel, Button } from "antd"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import styled from "styled-components"
import c1 from "../images/c1.jpg"
import c2 from "../images/c2.jpg"
import CROSSFIT from "../images/CROSSFIT.jpg"

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
    @media screen and (max-width: 600px) {
      flex-direction: column;
    }

    .card {
      /* background-color: yellow; */
      width: 100%;
      padding: 10px;
      height: 500px;
      border-radius: 10px;

      @media screen and (max-width: 600px) {
        width: 100%;
        height: 200px;
        margin-bottom: 5%;
      }

      img {
        object-fit: cover;
        height: 100%;
        border-radius: 10px;
        @media screen and (max-width: 600px) {
          width: 100%;
        }
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

const StyledCard = styled.div``

const IndexPage = () => {
  const [about1, setAbout1] = useState(
    aboutusRef.get().then(doc => {
      setAbout1(doc.data().about1)
    })
  )
  const [about2, setAbout2] = useState(
    aboutusRef.get().then(doc => {
      setAbout2(doc.data().about2)
    })
  )

  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   aboutusRef.get().then(doc => {
  //     setAbout1(doc.data().about1)
  //     setAbout2(doc.data().about2)
  //     setLoading(false)
  //   })
  // }, [])
  return (
    <Layout>
      <StyledCarousel autoplay dotPosition="top">
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
      </StyledCarousel>
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
          <p>
            {/* Amet exercitation enim id sit sunt elit voluptate laborum officia
            non ipsum elit nulla. Tempor sit excepteur non adipisicing
            exercitation ut eu est do nulla. Ipsum eu aliquip velit culpa minim.
            Dolor non sint irure tempor sunt nisi nostrud ut voluptate
            excepteur. */}
            {about1}
          </p>
          <p>
            {/* Id id aliqua non qui laboris proident et sunt culpa magna. Ad
            proident id exercitation consequat sunt enim. Consectetur laborum
            adipisicing non adipisicing culpa adipisicing. */}
            {about2}
          </p>
        </div>
        <div className="right-panel">
          <img src={c2} alt="" />
        </div>
      </AboutUs>

      <Section1>
        <h2>Activities We Offer</h2>

        <div className="card-container">
          <Link to="/activity/yoga">
            <div className="card">
              <img src={CROSSFIT} alt="" />
            </div>
          </Link>
          <Link to="/activity/crossfit">
            <div className="card">
              <img src={c1} alt="" />
            </div>
          </Link>
          <Link to="/activity/cycling">
            <div className="card">
              <img src={c1} alt="" />
            </div>
          </Link>
          <Link to="/activity/zumba">
            <div className="card">
              <img src={c1} alt="" />
            </div>
          </Link>
          <Link to="/activity/hardcoremax">
            <div className="card">
              <img src={c1} alt="" />
            </div>
          </Link>
        </div>
      </Section1>
    </Layout>
  )
}

export default IndexPage
