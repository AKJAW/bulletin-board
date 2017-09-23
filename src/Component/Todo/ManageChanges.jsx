import React from 'react';
import PropTypes from 'prop-types';
// import {Motion, spring,} from 'react-motion';
import Styled from 'styled-components';

const Container = Styled.div`
  display: inline;
`;

const ChangesButton = Styled.button`
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

class AddTask extends React.Component {
	constructor(props) {
		super(props);
	  this.handleYesApplyChanges = this.handleYesApplyChanges.bind(this);
		this.handleNoCancelChanges = this.handleNoCancelChanges.bind(this);
		this.state = {
			taskName: '',
			inputBorder: 'solid 1px #dcdcdc',
		}
	}

	handleYesApplyChanges(){
		this.props.onYesApplyChanges();
	}

	handleNoCancelChanges(){
		this.props.onNoCancelChanges();
	}

	render() {
		return (
			<Container>
        <ChangesButton onClick={this.props.onApplyChanges}>Zapisz zmiany</ChangesButton>
        <ChangesButton onClick={this.handleNoCancelChanges}>Odrzuć zmiany</ChangesButton>
			</Container>
		);
	}
}

AddTask.propTypes = {
	onNoCancelChanges: PropTypes.func.isRequired,
	onApplyChanges: PropTypes.func.isRequired,
};

export default AddTask;
