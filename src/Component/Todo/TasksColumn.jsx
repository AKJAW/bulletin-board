import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import Styled from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Color from 'color';
import styles from './TasksColumn.css.js';
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
  &:hover {
    background-color: ${({ lightenedColor }) => (lightenedColor)};
		cursor: -webkit-grab;
  };
`;


const Title = Styled.div`
	width: 100%;
	text-align: center;
`;


class TasksColumn extends React.Component {
  constructor(props) {
    super(props);
    this.color = Color(this.props.labelObject['color']);
    this.lightenedColor = this.color.lighten(0.5).string();
    this.normalColor = this.color.string();
    this.isDark = this.color.dark();
    // console.log(color.dark())
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
								<div style={styles.wrapper}>
									<div ref={provided.innerRef} style={[styles.container, provided.draggableStyle]}>
										<Header normalColor={this.normalColor} lightenedColor={this.lightenedColor} isDark={this.isDark} isDragging={snapshot.isDragging} >
											<Title  {...provided.dragHandleProps} >
												{this.props.labelName}
											</Title>
										</Header>
                    <Task labelName={this.props.labelName} labelObject={this.props.labelObject}/>
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