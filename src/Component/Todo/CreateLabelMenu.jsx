import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import styles from './CreateLabelMenu.css.js';

class CreateLabelMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateLabelClick = this.handleCreateLabelClick.bind(this);
	}

	handleCreateLabelClick(){
		this.props.onClick();
	}

	render() {
		return(
			<div>
				<input style={styles.input} onChange={this.props.onChange} value={this.props.labelName}/>
				<button style={styles.button} onClick={this.props.onAddLabel}>Dodaj etykiete</button>
			</div>
		)
	}
}

export default Radium(CreateLabelMenu);