import React from "react"
import Layout from "../components/layout"
import { List } from "antd"
import styled from "styled-components"
import c2 from "../images/c2.jpg"
import { Link } from "gatsby"
import { faqsRef } from "../config/fire"
const Wrapper = styled.div`
  height: 50vh;
  margin-top: 2%;

  .container {
    margin-top: 5%;
    display: flex;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }

    .right-panel {
      padding-right: 20px;
      flex: 1;
      height: 500px;

      img {
        width: 100%;
        object-fit: cover;
        height: 350px;
      }
    }
    .left-panel {
      flex: 1;

      padding: 0% 5% 0% 5%;
      p {
        font-size: 30px;
      }
    }
    .left-panel > h1 {
      margin-bottom: 50px;
    }
    .faq-item {
      display: block;
      align-content: space-between;
    }
    .content {
      width: 100%;
    }
  }
  .ant-list-item-meta-description {
    margin-top: 50px;
  }
`

class FaqsPage extends React.PureComponent {
  state = {}

  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  componentWillMount() {
    const { data } = this.state

    faqsRef.get().then(doc => {
      const faqs = doc.data().faq
      const ans = doc.data().answers

      var dataTemp = []
      faqs.map((each, index) => {
        dataTemp.push({ question: each, answer: ans[index] })
      })
      this.setState({
        data: dataTemp,
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <Layout>
        <Wrapper>
          <div className="container">
            <div className="left-panel">
              <h1>FAQs</h1>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<p>{item.question}</p>}
                      description={<h4>{item.answer}</h4>}
                    />
                  </List.Item>
                )}
              />
              ,
              {/* {faqs.map((each, index, array) => (
                <div key={index} className="faq-item">
                  <div className="content">
                    <h3>{each} </h3>
                    <p>{answers[index]}</p>
                  </div>
                </div>
              ))} */}
            </div>
            <div className="right-panel">
              <img src={c2} alt="" />
            </div>
          </div>
        </Wrapper>
      </Layout>
    )
  }
}

export default FaqsPage
