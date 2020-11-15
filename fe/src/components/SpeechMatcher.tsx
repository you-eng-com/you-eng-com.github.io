import React from "react";
import { Button } from '@material-ui/core';
import Mic from '@material-ui/icons/Mic';
import { PlayerStatuses } from './YouTubePlayerStore';
import { сompare } from '../helper'

interface IState {
    text: string;
    finalText: string;
    interimText: string;
    recognizing: boolean;
}

interface IProps {
    text: string;
    playerStatus: PlayerStatuses;
    onNext?: Function;
    onShow?: Function;
    onRepeat?: Function;
    onResult?: Function;
}

let SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let SpeechGrammarList = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;

let recognition = new SpeechRecognition();
let recognizing = false;
let isSendStart = false;

export default class SpeechMatcher extends React.Component<IProps, IState> {
    state: IState = {
        text: '',
        finalText: '',
        interimText: '',
        recognizing: false,
    }

    constructor(p: IProps) {
        super(p)

        recognition.lang = 'en-US'; // TODO to settings
        recognition.maxAlternatives = 1;
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = this.onstart;
        recognition.onresult = this.onresult;
        recognition.onerror = this.onerror;
        recognition.onend = this.onend;

        recognition.onaudiostart = () => console.log("SpeechMatcher onaudiostart")
        recognition.onaudioend = () => console.log("SpeechMatcher onaudioend")
        recognition.onnomatch = () => console.log("SpeechMatcher onnomatch")
        recognition.onsoundstart = () => console.log("SpeechMatcher onsoundstart")
        recognition.onsoundend = () => console.log("SpeechMatcher onsoundend")
        recognition.onspeechstart = () => console.log("SpeechMatcher onspeechstart")
        recognition.onspeechend = () => console.log("SpeechMatcher onspeechend")
    }

    componentWillUnmount = () => {
        recognition.abort()
    }

    static getDerivedStateFromProps(props: IProps, state: IState) {
        if (state.text !== props.text) {
            console.log("SpeechMatcher recognition.abort();")
            recognition.abort();

            var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + props.text + ';';
            var speechRecognitionList = new SpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;

            return {
                text: props.text,
                finalText: "",
                interimText: "",
                ItsStartOnPause: false,
            }
        }
        if ((props.playerStatus === PlayerStatuses.Paused)
            && (!recognizing && !isSendStart)) {
            try {
                console.log("SpeechMatcher recognition.start();")
                recognition.start();
            } catch (error) {
                console.error("SpeechMatcher", error)
            }
            isSendStart = true;

        }
        return null;
    }

    onstart = () => {
        console.log("SpeechMatcher onstart")
        recognizing = true;
        isSendStart = false;
        this.setState({
            recognizing: true,
        })
    }
    onerror = (event: any) => {
        console.log("SpeechMatcher onerror", event)
        // recognizing = false;   if call "run" in this moment - then get error "recorder alrady start"
        // isSendStart = false;
        this.setState({
            recognizing: false,
        })
    }
    onend = () => {
        console.log("SpeechMatcher onend")
        recognizing = false;
        isSendStart = false;
        this.setState({
            recognizing: false,
        })
    }

    onresult = (event: any) => {
        console.log("SpeechMatcher ", event.results)

        let finalText = '';
        let interimText = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalText += event.results[i][0].transcript;
            } else {
                interimText += event.results[i][0].transcript;
            }
        }

        let clearText = false;

        switch (interimText.trim().toLowerCase()) {
            case 'next':
                if (this.props.onNext) {
                    clearText = true;
                    this.props.onNext();
                }
                break;
            case 'show':
                if (this.props.onShow) {
                    clearText = true;
                    this.props.onShow();
                }
                break;
            case 'repeat':
                if (this.props.onRepeat) {
                    clearText = true;
                    this.props.onRepeat();
                }
                break;
            default:
        }

        if (finalText !== '' && this.props.onResult) {
            this.props.onResult();
        }

        if (сompare(interimText, this.state.text)
            || сompare(finalText, this.state.text))
            this.props.onNext && this.props.onNext();
        else {
            console.debug("SpeechMatcher check", finalText, interimText, this.state.text)
        }

        let state = clearText
            ? {
                finalText: '',
                interimText: '',
            }
            : {
                finalText,
                interimText,
            }

        this.setState(state)
    }

    render() {
        return <>
            <Button>
                <Mic color={this.state.recognizing ? "secondary" : "primary"} />
            </Button>
            <span> {this.state.finalText} </span>
            <span style={{ color: "grey" }}> {this.state.interimText} </span>
        </>;
    }
}