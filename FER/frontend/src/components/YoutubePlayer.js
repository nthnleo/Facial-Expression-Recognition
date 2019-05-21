import React, {Component, Fragment} from 'react';
import Webcam from 'react-webcam';
import YouTube from 'react-youtube';


const ANGRY_VIDEO_ID = 'cmpRLQZkTb8';
const HAPPY_VIDEO_ID = 'ZbZSe6N_BXs';
const SAD_VIDEO_ID = '2g811Eo7K8U';

class YoutubePlayer extends Component {
    render() {
        let videoSrc = "https://www.youtube.com/embed/" + this.props.video;
        return (
            <div className="container">
                <iframe className="player" type="text/html" width="100%" height="100%"
                        src={videoSrc}
                        frameborder="0"/>
            </div>
        );
    }
}

export default YoutubePlayer;
