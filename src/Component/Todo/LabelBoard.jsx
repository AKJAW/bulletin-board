import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Styled, { injectGlobal } from 'styled-components';
import styles from './LabelBoard.css.js';
import TasksColumn from './TasksColumn.jsx';

const reorder = (list, startIndex, endIndex) => {
	// debugger;
	const eresult = Array.from(list);
	const [removed] = eresult.splice(startIndex, 1);
	eresult.splice(endIndex, 0, removed);

	return eresult;
};

const isDraggingClassName = 'is-dragging';


class LabelBoard extends React.Component {
	constructor(props) {
		super(props);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragStart = this.onDragStart.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.state={
			items: [].concat(this.props.items),
		}
		console.log(this.state.items);

	}

	componentDidMount() {
	    // eslint-disable-next-line no-unused-expressions
	    injectGlobal`
	      body.${isDraggingClassName} {
					cursor: move; /* fallback if grab cursor is unsupported */
			    cursor: grabbing;
			    cursor: -moz-grabbing;
			    cursor: -webkit-grabbing;
	        user-select: none;
	      }
	    `;
	  }

		handleAddClick(labelName){
			console.log(labelName);
		}

		handleDeleteClick(labelName){
			console.log(labelName);
		}

	onDragStart(initial){
		// document.body.style.userSelect= 'none';
		// debugger;
		document.body.classList.add(isDraggingClassName);
		// debugger;
	}

	onDragEnd(result) {
		 document.body.classList.remove(isDraggingClassName);
		// dropped outside the list
		// document.body.style.userSelect= 'auto';
		// document.body.style.cursor = 'auto';
		if (!result.destination) {
			return;
		}

		const source = result.source;
		const destination = result.destination;

		const sourceIDSplitted = result.source.droppableId.split('-');
		const destinatonIDSplitted = result.destination.droppableId.split('-');
		// debugger;




		let currentItems = [...this.state.items];
		const destinationLabel = destinatonIDSplitted[1];
		let destinationIndex;
		let sourceIndex;
		let newItems = []
		for(var i = 0; i < currentItems.length; i++) {
			newItems[i] = JSON.parse(JSON.stringify(currentItems[i]));
			const currentKey = Object.keys(currentItems[i])[0]
			if(currentKey === destinationLabel){
				destinationIndex = i;
			} else if(currentKey === sourceIDSplitted[1]){
				sourceIndex = i;
			}
		}
		// debugger;

		if (result.type === 'COLUMN') {
				newItems = reorder(newItems, source.index, destination.index);
		} else if (source.droppableId === destination.droppableId) {
			const tasks = reorder(newItems[destinationIndex][destinationLabel]['tasks'], result.source.index, result.destination.index);
			newItems[destinationIndex][destinationLabel]['tasks'] = tasks;
		} else if (sourceIndex !== undefined){
			const sourceLabel = sourceIDSplitted[1];
			const currentItem = newItems[sourceIndex][sourceLabel]['tasks'][result.source.index];
			newItems[sourceIndex][sourceLabel]['tasks'].splice(source.index, 1);
			newItems[destinationIndex][destinationLabel]['tasks'].splice(destination.index, 0, currentItem);
			// debugger;
		}

			// console.log(this.state.items);
			this.setState({items: [].concat(newItems)});
			// console.log(this.state.items);
	}


	render() {
		// debugger;
		const items = this.state.items
		// debugger;
		return (
			<DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
				<div>
					<Droppable
						droppableId="board"
						type="COLUMN"
						direction="horizontal"
					>
						{(provided) => (
							<div style={styles.container}
								ref={provided.innerRef}
							>
								{items.map(function(label) {
									// debugger;
									return(
										// <div>
										Object.keys(label).map(function(labelObject,iterator) {
												// debugger;
												// labelName={labelObject} labelObject={label[labelObject]}
											return(

													// <div key={labelObject}>
														<TasksColumn key={labelObject} labelName={labelObject} labelObject={label[labelObject]} onAddClick={this.handleAddClick} onDeleteClick={this.handleDeleteClick}/>
													// </div>
											)
										}.bind(this))

									)

								}.bind(this))}
							</div>
						)
						}</Droppable>

				</div>
			</DragDropContext>

		)
	}
}

export default Radium(LabelBoard);