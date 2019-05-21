import React, {Component, Fragment} from 'react';
import Webcam from 'react-webcam';
import YouTube from 'react-youtube';

const ANGRY_VIDEO_ID = 'cmpRLQZkTb8';
const HAPPY_VIDEO_ID = 'ZbZSe6N_BXs';
const SAD_VIDEO_ID = 'L3HQMbQAWRc';
const DISGUST_VIDEO_ID = 'cmpRLQZkTb8';
const FEAR_VIDEO_ID = 'cmpRLQZkTb8';
const NEUTRAL_VIDEO_ID = 'cmpRLQZkTb8';
const SURPRISE_VIDEO_ID = 'cmpRLQZkTb8';
const EXPRESSION_VIDEO_MAP = {
    Angry: ANGRY_VIDEO_ID,
    Disgust: DISGUST_VIDEO_ID,
    Fear: FEAR_VIDEO_ID,
    Happy: HAPPY_VIDEO_ID,
    Neutral: NEUTRAL_VIDEO_ID,
    Sad: SAD_VIDEO_ID,
    Surprise: SURPRISE_VIDEO_ID,
};

class YoutubePlayer extends Component {
    render() {
        let video = EXPRESSION_VIDEO_MAP[this.props.expression];
        console.log(video);
        let videoSrc = "https://www.youtube.com/embed/" + video;
        return (
            <div className="container">
{/*
                <iframe className="player" type="text/html" width="100%" height="100%"
                        src={videoSrc}
                        frameborder="0"/>
*/}
                Hey Why are you ${this.props.expression}

            </div>


        );
    }
}

export default YoutubePlayer;
