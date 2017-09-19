import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './TasksColumn.css.js';
import Task from './Task.jsx';


class TasksColumn extends React.Component {
	render() {
		// debugger;
		// debugger;
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
								<div style={styles.wrapper}>
									<div ref={provided.innerRef} style={[styles.container, provided.draggableStyle]}>
										<div style={[styles.header, {backgroundColor: snapshot.isDraggingOver ? 'lightgreen' : 'grey',}]}>
											<div style={styles.title} {...provided.dragHandleProps} >
												{this.props.labelName}
											</div>
										</div>
										<div>
											<Task labelName={this.props.labelName} labelObject={this.props.labelObject}/>
										</div>
									</div>
									{provided.placeholder}
								</div>
									)}
						</Draggable>
						{/* {provided.placeholder} */}
					</div>
				)}
			// </Droppable>
		// )
	// }
}

export default Radium(TasksColumn);