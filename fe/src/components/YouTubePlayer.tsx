import * as React from "react";
import { observer, inject } from "mobx-react"
import { YouTubePlayerStore, PlayerStatuses } from './YouTubePlayerStore';
import { TextField } from "@material-ui/core";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: any;
    }
}

interface IProps {
    YouTubePlayerStore?: YouTubePlayerStore;
}

@inject("YouTubePlayerStore")
@observer
export default class YouTubePlayer extends React.PureComponent<IProps> {
    render() {
        console.log("render", this.props.YouTubePlayerStore!.VideoId)

        if (this.props.YouTubePlayerStore!.Player && this.props.YouTubePlayerStore!.Player.loadVideoById)
            this.props.YouTubePlayerStore!.Player.loadVideoById(this.props.YouTubePlayerStore!.VideoId)
        return <>
            <TextField
                label="Enter youtube URL or VideoID"
                variant="filled"
                onChange={(e: any) => { this.props.YouTubePlayerStore!.SetVideoId(e.target.value) }}
                style={{ width: "100%" }}
                margin={'dense'}
            />

            <div className="videoWrapper">
                <div id={`player`} />
            </div>
        </>
    }

    componentDidMount = () => {
        if (!window.YT) { // If not, load the script asynchronously
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            window.onYouTubeIframeAPIReady = this.initPlayer;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
        } else { // If script is already there, load the video directly
            this.initPlayer();
        }
        window.addEventListener("message", this.getMessageFromYT);
    };

    initPlayer = () => {
        this.props.YouTubePlayerStore!.SetPlayer(
            new window.YT.Player(`player`, {
                videoId: this.props.YouTubePlayerStore!.VideoId,
                playerVars: {
                    autoplay: 1,
                },
                events: {
                    onReady: this.onReady,
                    onStateChange: this.onStateChange,
                    onError: this.onError,
                },
            })
        );
    };

    componentWillUnmount() {
        window.removeEventListener("message", this.getMessageFromYT);
    }

    getMessageFromYT = (event: any) => {
        const t0 = performance.now();
        //TODO check, that is from YT
        let data: any = undefined;
        try {
            data = JSON.parse(event.data);
        } catch (error) {
            //console.error("YT message error", error, event)
            return
        }
        console.log("YT message", data.event, data.info)

        if (data.info) {
            if ((data.info.playerState !== undefined)
                && (
                    this.props.YouTubePlayerStore!.PlayerStatus !== data.info.playerState)) {
                this.props.YouTubePlayerStore!.SetPlayerStatus(data.info.playerState)

            }
            let dtime = 0;
            if (data.info.currentTimeLastUpdated_) {
                let dtime = Date.now() - 1000 * data.info.currentTimeLastUpdated_
                if (dtime > 100)
                    console.warn("dtime=", dtime);
            }
            if (data.info.currentTime) {
                this.props.YouTubePlayerStore!.SetCurrentTime(data.info.currentTime * 1000 + dtime)
            }
        }

        const t1 = performance.now();
        if ((t1 - t0) > 2)
            console.warn("<< YT message", `${performance.now() - t0} ms`)
    }

    onReady = () => {
        this.props.YouTubePlayerStore!.SetPlayerStatus(PlayerStatuses.Unstarted)
    };

    dalayExitFullscreen = () => {
        // if playing restore (example: for video seek), then not exit from fullscreen
        setTimeout(() => {
            if (document.fullscreenElement &&
                this.props.YouTubePlayerStore!.PlayerStatus !== PlayerStatuses.Playing)
                document.exitFullscreen()
        }, 1000);
    }

    onStateChange = (event: any) => {
        this.props.YouTubePlayerStore!.SetPlayerStatus(event.data)

        if (event.data === PlayerStatuses.Ended || event.data === PlayerStatuses.Paused)
            this.dalayExitFullscreen()
    }

    onError = (e: any) => {
        console.log("onError", e.data)
    }
}