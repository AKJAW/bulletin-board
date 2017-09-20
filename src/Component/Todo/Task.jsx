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
		min-height: 25px;
		max-width:200px;
		word-wrap: break-word;
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
							if(key !== 'isInvisibleNiewidka'){
								return(
									<Draggable key={`item-${this.props.labelName}-${liIterator}`} draggableId={`item-${this.props.labelName}-${liIterator}`}>
										{(provided, snapshot) => (
											<div>
												<Item normalColor={this.normalColor} lightenedColor={this.lightenedColor} textShadow={this.textShadow}  isDark={this.isDark} isDragging={snapshot.isDraggingOver} innerRef={provided.innerRef} style={provided.draggableStyle}
													{...provided.dragHandleProps}>
													<div style={{display: 'inline-flex', flexDirection: 'row', justifyContent:'space-between', minWidth: '180px'}}>
														<FontAwesome style={{width: '25px'}} name={item[key]}/>
														<div style={{wordBreak: 'break-all', margin:'0 5px 0 5px'}}>{key}</div>
														<FontAwesome name='times'/>
													</div>
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

export default Radium(Task);