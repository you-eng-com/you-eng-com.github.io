import * as React from "react";
import { observer, inject } from "mobx-react"
import { YouTubePlayerStore, StudySteps } from './YouTubePlayerStore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions } from "@material-ui/core";
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import PlayerControler from './PlayerControler';
import SpeechMatcher from './SpeechMatcher';
import { Event2String } from '../helper';

interface IState {
    text: string;
    showSubtitles: boolean;
}

interface IProps {
    YouTubePlayerStore?: YouTubePlayerStore;
}

@inject("YouTubePlayerStore")
@observer
export default class CueForm extends React.PureComponent<IProps>
{
    state = {
        text: '',
        showSubtitles: false,
    }

    p: YouTubePlayerStore;//shot link

    constructor(props: IProps) {
        super(props)
        this.p = props.YouTubePlayerStore!;
    }

    static getDerivedStateFromProps(props: IProps, state: IState) {
        let text = Event2String(
            props.YouTubePlayerStore!.TimedTextData.events[props.YouTubePlayerStore!.ShowCaptionTillEvent]
        );
        if (state.text !== text) {
            return {
                showSubtitles: false,
                text,
            }
        }
        return null;
    }

    onShow = () => {
        this.setState({ showSubtitles: true })
    }

    render() {
        if (
            (this.p.StudyStep !== StudySteps.WithSubtitles)
            || (this.p.TimedTextData.events.length === 0)
            || (this.p.TimedTextData.events.length <= this.p.ShowCaptionTillEvent)
        )
            return <></>;

        return <Card variant="outlined" id="cue-form">

            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Текущая фраза
                </Typography>
                <Typography variant="h5" component="h2">

                    <Button onClick={this.onShow}>
                        <VisibilityIcon />
                    </Button>
                    {
                        this.state.showSubtitles
                            ? <span>{this.state.text}</span>
                            : <span>произнесите, что сказал герой видео, скажите <i><b>show</b></i> или нажмите на глазик</span>
                    }

                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Вы произнесли
                </Typography>
                <Typography variant="h5" component="h2">
                    <SpeechMatcher
                        text={this.state.text}
                        playerStatus={this.p.PlayerStatus}
                        onShow={this.onShow}
                        onResult={this.onShow}
                        onNext={this.p.PlayNextCue}
                        onRepeat={this.p.PlayCue}
                    />
                </Typography>
                <Typography color="textSecondary">
                    Позже, я добавлю перевод субтитров и список слов. А пока советую установить расшерение <a href="https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb" target="_blank" rel="noopener noreferrer">Google Translate</a>
                </Typography>
            </CardContent>
            <CardActions>
                <PlayerControler />
            </CardActions>
        </Card>
    }
}
