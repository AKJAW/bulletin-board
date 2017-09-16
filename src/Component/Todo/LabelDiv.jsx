import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import styles from './LabelDiv.css.js';

class LabelDiv extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateLabelClick = this.handleCreateLabelClick.bind(this);
	}

	handleCreateLabelClick(){
		this.props.onClick();
	}

	render() {
		// debugger;
		const label = this.props.labelObject;
		// debugger;
		return(
			<div style={{backgroundColor: label['color']}}>{this.props.labelName}
				{
					label['tasks'].map((task, liIterator) => {
						return(<li key={liIterator}>{task}</li>)
					})
				}
			</div>
		)
	}
}

export default Radium(LabelDiv);