import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import styles from './LabelDiv.css.js';

const reorder = (list, startIndex, endIndex) => {
	// debugger;
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

class LabelDiv extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateLabelClick = this.handleCreateLabelClick.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		// debugger;
		this.state={
			items: this.props.labelObject['tasks'],
		}
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(this.state.items, result.source.index, result.destination.index);

		this.setState({items});
		// console.log(this.state.items);
	}

	handleCreateLabelClick() {
		this.props.onClick();
	}

	render() {
		// debugger;
		const label = this.props.labelObject;
		// debugger;
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div ref={provided.innerRef} style={{
							background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
								padding: 8,
								width: 100
						}}>
							{label['tasks'].map((item, liIterator) => (
								<Draggable key={`item-${liIterator}`} draggableId={`item-${liIterator}`}>
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
												{item}
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
			</DragDropContext>
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

export default Radium(LabelDiv);