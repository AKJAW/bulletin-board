import React from 'react';
import PropTypes from 'prop-types';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import Styled from 'styled-components';
import { CustomSliderPicker } from 'react-color';
// import styles from './CreateLabelMenu.css.js';

const Input = Styled.input`
	margin: 10px 0px 10px 0px;
	height: 19px;
	transition: box-shadow 0.3s, border 0.3s;
	border: solid 1px ${({ borderColor }) => (borderColor)};
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

const ErrorMessage = Styled.div`
	color: red;
	margin: 13px 3px 6px 3px;
`;

class CreateLabelMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateLabelClick = this.handleCreateLabelClick.bind(this);
		this.handleLabelNameChange = this.handleLabelNameChange.bind(this);
		this.handleChangeComplete = this.handleChangeComplete.bind(this);
		this.handleColorChoosing = this.handleColorChoosing.bind(this);
		this.checkIfNameExists = this.checkIfNameExists.bind(this);
		this.items = this.props.items;
		this.state = {
			labelName: '',
			color: '#ffffff',
			isAdding: false,
			borderColor: '#dcdcdc',
			errorMessage: '',
		};
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.items !== this.props.items){
			this.items = this.props.items;
			// this.setState({items: [].concat(nextProps.items)});
		}
	}

	checkIfNameExists(labelName){
		const currentItems = [...this.props.items];
		for (let i = 0; i < currentItems.length; i++) {
			const currentKey = Object.keys(currentItems[i])[0]
			if (currentKey === labelName){
				return true;
				// newItems[i][labelName]['tasks'].push({ [this.state.taskName]: iconName })
			}
		}
		return false;
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
		const isNameExists = this.checkIfNameExists(labelName)
		// if (labelName !== '' && labelName.length <= 15 && !isNameExists){
		// 	// debugger;
		// 	this.setState({ isAdding: true });
		// }
		if (labelName === ''){
			this.setState({ errorMessage: 'Nazwa za krótka', borderColor: 'red' });
		} else if (labelName.length >= 15){
			this.setState({ errorMessage: 'Nazwa jest za długa', borderColor: 'red' });
		} else if (isNameExists){
			this.setState({ errorMessage: 'Nazwa już istnieje', borderColor: 'red' });
		} else {
			this.setState({ isAdding: true });
		}
	}

	handleChangeComplete(color){
		this.setState({ color: color.hex });
	}

	render() {
		return(
			<Container>
				{this.state.isAdding || <div style={{display:'flex', flexWrap: 'wrap'}}><Input borderColor={this.state.borderColor} onChange={this.handleLabelNameChange}/>
					<ErrorMessage>{ this.state.errorMessage }</ErrorMessage></div>}
				{this.state.isAdding || <Button onClick={this.handleColorChoosing}>Wybierz kolor</Button>}
				{this.state.isAdding && <Picker><CustomSliderPicker color={this.state.color } onChangeComplete ={ this.handleChangeComplete } /></Picker>}
				{this.state.isAdding && <div>Obecny kolor: { this.state.color }<CurrentColor color={ this.state.color }/></div>}
				{this.state.isAdding && <Button onClick={this.handleCreateLabelClick}>Dodaj etykietę</Button>}
			</Container>
		)
	}
}

CreateLabelMenu.propTypes = {
	items:PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
	onAddLabel:React.PropTypes.func.isRequired,
};

export default Radium(CreateLabelMenu);