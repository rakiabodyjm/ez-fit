import React from "react"
import Layout from "../components/layout"
import { Button, Input, Icon, notification } from "antd"
import styled from "styled-components"
import c2 from "../images/c2.jpg"
import { Link } from "gatsby"
import { faqsRef } from "../config/fire"
import Manage from "./manage"

const { TextArea } = Input

const Wrapper = styled.div`
  height: 50vh;
  margin-top: 2%;

  input,
  textarea {
    width: 100%;
  }
  .container {
    margin-top: 5%;
    display: flex;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }

    .right-panel {
      text-align: center;
      padding: 30px;
      display: block;
      /* border: 5px solid black; */
      flex: 1;
      height: 500px;
      margin-right: 30px;
      img {
        width: 100%;
        object-fit: contain;
        height: 350px;
      }
    }
    .left-panel {
      flex: 1;

      padding: 0% 5% 0% 5%;
      p {
        font-size: 20px;
      }
    }
    .left-panel > h1 {
      margin-bottom: 50px;
    }

    .faq-item {
      display: flex;
      align-content: space-between;
    }

    .icon {
      width: 30px;
      cursor: pointer;
    }
    .textfield {
      display: block;
    }
    .content {
      width: 100%;
    }
  }
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

class FaqsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      faqs: [],
      answers: [],
      hidden: true,
      newFaq: "",
      newAns: "",
    }
  }

  componentWillMount() {
    faqsRef.get().then(doc => {
      this.setState({
        faqs: doc.data().faq,
        answers: doc.data().answers,
      })
    })
  }

  createHandler = () => {
    const { faqs, answers, newFaq, newAns } = this.state
    let copyFaqs = faqs.slice()
    let copyAns = answers.slice()

    copyFaqs.push(newFaq)
    copyAns.push(newAns)
    this.setState({
      faqs: copyFaqs,
      answers: copyAns,
    })

    if (newFaq.length < 1 || newAns.length < 1) {
      this.notification("error", "received empty FAQs field")
    } else {
      faqsRef
        .set({ faq: copyFaqs, answers: copyAns })
        .then(() => {
          this.notification("success", "FAQS Saved")
        })
        .catch(error => {
          this.notification("error", error)
        })

      this.setState({
        newFaq: "",
        newAns: "",
      })
    }
  }

  deleteHandler = index => {
    const { faqs, answers, newFaq, newAns } = this.state

    // let copyFaqs = faqs.slice()
    // let copyAns = answers.slice()

    faqs.splice(index, 1)
    answers.splice(index, 1)

    this.setState({
      faqs: faqs,
      answers: answers,
    })

    faqsRef
      .update({ faq: faqs, answers: answers })
      .then(() => {
        this.notification("success", "FAQ item Deleted")
      })
      .catch(error => {
        this.notification("error", error)
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })

    const pogi = e.target.id
    console.log(this.state[pogi])
  }

  notification = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  render() {
    const { faqs, answers, hidden } = this.state
    return (
      <div>
        <Manage />
        <Wrapper>
          <div className="container">
            <div className="left-panel">
              <h1>FAQs</h1>

              {faqs.map((each, index, array) => (
                <div
                  key={index}
                  className="faq-item"
                  onMouseEnter={() => {
                    this.setState({
                      hidden: false,
                    })
                  }}
                  onMouseLeave={() => {
                    this.setState({
                      hidden: true,
                    })
                  }}
                >
                  <div className="content">
                    <h3>{each} </h3>
                    <p>{answers[index]}</p>
                  </div>

                  <div
                    className="icon"
                    style={hidden ? { visibility: "hidden" } : {}}
                  >
                    <Icon
                      type="delete"
                      onClick={() => {
                        this.deleteHandler(index)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="right-panel">
              <h2>Create New FAQ</h2>
              <h5>Question</h5>
              <Input
                id="newFaq"
                onChange={this.handleChange}
                onPaste={this.handleChange}
                value={this.state.newFaq}
              />
              <h5>Answer</h5>
              <TextArea
                className="textfield"
                rows={4}
                id="newAns"
                onChange={this.handleChange}
                onPaste={this.handleChange}
                value={this.state.newAns}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  style={btnStyle}
                  type="primary"
                  icon="upload"
                  size="large"
                  onClick={this.createHandler}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default FaqsPage
