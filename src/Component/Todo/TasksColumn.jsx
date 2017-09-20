import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import Styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import Color from 'color';
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
	width: 100%;
	text-align: center;
  border: 1px solid black;
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
    const color = Color(this.props.labelObject['color']);
    this.isDark = color.dark();
    if(this.isDark){
      this.normalColor = color.hsl().string();
      this.lightenedColor = color.lighten(0.3).hsl().string();
      this.textShadow = '1px 1px 1px rgba(0,0,0,1)';
    } else {
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
    this.state={
      color
    };
    console.log(color.dark())
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
											<Title  {...provided.dragHandleProps} >
												{this.props.labelName}
											</Title>
										</Header>
                    <Task labelName={this.props.labelName} labelObject={this.props.labelObject} color={this.state.color}/>
									</Container>
									{provided.placeholder}
								</Wrapper>
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