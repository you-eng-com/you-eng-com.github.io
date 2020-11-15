import { parseSync, NodeCue } from "subtitle"

function removeTags(s: string) {
    return s.replace(/(<([^>]+)>)/gi, "");
}

function splitLine(s: string) {
    return s.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
}

export function splitWord(s: string) {  //TODO do private?
    //return s.split(/(\s+)/).filter(e => e.trim().length > 0)
    //return s.split(/(\s|\?|\.)+/).filter(e => e.length > 0)
    //return s.split(/([\W\d^\']+|[^\W\d\']+)/).filter(e => e.length > 0)
    //return s.split(/([\W\d]+|[^\W\d]+(?:'[st])/).filter(e => e.length > 0)
    //return s.split(/([\W\d]+|[^\W\d]+(?:'[st]|[(?:re)(?:ve)])?)/).filter(e => e.length > 0)
    return s.split(/([\W\d]+|[^\W\d]+(?:'[t]))/).filter(e => e.length > 0)
}

export declare type Line = string[];

export interface Frame {
    start: number;
    end: number;
    text: Line[];
}

export declare type Frames = Frame[];

export function Srt2Frames(srt: string) {
    let result: Frames = [];
    parseSync(srt).forEach(node => {
        if (node.type === "cue") {
            const cueData = (node as NodeCue).data;

            let f: Frame = {
                start: cueData.start,
                end: cueData.end,
                text: [],
            }

            splitLine(removeTags(cueData.text)).forEach(line => {
                f.text.push(splitWord(line))
            });

            result.push(f);
        }
    });
    return result
}

export interface Seg {
    tOffsetMs: number,
    acAsrConf: number,
    utf8: string,
    //...
}

export interface Event {
    tStartMs: number,
    dDurationMs: number,
    segs: Seg[];
    //...
}

export function Event2String(e?: Event): string {
    if (!e)
        return '';
    return e.segs.map(seg => seg.utf8).join(" ")
}

export function сompare(s1?: String, s2?: String): boolean {
    return ((!s1 && !s2)
        || ((s1 !== undefined && s2 !== undefined)
            && (s1.replace(/ +/g, " ").trim().toLowerCase() === s2.replace(/ +/g, " ").trim().toLowerCase())))
}
