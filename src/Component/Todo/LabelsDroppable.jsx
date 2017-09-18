import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './ItemsContext.css.js';


class LabelsDroppable extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		// debugger;
		// debugger;
		return (
				<div>{this.props.labelName}
					<Droppable droppableId={`droppable-${this.props.labelName}`}>
						{(provided, snapshot) => (
							<div ref={provided.innerRef} style={{
								background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
								padding: 8,
								width: 100
							}}>
								{this.props.labelObject['tasks'].map((item, liIterator) => (
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
													{Object.keys(item)[0]}
												</div>
												{provided.placeholder}
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
		// <div style={{
		// 	backgroundColor: label['color']
		// }}>
		// 	{this.props.labelName}
		// 	{label['tasks'].map((task, liIterator) => {
		// 		return (
		// 			<li key={liIterator}>{task}</li>
		// 		)
		// 	})
		// 	}
		// </div>
		)
	}
}

export default Radium(LabelsDroppable);