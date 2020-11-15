import React from "react";
import TextWord from './TextWord'
import { Event, splitWord } from '../helper'

interface IEventViewProps {
    e: Event;
    id: string;
}

export default class EventView extends React.PureComponent<IEventViewProps> {
    render() {
        if (this.props.e && this.props.e.segs)
            return <span id={this.props.id}>
                {' '}
                {this.props.e.segs.map((seg, sIndex) => {
                    return splitWord(seg.utf8).map((word, wIndex) => {
                        return <TextWord word={word} key={this.props.id + 's' + sIndex + 'w' + wIndex} />
                    })
                })}
            </span>;
        else
            return <></>;
    }
}