import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import Styled from 'styled-components';
import { CustomSliderPicker } from 'react-color';
// import styles from './CreateLabelMenu.css.js';

const Input = Styled.input`
	margin-top: 10px;
	height: 19px;
	transition: box-shadow 0.3s, border 0.3s;
	border: solid 1px #dcdcdc;
	padding: 3px;
	width: 150px;
`;

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

const Picker = Styled.div`
	width: 30%;
	margin: 5px 0 5px 5px;
`;

const Container = Styled.div`
	display:flex;
	flex-direction: column;
	flex-wrap: wrap;
`;

const CurrentColor = Styled.div`
	border: 1px solid black;
	background-color: ${({ color }) => (color || 'white')};
	height:50px;
	width:50px;
	margin: 0 5px 5px 5px;
`;

class CreateLabelMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateLabelClick = this.handleCreateLabelClick.bind(this);
		this.handleLabelNameChange = this.handleLabelNameChange.bind(this);
		this.handleChangeComplete = this.handleChangeComplete.bind(this);
		this.handleColorChoosing = this.handleColorChoosing.bind(this);

		this.state = {
			labelName: '',
			color: '#ffffff',
			isAdding: false,
		}
	}

	handleLabelNameChange(e){
			this.setState({ labelName: e.target.value });
	}

	handleCreateLabelClick(){
		this.props.onAddLabel(this.state.labelName, this.state.color)
	}

	handleColorChoosing(){
		const labelName = this.state.labelName;
		// debugger;
		if(labelName !== '' && labelName.length <= 15){
			// debugger;
			this.setState({ isAdding: true });
		}
	}

	handleChangeComplete(color){
		this.setState({ color: color.hex });
	}

	render() {
		return(
			<Container>
				{this.state.isAdding || <Input onChange={this.handleLabelNameChange}/>}
				{this.state.isAdding || <Button onClick={this.handleColorChoosing}>Wybierz kolor</Button>}
				{this.state.isAdding && <Picker><CustomSliderPicker color={this.state.color } onChangeComplete ={ this.handleChangeComplete } /></Picker>}
				{this.state.isAdding && <div>Obecny kolor: { this.state.color }<CurrentColor color={ this.state.color }/></div>}
				{this.state.isAdding && <Button onClick={this.handleCreateLabelClick}>Dodaj etykietę</Button>}
			</Container>
		)
	}
}

export default Radium(CreateLabelMenu);