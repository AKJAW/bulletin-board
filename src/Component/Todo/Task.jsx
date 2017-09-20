import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import FontAwesome from 'react-fontawesome';
import styles from './Task.css.js';


class Task extends React.Component {
	render() {
		// debugger;
		// debugger;
		// console.log(this.props.labelObject['color'])
		return (
			<Droppable droppableId={`droppable-${this.props.labelName}`}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} style={{
						background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
						padding: 8,
					}}>
						{this.props.labelObject['tasks'].map(function(item, liIterator) {
							const key = Object.keys(item)[0];
							return(
								<Draggable key={`item-${this.props.labelName}-${liIterator}`} draggableId={`item-${this.props.labelName}-${liIterator}`}>
									{(provided, snapshot) => (
										<div>
											<div ref={provided.innerRef} style={
												[provided.draggableStyle,
												{
													// some basic styles to make the items look a bit nicer
													userSelect: 'none',
													padding: 8 * 2,
													margin: `0 0 ${8}px 0`,

													// change background colour if dragging
													background: snapshot.isDragging ? 'lightgreen' : 'grey',
												}]}
												{...provided.dragHandleProps}>
												<FontAwesome name={item[key]}/> {key}
											</div>
											{provided.placeholder}
										</div>
									)}
								</Draggable>
							)
						}.bind(this))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		)
}
}

export default Radium(Task);