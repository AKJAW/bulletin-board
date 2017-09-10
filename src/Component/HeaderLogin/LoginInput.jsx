import React from 'react';
// import styles from './HeaderLogin.css.js';
// var FontAwesome = require('react-fontawesome');
// console.log(styles);
// console.log(styles.headerLogin');
import FontAwesome from 'react-fontawesome';

class LoginInput extends React.Component {
	render() {
		return (
			<label>
				<FontAwesome name={this.props.fontIcon}/> {this.props.text}
				<input type={this.props.inputType} onChange={this.props.onChange}/>
			</label>
		);
	}
}

export default LoginInput;