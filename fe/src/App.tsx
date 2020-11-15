import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from "@material-ui/core";
import GitHubForkRibbon from 'react-github-fork-ribbon';

import YouTubePlayer from './components/YouTubePlayer';
import StudyStepsControler from './components/StudyStepsControler'
import Timedtext from './components/Timedtext';
import Cue from './components/CueForm';

export default function App() {
  return (
    <>
      <CssBaseline />
      {/* flex - https://codesandbox.io/s/z24wl3n58m */}
      <Grid container className="flex-section">
        <Grid
          item
          xs={4}
          className={"flex-col-scroll"}
        >
          <YouTubePlayer />
          <StudyStepsControler />
        </Grid>
        <Grid
          item
          xs={8}
          className={"flex-col-scroll"}
        >
          <Timedtext />
          <Cue />
        </Grid>
      </Grid>

      <GitHubForkRibbon href="//github.com/you-eng-com/you-eng-com"
        target="_blank"
        position="right">
        Fork me on GitHub
      </GitHubForkRibbon>


    </>
  );
}
