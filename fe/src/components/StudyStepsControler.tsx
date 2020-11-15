import * as React from "react";
import { observer, inject } from "mobx-react"

import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ButtonGroup, Button } from '@material-ui/core';
import { YouTubePlayerStore, StudySteps } from './YouTubePlayerStore';

interface IProps {
    YouTubePlayerStore?: YouTubePlayerStore;
}

@inject("YouTubePlayerStore")
@observer
export default class StudyStepsControler extends React.PureComponent<IProps> {
    p: YouTubePlayerStore;
    constructor(props: IProps) {
        super(props)
        this.p = props.YouTubePlayerStore!;
    }

    toStep1 = () => {
        this.p.SetStudyStep(StudySteps.UnderstandTheContext)
    }
    toStep2 = () => {
        this.p.SetStudyStep(StudySteps.WithSubtitles)
    }

    render() {
        return <div>
            <Stepper activeStep={this.p.StudyStep} orientation="vertical">
                <Step key="s1">
                    <StepLabel>Посмотреть полностью, без субтитров</StepLabel>
                    <StepContent>
                        <Typography>Посмотрите видео полностью, без субтитров. Не важно, какой процент информации Вы поймёте, старайтесь понять контекст.</Typography>
                        <Button
                            onClick={this.p.PlayFullscreen}
                            variant="contained" color="primary">Смотреть</Button>

                        <br /><br />
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button
                                disabled={true}
                                variant="contained">Back</Button>
                            <Button
                                onClick={this.toStep2}
                                variant="contained">Next</Button>
                        </ButtonGroup>
                    </StepContent>
                </Step >
                <Step key="s2">
                    <StepLabel>Посмотреть пофразно, с субтитрами</StepLabel>
                    <StepContent>
                        <Typography>Плеер проигрывает одну фразу, попытайся понять её на слух. Повтори фразу за героем. Проверь себя, посмотрев субтитры.</Typography>

                        <br /><br />
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button
                                onClick={this.toStep1}
                                variant="contained">Back</Button>
                            <Button
                                disabled={true}
                                variant="contained">Next</Button>
                        </ButtonGroup>
                    </StepContent>
                </Step >
            </Stepper>
        </div>;
    }
}