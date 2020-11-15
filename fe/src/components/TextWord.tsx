import * as React from "react";

interface IProps {
    word: string
}

interface IState {
    highlight: boolean
}

export default class TextWord extends React.PureComponent<IProps, IState>
{
    constructor(props: IProps) {
        super(props);

        this.state = {
            highlight: false
        };
    }

    render() {
        let className = 'word' + (this.state.highlight ? ' highlight' : '');
        return <span className={className}
            onMouseOver={() => { this.setState({ highlight: true }) }}
            onMouseOut={() => { this.setState({ highlight: false }) }}
        >
            {this.props.word}
        </span>;
    }
}
