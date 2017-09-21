import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Styled from 'styled-components';


const Button = Styled.button`
		color: #82A2D7;
		border-style: solid;
		border-width: 2px;
		border-color: #82A2D7;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.3;
    width: 150px;
    background: rgba(0,0,0,0);
		background: rgb(255,255,255);
		margin: 4px;
		&:hover {
			border-color: #4D6EA4;
			color: #4D6EA4;
		};
    &:active {
			border-color: #27496d;
			color: #27496d;
		};
`;

class CreateLabelButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateLabelClick = this.handleCreateLabelClick.bind(this);
	}

	handleCreateLabelClick(){
		this.props.onClick();
	}

	render() {
		return(
			<Button onClick={this.props.onClick}>{this.props.children}</Button>
		)
	}
}

export default CreateLabelButton;