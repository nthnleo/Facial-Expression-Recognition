import React, { Component, Fragment } from "react";
import Webcam from "react-webcam";

const EXPRESSION_MAP = {
    angry: {
        gifurl:"https://giphy.com/embed/11tTNkNy1SdXGg",
        comment: "You look ANGRY!!!!",
    },
    sad: {
        gifurl: "https://giphy.com/embed/9Y5BbDSkSTiY8",
        comment: "You look SAD. Cheer Up!!!",
    },
    happy: {
        gifurl: "https://giphy.com/embed/rdma0nDFZMR32",
        comment: "WOW! You look HAPPY!! This is your day",
    },
    neutral: {
        gifurl: "https://giphy.com/embed/3o6nUYhmHg75WFGHHG",
        comment: "You are NEUTRAL!!! Are you not human",
    },
    none: {
        gifurl: "https://giphy.com/embed/5QW76Ww9bquHdg1fTv",
        comment: "Are you invisible! I can't find you!!!",
    },
    disgust: {
        gifurl: "https://giphy.com/embed/R0jWWtH1CtFEk",
        comment: "You are DISGUSTED!! Who cut the cheese???",
    },
};

class WebCam1 extends Component {
      setRef = webcam => {
        this.webcam = webcam;
      };

    constructor(props) {
        super(props);
        this.state = {
            expression: '',
            videoId: '',
            imageSrc: '',
        }
    }


  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
      this.setState({imageSrc});
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
        this.setState({
          expression: data.expressionFromGCP
            ? data.expressionFromGCP.toLowerCase()
            : data.expression.toLowerCase()
        });
      });
  };

  renderResult() {
      const {
          expression,
      } = this.state;
      const { gifurl, comment } = EXPRESSION_MAP[expression];
      return (
          <Fragment>
            <div> {comment} </div>
            <iframe src={gifurl} width="480" height="267" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </Fragment>
      );
    }

  renderWebCam() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    const {
        imageSrc,
    } = this.state;

    return (
        !imageSrc ?
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
          </Fragment>  :
          <img src={imageSrc} alt={"Loading"}/>
    );
  }

    render() {
        const {
            expression,
        } = this.state;
        return (
            <Fragment>
                { this.renderWebCam() }
                { expression && this.renderResult() }
            </Fragment>
        );
    }
}

export default WebCam1;
