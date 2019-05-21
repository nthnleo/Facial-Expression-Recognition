import React, {Component, Fragment} from 'react';
import Webcam from 'react-webcam';
import YouTube from 'react-youtube';

class WebCam1 extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };

    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat='image/jpeg'
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }

    constructor(props) {
        super(props);
        this.state = {
            emotion: '',
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        fetch('http://127.0.0.1:8000/facialExpression/extractExpression', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: imageSrc
            })
        }).then(response => {
            this.setState({
                emotion: response,
            });
            alert(JSON.stringify(response));
        });
    };


    renderVideo() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        return (
            <YouTube
                videoId="2g811Eo7K8U"
                opts={opts}
            />
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
                    videoConstraints={videoConstraints}/>
                <button onClick={this.capture}>Capture photo</button>
            </Fragment>
        );
    }

    render() {
        const {
            emotion,
        } = this.state;
        return (
            <Fragment>
                { !emotion && this.renderWebCam() }
                { emotion && this.renderVideo() }
            </Fragment>
        );
    }
}

export default WebCam1;
