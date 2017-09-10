import React from 'react';
// import styles from './HeaderLogin.css.js';
// var FontAwesome = require('react-fontawesome');
// console.log(styles);
// console.log(styles.headerLogin');
import FontAwesome from 'react-fontawesome';

class LoginInput extends React.Component {
	render() {
		return (
			<button onClick={this.props.onClick}>{this.props.text}</button>
		);
	}
}

export default LoginInput;