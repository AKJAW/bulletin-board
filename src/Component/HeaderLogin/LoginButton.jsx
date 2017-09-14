import React from 'react';
import Radium from 'radium';

import styles from './LoginButton.css.js';
// import styles from './HeaderLogin.css.js';
// var FontAwesome = require('react-fontawesome');
// console.log(styles);
// console.log(styles.headerLogin');
// import FontAwesome from 'react-fontawesome';

class LoginInput extends React.Component {
	render() {
		return (
			<button disabled={this.props.isDisabled} style={[this.props.isDisabled ? styles.buttonDisabled : {}, styles.button]} onClick={this.props.onClick}>{this.props.text}</button>
		);
	}
}

export default Radium(LoginInput);