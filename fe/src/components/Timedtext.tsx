import React from "react";
import { Typography, Select } from '@material-ui/core';
import { observer, inject } from "mobx-react"
import { YouTubePlayerStore } from './YouTubePlayerStore';
import EventView from './EventView';

interface IProps {
    YouTubePlayerStore?: YouTubePlayerStore;
    className?: string
}

@inject("YouTubePlayerStore")
@observer
export default class Timedtext extends React.PureComponent<IProps> {
    // TODO shouldComponentUpdate(nextProps: IProps): boolean {
    //     this.props.YouTubePlayerStore!.VideoData.title
    //     this.props.YouTubePlayerStore!.VideoData.author
    //     this.props.YouTubePlayerStore!.CaptionTracks.ShowCaptionTillEvent
    //     this.props.YouTubePlayerStore!.TimedTextData

    //     return true;
    // }

    render() {
        console.log("Timedtext render")
        const events = this.props.YouTubePlayerStore!.TimedTextData.events;
        if (events.length === 0)
            return <h1>{'<= Shoose video'}</h1>;
        return <div className={this.props.className}>
            <h1>
                {this.props.YouTubePlayerStore!.VideoData.title}
                {this.props.YouTubePlayerStore!.VideoData.author ? ' // ' : ''}
                {this.props.YouTubePlayerStore!.VideoData.author}
            </h1>
            {this.props.YouTubePlayerStore!.CaptionTracks.length > 1
                ? <h3>
                    Subtitles:{' '}
                    {
                        this.props.YouTubePlayerStore!.CaptionTracks.length > 0 ?
                            <Select native
                                value={this.props.YouTubePlayerStore!.CurrentCaptionTrack
                                    ? this.props.YouTubePlayerStore!.CurrentCaptionTrack.baseUrl
                                    : undefined}
                                onChange={e => this.props.YouTubePlayerStore!.SetCurrentCaptionTrack(e.target.value as string)}
                            >
                                {this.props.YouTubePlayerStore!.CaptionTracks.map(c => {
                                    return <option key={c.baseUrl} value={c.baseUrl} >{c.name.simpleText}</option>
                                })
                                }
                            </Select>
                            : <></>
                    }
                </h3>
                : ''
            }
            <Typography paragraph>
                {events
                    .filter((e, eIndex) =>
                        (this.props.YouTubePlayerStore!.ShowCaptionTillEvent === -1)
                        || (eIndex < this.props.YouTubePlayerStore!.ShowCaptionTillEvent)
                    )
                    .map((e, eIndex) =>
                        <EventView
                            key={'e' + eIndex}
                            id={'e' + eIndex}
                            e={e} />
                    )
                }
            </Typography>
        </div>;
    }
}