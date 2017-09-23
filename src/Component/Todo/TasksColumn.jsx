import React from 'react';
import PropTypes from 'prop-types';
// import {Motion, spring,} from 'react-motion';
import Styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Color from 'color';
import FontAwesome from 'react-fontawesome';
// import styles from './TasksColumn.css.js';
import Task from './Task.jsx';


const Header = Styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ isDragging, normalColor, lightenedColor }) => (isDragging ? lightenedColor : normalColor)};
	transition: background-color 0.1s ease;
	color: ${({ isDark }) => (isDark ? 'white' : 'black')};
	width: 200px;
	font-weight: 500;
	font-size: 1.1rem;
	line-height: 1.7;
	font-family: 'Ubuntu', sans-serif;
	text-shadow: ${({ textShadow }) => (textShadow)};
	&:hover {
		background-color: ${({ lightenedColor }) => (lightenedColor)};
		cursor: -webkit-grab;
	};
`;


const Title = Styled.div`
	display: inline-flex;
	flex-direction: row;
	width: 100%;
	text-align: center;
	border-bottom: ${({ border }) => (border)};
	justify-content:space-between;
`;


const Wrapper = Styled.div`
		display: flex;
		flex-direction column;
`;

const Container = Styled.div`
	margin: 8px;
	display: flex;
	flex-direction: column;
`;


class TasksColumn extends React.Component {
	constructor(props) {
		super(props);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleOnDeleteRowClickColumn = this.handleOnDeleteRowClickColumn.bind(this);

		const color = Color(this.props.labelObject['color']);
		this.isDark = color.dark();
		if (this.isDark){
			this.normalColor = color.hsl().string();
			this.lightenedColor = color.lighten(0.3).hsl().string();
			this.textShadow = '1px 1px 1px rgba(0,0,0,1)';
			this.border = '1px solid white;';
		} else {
			this.normalColor = color.hsl().string();
			this.lightenedColor = color.darken(0.3).hsl().string();
			this.textShadow = 'none';
			this.border = '1px solid black;';
			// this.textShadow = '1px 1px 1px rgba(255,255,255,1)';
		}
		if (this.normalColor === this.lightenedColor){
			this.lightenedColor = 'hsl(0,0%,21%)';
		}
		// console.log(this.normalColor)
		// console.log(this.lightenedColor)
		this.state = {
			color,
		};
		// console.log(color.dark());
	}

	handleAddClick(){
		this.props.onAddClick(this.props.labelName);
	}

	handleDeleteClick(){
		this.props.onDeleteClick(this.props.labelName);
	}

	handleOnDeleteRowClickColumn(taskName){
		this.props.onDeleteRowClick(taskName, this.props.labelName);
	}

	render() {
		// console.log(Color('red').hsl().string())
		// console.log(Color('red').lighten(0.5).string())
		// debugger;
		// debugger;
		// console.log(this.props.labelObject)
		return (
			// <Droppable droppableId={`droppable-${this.props.labelName}`}>
			// 	{(provided, snapshot) => (
			<div style={{
				// background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
				// padding: 8,
				// width: 100,
				// marginRight:'20px',
				// paddingBottom:'20px',
			}}>
				<Draggable key={this.props.labelName} draggableId={this.props.labelName} type="COLUMN">
					{(provided, snapshot) => (
						<Wrapper>
							<Container
								innerRef={provided.innerRef}
								style={provided.draggableStyle}
							>
								<Header normalColor={this.normalColor} lightenedColor={this.lightenedColor} textShadow={this.textShadow} isDark={this.isDark} isDragging={snapshot.isDragging} >
									<Title border={this.border} {...provided.dragHandleProps} >
										<FontAwesome style={{cursor:'pointer', margin: '7px 0 0 4px'}} name='times-circle' onClick={this.handleDeleteClick}/>
										{this.props.labelName}
										<FontAwesome style={{cursor:'pointer', margin: '7px 4px 0 0'}} name='plus-circle' onClick={this.handleAddClick}/>
									</Title>
								</Header>
								<Task labelName={this.props.labelName} labelObject={this.props.labelObject} onDeleteRowClick={this.handleOnDeleteRowClickColumn} color={this.state.color}/>
							</Container>
							{provided.placeholder}
						</Wrapper>
					)}
				</Draggable>
				{/* {provided.placeholder} */}
			</div>
		)};
}

TasksColumn.propTypes = {
	labelName: PropTypes.string.isRequired,
	labelObject: PropTypes.object.isRequired,
	onAddClick: PropTypes.func.isRequired,
	onDeleteClick: PropTypes.func.isRequired,
	onDeleteRowClick: PropTypes.func.isRequired,
};

export default TasksColumn;