import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import TasksColumn from './TasksColumn.jsx';


class LabelBoard extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		// debugger;
		// debugger;
		return (
				<div>
					<Droppable
						droppableId="board"
						type="COLUMN"
						direction="horizontal"
					>
						{(provided, snapshot) => (
							<div style={{
								// minHeight: '100vh',
								/* like display:flex but will allow bleeding over the window width */
								// minWidth: '100vw',
							display: 'inline-flex',}}
								ref={provided.innerRef}>
								<TasksColumn labelName={this.props.labelName} labelObject={this.props.labelObject}/>
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

export default Radium(LabelBoard);