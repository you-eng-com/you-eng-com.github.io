import { makeAutoObservable } from "mobx"
import env from '../env'
import { Event } from '../helper'

export interface TimedTextData {
    events: Event[];
    //...
}

export interface CaptionTrack {
    baseUrl: string,
    isTranslatable: boolean,
    kind: string,  // asr = Automatic Speech Recognition
    languageCode: string,
    name: { simpleText: string },
    vssId: string,
}

export enum StudySteps {
    UnderstandTheContext = 0,
    WithSubtitles,
    StudyWords,
    Repeat,
}

export enum PlayerStatuses {
    NotReady = -2,
    Unstarted = -1,
    Ended = 0,
    Playing = 1,
    Paused = 2,
    Buffering = 3,
    VideoCued = 5,
}

export interface VideoData {
    author: string,
    title: string,
    //video_id
    //video_quality
}

export class YouTubePlayerStore {
    //TODO read VideoId on page load
    VideoId: string = "J3pF2jkQ4vc";
    TimedTextData: TimedTextData = { events: [] };
    CurrentTimeMs: number = -1;
    Player: any;
    StudyStep: StudySteps = StudySteps.UnderstandTheContext;
    PlayerStatus: PlayerStatuses = PlayerStatuses.NotReady;
    CaptionTracks: CaptionTrack[] = [];
    CurrentCaptionTrack: CaptionTrack | undefined = undefined;
    VideoData: VideoData = { author: "", title: "" };
    СurrentCaptionTrackEventIndex: number = -1;
    playFromMyButtom: boolean = false;
    ShowCaptionTillEvent: number = -1;

    constructor() {
        makeAutoObservable(this)
        this.SetVideoId("J3pF2jkQ4vc")
    }

    SetTimedTextData = (tt: TimedTextData | undefined) => {
        console.log("call setTimedTextData", tt)
        this.TimedTextData = tt || { events: [] };
        this.SetСurrentCaptionTrackEventIndex(
            this.TimedTextData.events.findIndex(e => this.CurrentTimeMs >= e.tStartMs))
    }

    SetVideoId = (videoIdOrURL: string) => {
        if (videoIdOrURL.length === 11)
            this.VideoId = videoIdOrURL
        else {
            const tryParse = youtubeUrlParser(videoIdOrURL)
            if (tryParse)
                this.VideoId = tryParse
        }

        //TODO set Title?
        //TODO read VideoId on page load
        window.history.pushState(null, "Title", "?v=" + this.VideoId);

        this.PlayerStatus = -1;
        this.SetCurrentTime(-1);

        getCaptionTracks(this.VideoId).then((captionTracks: CaptionTrack[]) => {
            this.CaptionTracks = captionTracks;
            let currentCaptionTrack = undefined

            console.log("captionTracks=", captionTracks)
            if (captionTracks === undefined || captionTracks.length === 0) {
                this.SetCurrentCaptionTrack(undefined)
                return
            }

            currentCaptionTrack = captionTracks[0]
            for (let i = 1; i < captionTracks.length; i++) {
                if (captionTracks[i].languageCode === "en"
                    && currentCaptionTrack.kind === "asr")
                    currentCaptionTrack = captionTracks[i];
            }
            this.SetCurrentCaptionTrack(currentCaptionTrack.baseUrl)
        });
    }

    SetCurrentCaptionTrack = (baseUrl: string | undefined) => {
        if (baseUrl === undefined) {
            this.SetTimedTextData(undefined)
            return
        }

        this.CurrentCaptionTrack = this.CaptionTracks.find(c => c.baseUrl === baseUrl)

        getTimedtext(baseUrl)
            .then(tt => this.SetTimedTextData(tt))
            .catch(() => { console.log("getTimedtext error") })
    }

    SetCurrentTime = (currentTimeMs: number) => {
        this.CurrentTimeMs = currentTimeMs;

        if (
            (this.СurrentCaptionTrackEventIndex === -1)
            || (this.StudyStep !== StudySteps.WithSubtitles)
        ) {
            let calcСurrentCaptionTrackEventIndex = this.findTimedTextDataEventIndex(currentTimeMs)
            this.SetСurrentCaptionTrackEventIndex(calcСurrentCaptionTrackEventIndex)
        }
        if (this.StudyStep === StudySteps.WithSubtitles)
            this.setPauseVideoTimer()
    }

    findTimedTextDataEventIndex = (currentTimeMs: number): number => {
        const t0 = performance.now();
        if (currentTimeMs === -1)
            return -1
        let result = this.TimedTextData.events.findIndex(e => currentTimeMs <= e.tStartMs) - 1
        console.log("findTimedTextDataEventIndex", result, `${performance.now() - t0} ms`)
        return result
    }

    SetСurrentCaptionTrackEventIndex = (currentCaptionTrackEventIndex: number) => {
        // https://www.youtube.com/watch?v=CZ3wIuvmHeM
        // хочу посмотреть https://www.youtube.com/watch?v=Eg3mi79INO8&feature=emb_logo
        if (this.СurrentCaptionTrackEventIndex !== currentCaptionTrackEventIndex) {
            let oldСurrent = document.getElementById("e" + this.СurrentCaptionTrackEventIndex)
            if (oldСurrent)
                oldСurrent.classList.remove("currentCue")

            let newСurrent = document.getElementById("e" + currentCaptionTrackEventIndex)
            if (newСurrent) {
                newСurrent.classList.add("currentCue")
                newСurrent.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
            }

            this.СurrentCaptionTrackEventIndex = currentCaptionTrackEventIndex
            console.log("СurrentCaptionTrackEventIndex=", currentCaptionTrackEventIndex)

            this.prepareCueForm()
        }
    }

    prepareCueForm = () => {
        if (this.StudyStep === StudySteps.WithSubtitles) {
            this.ShowCaptionTillEvent = this.СurrentCaptionTrackEventIndex
            setTimeout(() => {
                //after render
                let cueForm = document.getElementById("cue-form")
                if (cueForm) {
                    cueForm.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
                }
            }, 1);
        } else
            this.ShowCaptionTillEvent = -1
    }

    SetPlayer = (player: any) => {
        console.log("player", player)
        this.Player = player;
    }

    SetStudyStep = (studyStep: StudySteps) => {
        console.log("studyStep", studyStep)
        this.StudyStep = studyStep;

        this.prepareCueForm()
    }

    SetPlayerStatus = (playerStatus: PlayerStatuses) => {
        console.log("playerStatus", playerStatus);
        this.PlayerStatus = playerStatus;
        if (!this.Player.getVideoData)
            return;

        //update VideoData without extra rendering
        let newVideoData = this.Player.getVideoData();
        if (newVideoData) {
            if (this.VideoData.author !== newVideoData.author)
                this.VideoData.author = newVideoData.author;
            if (this.VideoData.title !== newVideoData.title)
                this.VideoData.title = newVideoData.title;
        }

        if (
            (playerStatus === PlayerStatuses.Playing)
            && (!this.playFromMyButtom)
            && (this.StudyStep === StudySteps.WithSubtitles)
        ) {
            let calcСurrentCaptionTrackEventIndex = this.findTimedTextDataEventIndex(this.CurrentTimeMs)
            this.SetСurrentCaptionTrackEventIndex(calcСurrentCaptionTrackEventIndex)
        }
    }

    PlayFullscreen = () => {
        if (this.Player && this.Player.loadVideoById)
            this.Player.playVideo()
        this.Player.getIframe().requestFullscreen()
    }

    PlayPrevCue = () => {
        this.SetСurrentCaptionTrackEventIndex(this.СurrentCaptionTrackEventIndex - 1)
        this.PlayCue()
    }
    PlayNextCue = () => {
        this.SetСurrentCaptionTrackEventIndex(this.СurrentCaptionTrackEventIndex + 1)
        this.PlayCue()
    }

    deltaMs = 100;
    timer: any = -1;
    setPauseVideoTimer = () => {
        let eCurrent = this.TimedTextData.events[this.СurrentCaptionTrackEventIndex];
        let eNext = this.TimedTextData.events[this.СurrentCaptionTrackEventIndex + 1];
        clearTimeout(this.timer)
        if (eCurrent) {
            let start2Start = eNext.tStartMs - eCurrent.tStartMs
            let timeForPauseMs = eCurrent.tStartMs
                + (eNext && eCurrent.dDurationMs > start2Start
                    ? start2Start
                    : eCurrent.dDurationMs)
                + this.deltaMs;

            console.log("setPauseVideoTimer",
                "eCurrent", Object.assign({}, eCurrent),
                "timeForPauseMs", timeForPauseMs,
                "eNext", Object.assign({}, eNext),
                "start2Start", start2Start,
                "pause after", timeForPauseMs - this.CurrentTimeMs
            )

            if (timeForPauseMs > this.CurrentTimeMs)
                this.timer = setTimeout(this.Pause, timeForPauseMs - this.CurrentTimeMs);
            else
                this.Pause()
        }
    }

    PlayCue = () => {
        if (this.СurrentCaptionTrackEventIndex < 0
            || this.СurrentCaptionTrackEventIndex >= this.TimedTextData.events.length)
            this.SetСurrentCaptionTrackEventIndex(0);
        if (this.TimedTextData.events.length === 0)
            console.log("Ошибка: Субтитры не скачаны");
        else {
            if (this.Player && this.Player.loadVideoById) {
                let e = this.TimedTextData.events[this.СurrentCaptionTrackEventIndex];
                this.SetCurrentTime(e.tStartMs - this.deltaMs);
                this.Player.seekTo((e.tStartMs - this.deltaMs) / 1000, true)
                this.playFromMyButtom = true;
                //do play, after the react do render, because render may take long time
                setTimeout(() => {
                    this.Player.playVideo();
                    this.setPauseVideoTimer();
                }, 1);
            }
        }
    }
    Pause = () => {
        if (this.Player && this.Player.pauseVideo) {
            console.log("pauseVideo", this.CurrentTimeMs)

            this.Player.pauseVideo();
            this.timer = -1;
            this.playFromMyButtom = false;
        }
    }
}

//https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
function youtubeUrlParser(url: string): string | undefined {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : undefined;
}

async function getCaptionTracks(video_id: string): Promise<CaptionTrack[]> {
    console.log("getTimedtextLink " + video_id)
    const url = env.be + '?u=' + btoa('https://www.youtube.com/get_video_info?eurl=http%3A%2F%2Flocalhost%3A3000%2F&hl=en_US&video_id=' + video_id)
    const resp = await fetch(url)

    if ((resp != null) && (resp.body != null)) {
        const json = qsToJson(await resp.text())

        if ((json != null)
            && (json.player_response != null)
            && (json.player_response.captions != null)
            && (json.player_response.captions.playerCaptionsTracklistRenderer != null)
            && (json.player_response.captions.playerCaptionsTracklistRenderer.captionTracks != null)) {
            return json.player_response.captions.playerCaptionsTracklistRenderer.captionTracks;
        } else {
            console.log("captionTracks not found json=", json)
        }
    }
    return [];
}

async function getTimedtext(baseUrl: string): Promise<TimedTextData | undefined> {
    const url = env.be + '?u=' + btoa(baseUrl + "&fmt=json3")
    const resp = await fetch(url)

    if ((resp != null) && (resp.body != null)) {
        const timedtext = await resp.json() as TimedTextData;
        console.log("Timedtext=", timedtext);

        timedtext.events = timedtext.events
            .filter(e => {
                return e.segs && e.segs.length > 0 &&
                    !(e.segs.length === 1 && e.segs[0].utf8 === "\n")
            })
            .sort((a, b) => a.tStartMs - b.tStartMs);
        return timedtext;
    }
    return undefined;
}

function qsToJson(qs: string): any {
    let res: any = {};
    let pars = qs.split('&');
    let kv, k, v;
    for (let i in pars) {
        kv = pars[i].split('=');
        k = kv[0];
        v = kv[1];
        res[k] = decodeURIComponent(v);
        if (k === "player_response") {
            res[k] = JSON.parse(res[k])
        }
    }
    return res;
}