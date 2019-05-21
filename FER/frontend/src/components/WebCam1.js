import React, { Component, Fragment } from "react";
import Webcam from "react-webcam";
import YouTube from "react-youtube";
import YoutubePlayer from "./YoutubePlayer.js";

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
            ? data.expressionFromGCP
            : data.expression
        });
        alert(data);
      });
  };

  renderGif() {
        return (
            <Fragment>
                <iframe src="https://giphy.com/embed/11tTNkNy1SdXGg" width="480" height="267" frameBorder="0"
                        className="giphy-embed" allowFullScreen></iframe>
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
        expression,
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
                { expression && this.renderGif() }
            </Fragment>
        );
    }
}

export default WebCam1;
