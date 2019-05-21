import React, {Component, Fragment} from 'react';
import Webcam from 'react-webcam';
import YouTube from 'react-youtube';
import YoutubePlayer from './YoutubePlayer.js';


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
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({
                expression: data.expression,
                videoId: SAD_VIDEO_ID,
            });
            alert(data);
        });
    };


    renderVideo() {
        return (
            <YoutubePlayer
                video={SAD_VIDEO_ID}
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
            expression,
        } = this.state;
        return (
            <Fragment>
                { !expression && this.renderWebCam() }
                { expression && this.renderVideo() }
            </Fragment>
        );
    }
}

export default WebCam1;
