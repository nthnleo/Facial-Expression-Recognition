import React, { Component, Fragment } from "react";
import Webcam from "react-webcam";
import SummaryPieChart from "./SummaryPieChart.js";
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const EXPRESSION_MAP = {
  angry: {
    gifurl: "https://giphy.com/embed/11tTNkNy1SdXGg",
    comment: "You look ANGRY!!!!"
  },
  sad: {
    gifurl: "https://giphy.com/embed/9Y5BbDSkSTiY8",
    comment: "You look SAD. Cheer Up!!!"
  },
  happy: {
    gifurl: "https://giphy.com/embed/rdma0nDFZMR32",
    comment: "WOW! You look HAPPY!! This is your day"
  },
  neutral: {
    gifurl: "https://giphy.com/embed/3o6nUYhmHg75WFGHHG",
    comment: "You are NEUTRAL!!! Are you not human"
  },
  none: {
    gifurl: "https://giphy.com/embed/5QW76Ww9bquHdg1fTv",
    comment: "Are you invisible! I can't find you!!!"
  },
  disgust: {
    gifurl: "https://giphy.com/embed/R0jWWtH1CtFEk",
    comment: "You are DISGUSTED!! Who cut the cheese???"
  },
  surprise: {
    gifurl: "https://giphy.com/embed/kym4u59Xx1V2U",
    comment: "You look SURPRISED!!!"
  },
  fear: {
    gifurl: "https://giphy.com/embed/xUOxf5cHAC4GFFYNWw",
    comment: "You look in FEAR!!! Where is the Ghost!!"
  }
};

class WebCam1 extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  constructor(props) {
    super(props);
    let interval;
    this.state = {
      expression: "",
      imageSrc: "",
      angry: 0,
      sad: 0,
      happy: 0,
      fear: 0,
      neutral: 0,
      surprise: 0,
      disgust: 0,
      isRecord: false,
    };
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageSrc });
    fetch("http://127.0.0.1:8000/facialExpression/extractExpression", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: imageSrc
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        let expression = data.expressionFromGCP
          ? data.expressionFromGCP
          : data.expression;
        expression = expression ? expression.toLowerCase() : null;
        this.setState({
          expression: expression
        });
        this.addExpression(expression);
      });
  };

  startRecording = () => {
      this.setState({isRecord: true});
      this.interval = setInterval(() => {
          const imageSrc = this.webcam.getScreenshot();
          fetch("http://127.0.0.1:8000/facialExpression/extractExpression", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  data: imageSrc
              })
          })
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  console.log(data);
                  let expression = data.expressionFromGCP
                      ? data.expressionFromGCP
                      : data.expression;
                  expression = expression ? expression.toLowerCase() : null;
                  this.addExpression(expression);
              });
      }, 5000);
  }

  addExpression = (expression) => {
      let count;
      switch (expression) {
          case "angry":
              count = this.state.angry + 1;
              this.setState({
                  angry: count
              });
              break;
          case "sad":
              count = this.state.sad + 1;
              this.setState({
                  sad: count
              });
              break;
          case "happy":
              count = this.state.happy + 1;
              this.setState({
                  happy: count
              });
              break;
          case "neutral":
              count = this.state.neutral + 1;
              this.setState({
                  neutral: count
              });
              break;
          case "disgust":
              count = this.state.disgust + 1;
              this.setState({
                  disgust: count
              });
              break;
          case "surprise":
              count = this.state.surprise + 1;
              this.setState({
                  surprise: count
              });
              break;
          case "fear":
              count = this.state.fear + 1;
              this.setState({
                  fear: count
              });
      }
  }

  stopRecording = () => {
      this.setState({isRecord: false});
      clearInterval(this.interval);
  }

  renderResult() {
    const { expression } = this.state;
    const { gifurl, comment } = EXPRESSION_MAP[expression];
    return (
      <Fragment>
        <div> {comment} </div>
        <iframe
          src={gifurl}
          width="480"
          height="267"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </Fragment>
    );
  }

  renderWebCam() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <Fragment>
        <Webcam
          audio={false}
          height={600}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={600}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
          <button onClick={this.state.isRecord ? this.stopRecording : this.startRecording}>
              {this.state.isRecord ? "Stop Recording": "Start Recording"}
          </button>
      </Fragment>
    );
  }

  renderImage() {
    const {
      imageSrc,
    } = this.state;
    return(imageSrc && <img src={imageSrc} alt={"Loading"} />)
  }

  render() {
    const {
      expression,
      angry,
      sad,
      happy,
      neutral,
      surprise,
      disgust,
      fear,
      isRecord,
    } = this.state;
    return (
        <Fragment>
          <Table style={{position: 'absolute'}}>
            <tbody>
              <tr>
                  <td>
                    {this.renderWebCam()}
                  </td>
                  <td style={{paddingTop: '180px'}}>
                    {this.renderImage()}
                  </td>
                </tr>
              <tr>
                <td>
                  {expression && this.renderResult()}
                </td>
                <td>
                  <SummaryPieChart
                      angry={angry}
                      sad={sad}
                      happy={happy}
                      neutral={neutral}
                      surprise={surprise}
                      disgust={disgust}
                      fear={fear}
                  />
                </td>
              </tr>
            </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default WebCam1;
