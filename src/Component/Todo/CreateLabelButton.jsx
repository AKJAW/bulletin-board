import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Radium from 'radium';
import styles from './CreateLabelButton.css.js';

class CreateLabelButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleCreateLabelClick = this.handleCreateLabelClick.bind(this);
	}

	handleCreateLabelClick(){
		this.props.onClick();
	}

	render() {
		return(
			<button  style={styles.button} onClick={this.props.onClick}>{this.props.children}</button>
		)
	}
}

export default Radium(CreateLabelButton);