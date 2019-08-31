import React from 'react';
import PropTypes from 'prop-types';
// import {Motion, spring,} from 'react-motion';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import Color from 'color';
import Styled from 'styled-components';
import FontAwesome from 'react-fontawesome';


const Wrapper = Styled.div`
		background: ${({ isDragging }) => (isDragging ? 'lightblue' : 'lightgrey')};
		border:none;
		min-height: 25px;
		max-width:200px;
		word-wrap: break-word;
		&:hover {
			background-color: ${({ lightenedColor }) => (lightenedColor)};
			cursor: -webkit-grab;
		};
`;

const Item = Styled.div`
		user-select: none;
		padding: 16px 8px 16px 8px;
		background-color: ${({ isDragging, normalColor, lightenedColor }) => (isDragging ? lightenedColor : normalColor)};
		transition: background-color 0.1s ease;
		color: ${({ isDark }) => (isDark ? 'white' : 'black')};
		font-family: 'Ubuntu', sans-serif;
		text-shadow: ${({ textShadow }) => (textShadow)};
		&:hover {
			background-color: ${({ lightenedColor }) => (lightenedColor)};
			cursor: -webkit-grab;
		};
`;

const TaskRow = Styled.div`
	display: inline-flex;
	flex-direction: row;
	justify-content:space-between;
	min-width: 180px;
`;

const TaskRowText = Styled.div`
	word-break: break-all;
	margin: 0 5px 0 5px;
`;

const DeleteRowIcon = Styled.div`
	cursor: pointer;
`;


class Task extends React.Component {
	constructor(props){
		super(props);
		// this.handleOnDeleteRowClickTask = this.handleOnDeleteRowClickTask.bind(this);
		const color = this.props.color;
		this.isDark = color.dark();
		// console.log(color.hsl());
		if (this.isDark){
			// console.log(color);
			this.normalColor = color.hsl().string();
			this.lightenedColor = color.lighten(0.3).hsl().string();
			this.textShadow = '1px 1px 1px rgba(0,0,0,1)';
		} else {
			// console.log(color);
			this.normalColor = color.hsl().string();
			this.lightenedColor = color.darken(0.3).hsl().string();
			this.textShadow = 'none';
			// this.textShadow = '1px 1px 1px rgba(255,255,255,1)';
		}
		if (this.normalColor === this.lightenedColor){
			this.lightenedColor = 'hsl(0,0%,21%)';
		}
		// console.log(this.normalColor)
		// console.log(this.lightenedColor)
		// debugger
	}
	//
	// handleOnDeleteRowClickTask(){
	//
	// }

	render() {
		// debugger;
		// debugger;
		// console.log(this.props.labelObject['color'])
		return (
			<Droppable droppableId={`droppable-${this.props.labelName}`}>
				{(provided, snapshot) => (
					<Wrapper isDragging={snapshot.isDraggingOver} innerRef={provided.innerRef} >
						{this.props.labelObject['tasks'] && this.props.labelObject['tasks'].map(function(item, liIterator) {
							const key = Object.keys(item)[0];
							if(key !== 'isInvisibleNiewidka'){
								return(
									<Draggable key={`item-${this.props.labelName}-${liIterator}`} draggableId={`item-${this.props.labelName}-${liIterator}`}>
										{(provided, snapshot) => (
											<div>
												<Item normalColor={this.normalColor} lightenedColor={this.lightenedColor} textShadow={this.textShadow}  isDark={this.isDark} isDragging={snapshot.isDraggingOver} innerRef={provided.innerRef} style={provided.draggableStyle}
													{...provided.dragHandleProps}>
													<TaskRow>
														<FontAwesome style={{width: '25px'}} name={item[key]}/>
														<TaskRowText >{key}</TaskRowText>
														<DeleteRowIcon onClick={() => (this.props.onDeleteRowClick(key))}><FontAwesome name='times'/></DeleteRowIcon>
													</TaskRow>
												</Item>
												{provided.placeholder}
											</div>
										)}
									</Draggable>
								)
							} else {
								return null;
							}
						}.bind(this))}
						{provided.placeholder}
					</Wrapper>
				)}
			</Droppable>
		)
}
}

Task.propTypes = {
	labelName: PropTypes.string.isRequired,
	labelObject: PropTypes.object.isRequired,
	onDeleteRowClick: PropTypes.func.isRequired,
	color: PropTypes.object.isRequired,
};

export default Task;
