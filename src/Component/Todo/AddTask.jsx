import React from 'react';
import PropTypes from 'prop-types';
// import {Motion, spring,} from 'react-motion';
import Styled from 'styled-components';

const Container = Styled.div`
  display: inline-flex;
  flex-direction: row;
	width: 100%;
	text-align: center;
  justify-content: center;
`;

const InputText = Styled.span`
	margin-top:4px;
`;

const TaskInput = Styled.input`
	height: 19px;
	transition: box-shadow 0.3s, border 0.3s;
	border: ${({ border }) => (border)};
	padding: 3px;
	marginRight: 7px;
	marginLeft: 2px;
`;

const TaskButton = Styled.button`
		color: #82A2D7;
		border-style: solid;
		border-width: 2px;
		border-color: #82A2D7;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.3;
    background: rgba(0,0,0,0);
		background: rgb(255,255,255);
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
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnAddTaskClick = this.handleOnAddTaskClick.bind(this);
		this.handleOnCancelTaskClick = this.handleOnCancelTaskClick.bind(this);
		this.state = {
			taskName: '',
			inputBorder: 'solid 1px #dcdcdc',
		};
	}

	handleOnChange(e){
		this.setState({ taskName: e.target.value });
	}

	handleOnAddTaskClick(){
		const taskName = this.state.taskName;
		if (taskName === '' || taskName.length > 50){
			this.setState({ inputBorder: 'solid 3px #F55F5F' });
			return;
		}
		this.props.onAddTaskClick(taskName);
	}

	handleOnCancelTaskClick(){
		this.props.onCancelTaskClick();
	}

	render() {
		return (
			<Container>
				<InputText>Podaj treść:</InputText>
				<TaskInput border={this.state.inputBorder} onChange={this.handleOnChange} />
				<TaskButton onClick={this.handleOnAddTaskClick}>Dodaj</TaskButton>
				<TaskButton onClick={this.handleOnCancelTaskClick}>Anuluj</TaskButton>
			</Container>
		);
	}
}

AddTask.propTypes = {
	onCancelTaskClick: PropTypes.func.isRequired,
	onAddTaskClick: PropTypes.func.isRequired,
};

export default AddTask;
