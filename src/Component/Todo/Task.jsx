import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Color from 'color';
import Styled from 'styled-components';
import FontAwesome from 'react-fontawesome';


const Wrapper = Styled.div`
    background: ${({ isDragging }) => (isDragging ? 'lightblue' : 'lightgrey')};
		border:none;
`;

const Item = Styled.div`
		user-select: none;
		padding: 16px;
		margin: 0px 0px 8px 0px;
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

class Task extends React.Component {
	constructor(props){
		super(props);
		let color = this.props.color;
		this.isDark = color.dark();
		console.log(color.hsl());
		if(this.isDark){
			console.log(color);
      this.normalColor = color.hsl().string();
      this.lightenedColor = color.lighten(0.3).hsl().string();
      this.textShadow = '1px 1px 1px rgba(0,0,0,1)';
    } else {
			console.log(color);
      this.normalColor = color.hsl().string();
      this.lightenedColor = color.darken(0.3).hsl().string();
      this.textShadow = 'none';
      // this.textShadow = '1px 1px 1px rgba(255,255,255,1)';
    }
    if(this.normalColor === this.lightenedColor){
      this.lightenedColor = "hsl(0,0%,21%)"
    }
    // console.log(this.normalColor)
    // console.log(this.lightenedColor)
		// debugger
	}

	render() {
		// debugger;
		// debugger;
		// console.log(this.props.labelObject['color'])
		return (
			<Droppable droppableId={`droppable-${this.props.labelName}`}>
				{(provided, snapshot) => (
					<Wrapper isDragging={snapshot.isDraggingOver} innerRef={provided.innerRef} >
						{this.props.labelObject['tasks'].map(function(item, liIterator) {
							const key = Object.keys(item)[0];
							return(
								<Draggable key={`item-${this.props.labelName}-${liIterator}`} draggableId={`item-${this.props.labelName}-${liIterator}`}>
									{(provided, snapshot) => (
										<div>
											<Item normalColor={this.normalColor} lightenedColor={this.lightenedColor} textShadow={this.textShadow}  isDark={this.isDark} isDragging={snapshot.isDraggingOver} innerRef={provided.innerRef} style={provided.draggableStyle}
												{...provided.dragHandleProps}>
												<FontAwesome name={item[key]}/> {key}
											</Item>
											{provided.placeholder}
										</div>
									)}
								</Draggable>
							)
						}.bind(this))}
						{provided.placeholder}
					</Wrapper>
				)}
			</Droppable>
		)
}
}

export default Radium(Task);