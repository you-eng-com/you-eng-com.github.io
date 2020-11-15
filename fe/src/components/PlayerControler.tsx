import * as React from "react";
import { observer, inject } from "mobx-react"

import { ButtonGroup, Button } from '@material-ui/core';
import { YouTubePlayerStore, PlayerStatuses } from './YouTubePlayerStore';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

interface IProps {
    YouTubePlayerStore?: YouTubePlayerStore;
}

@inject("YouTubePlayerStore")
@observer
export default class PlayerControler extends React.PureComponent<IProps> {
    p: YouTubePlayerStore;
    constructor(props: IProps) {
        super(props)
        this.p = props.YouTubePlayerStore!;
    }

    render() {
        return <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={this.p.PlayPrevCue}>
                <SkipPreviousIcon /></Button>
            <Button onClick={this.p.PlayCue}>
                <ReplayIcon /></Button>
            {this.p.PlayerStatus !== PlayerStatuses.Playing
                ? <Button onClick={this.p.PlayNextCue}>
                    <PlayArrowIcon /></Button>
                : <Button onClick={this.p.Pause}>
                    <PauseIcon /></Button>}
            <Button onClick={this.p.PlayNextCue}>
                <SkipNextIcon /></Button>
        </ButtonGroup>;
    }
}