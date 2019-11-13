import React from "react"
import Layout from "../components/layout"
import { Button } from "antd"
import styled from "styled-components"
import c2 from "../images/c2.jpg"
import { Link } from "gatsby"

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

class ZumbaPage extends React.Component {
  state = {}
  render() {
    return (
      <Layout>
        <Wrapper>
          <Link to="/">
            <Button style={{ marginLeft: "2%" }}>Back</Button>
          </Link>

          <div className="container">
            <div className="left-panel">
              <img src={c2} alt="" />
            </div>
            <div className="right-panel">
              <p>
                Non adipisicing dolor id et nostrud sit dolor ipsum dolore.
                Occaecat officia sit culpa consectetur ex nisi tempor mollit
                incididunt. Sit pariatur veniam esse cillum excepteur
                reprehenderit do est culpa. Proident cillum occaecat eu ipsum.
              </p>
            </div>
          </div>
        </Wrapper>
      </Layout>
    )
  }
}

export default ZumbaPage
