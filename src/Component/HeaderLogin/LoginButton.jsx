import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Styled from 'styled-components';
// import styles from './HeaderLogin.css.js';
// var FontAwesome = require('react-fontawesome');
// console.log(styles);
// console.log(styles.headerLogin');
// import FontAwesome from 'react-fontawesome';
const Button = Styled.button`
		color: #82A2D7;
		border-style: solid;
		border-width: 2px;
		border-color: #82A2D7;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.3;
    background: rgba(0,0,0,0);
		background: rgb(255,255,255);
		margin: 5px;
		&:hover {
			border-color: #4D6EA4;
			color: #4D6EA4;
		};
    &:active {
			border-color: #27496d;
			color: #27496d;
		};
`;

class LoginInput extends React.Component {
	render() {
		return (
			<Button onClick={this.props.onClick}>{this.props.text}</Button>
		);
	}
}

LoginInput.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default Radium(LoginInput);