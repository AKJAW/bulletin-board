import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {DragDropContext} from 'react-beautiful-dnd';
import styles from './ItemsContext.css.js';
import LabelsDroppable from './LabelsDroppable.jsx';

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
		this.onDragEnd = this.onDragEnd.bind(this);
		this.state={
			items: this.props.items,
		}
		console.log(this.state.items);

	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(this.state.items, result.source.index, result.destination.index);

		this.setState({items});
		console.log(this.state.items);
	}


	render() {
		// debugger;
		const items = this.state.items
		// debugger;
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
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