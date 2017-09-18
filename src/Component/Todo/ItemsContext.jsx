import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {DragDropContext} from 'react-beautiful-dnd';
import styles from './ItemsContext.css.js';
import LabelsDroppable from './LabelsDroppable.jsx';

const reorder = (list, startIndex, endIndex) => {
	// debugger;
	const eresult = Array.from(list);
	const [removed] = eresult.splice(startIndex, 1);
	eresult.splice(endIndex, 0, removed);

	return eresult;
};


class LabelDiv extends React.Component {
	constructor(props) {
		super(props);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.state={
			items: [].concat(this.props.items),
		}
		console.log(this.state.items);

	}

	onDragEnd(result) {
		// dropped outside the list
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
		debugger;

		if (source.droppableId === destination.droppableId) {
			const tasks = reorder(newItems[destinationIndex][destinationLabel]['tasks'], result.source.index, result.destination.index);
			newItems[destinationIndex][destinationLabel]['tasks'] = tasks;
		} else if (sourceIndex !== undefined){
			const sourceLabel = sourceIDSplitted[1];
			const currentItem = newItems[sourceIndex][sourceLabel]['tasks'][result.source.index];
			newItems[sourceIndex][sourceLabel]['tasks'].splice(source.index, 1);
			newItems[destinationIndex][destinationLabel]['tasks'].splice(destination.index, 0, currentItem);
			debugger;

			}

			console.log(this.state.items);
			this.setState({items: [].concat(newItems)});
			console.log(this.state.items);
	}


	render() {
		// debugger;
		const items = this.state.items
		// debugger;
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<div style={{
					display: 'flex',
					flexDirection: 'row',
				}}>
					{items.map((label) => {
						return(
							Object.keys(label).map(function(labelObject,iterator) {
								// debugger;

								return(
									// <ItemsContext />
										<LabelsDroppable labelName={labelObject} labelObject={label[labelObject]}/>
								)
								// return(
								// 	<div key={labelObject}>{labelObject}
								// 		{
								// 			label[labelObject]['tasks'].map((task, liIterator) =>{
								// 				return(<li key={liIterator}>{task}</li>)
								// 			})
								// 		}
								// 	</div>
								// )


								// console.log(task);
								// console.log(label[task]);
								// debugger;
								// use task to get current key's name
								// and label[task] to get its value
							})
						)
						// debugger;
						// return <NotificationDiv type={i.type} key={iterator}>{i.message}</NotificationDiv>;
					})
					}
				</div>
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