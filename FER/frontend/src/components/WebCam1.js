import React, {Component, Fragment} from 'react';
import Webcam from 'react-webcam';
import YouTube from 'react-youtube';


const ANGRY_VIDEO_ID = 'cmpRLQZkTb8';
const HAPPY_VIDEO_ID = 'ZbZSe6N_BXs';
const SAD_VIDEO_ID = 'L3HQMbQAWRc';

class WebCam1 extends Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    constructor(props) {
        super(props);
        this.state = {
            expression: '',
            videoId: '',
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
                videoId: HAPPY_VIDEO_ID,
            });
        });
    };


    renderVideo() {
        const {
            videoId,
        } = this.state;
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        return (
            <YouTube
                videoId={videoId}
                opts={opts}
            />
        );
    }

    renderWebCam() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: 'user'
        };

        return (
            <Fragment>
                <Webcam
                    audio={false}
                    height={600}
                    ref={this.setRef}
                    screenshotFormat='image/jpeg'
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
