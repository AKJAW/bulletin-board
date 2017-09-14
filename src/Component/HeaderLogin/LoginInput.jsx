import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';
import styles from './LoginInput.css.js';
// var FontAwesome = require('react-fontawesome');
// console.log(styles);
// console.log(styles.headerLogin');

class LoginInput extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	console.log(this.props.isDisabled ? 'cursor: not-allowed;' : 'cursor: default;')
	// }
	render() {
		return (
			<label style={styles.i}>
				<FontAwesome name={this.props.fontIcon}/> {this.props.text}
				<input disabled={this.props.isDisabled} style={[this.props.isDisabled ? styles.inputDisabled : {}, styles.input]} type={this.props.inputType} onChange={this.props.onChange} ref={this.props.inputRef ? this.props.inputRef : ''}/>
			</label>
		);
	}
}
LoginInput.propTypes = {
	fontIcon: PropTypes.string.isRequired,
	text: PropTypes.string,
	inputType: PropTypes.string.isRequired,
	// onChange: PropTypes.func.isRequired,
};

LoginInput.defaultProps = {
	text: ':',
};

export default Radium(LoginInput);