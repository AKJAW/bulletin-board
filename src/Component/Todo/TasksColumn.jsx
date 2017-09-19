import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import styled from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './TasksColumn.css.js';
import Task from './Task.jsx';


const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isDragging }) => (isDragging ? 'rgb(84, 84, 235)' : 'rgb(24, 24, 191)')};
  transition: background-color 0.1s ease;
  &:hover {
    background-color: rgb(84, 84, 235);
		cursor: -webkit-grab;
  };
	${'' /* &:active {
		cursor: -webkit-grabbing;
	}; */}
`;


const Title = styled.div`
	width: 100%;
	text-align: center;
`;


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
										<Header isDragging={snapshot.isDragging}>
											<Title  {...provided.dragHandleProps} >
												{this.props.labelName}
											</Title>
										</Header>
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