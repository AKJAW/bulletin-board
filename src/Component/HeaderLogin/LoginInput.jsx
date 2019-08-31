import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Styled from 'styled-components';
// var FontAwesome = require('react-fontawesome');
// console.log(styles);
// console.log(styles.headerLogin');
const Input = Styled.input`
	height: 19px;
	transition: box-shadow 0.3s; border 0.3s;
	border: solid 1px #dcdcdc;
	padding: 3px;
	margin: 0 7px 0 2px;
	cursor: ${({ cursor }) => (cursor)};
`;


class LoginInput extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	console.log(this.props.isDisabled ? 'cursor: not-allowed;' : 'cursor: default;')
	// }
	render() {
		return (
			<label>
				<FontAwesome name={this.props.fontIcon}/> {this.props.text}
				<Input disabled={this.props.isDisabled} cursor={this.props.isDisabled ? 'not-allowed' : 'auto'} type={this.props.inputType} onChange={this.props.onChange} innerRef={this.props.inputRef ? this.props.inputRef : ''}/>
			</label>
		);
	}
}
LoginInput.propTypes = {
	fontIcon: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool.isRequired,
	inputType: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	inputRef: PropTypes.func,
	onChange: PropTypes.func,
	// onChange: PropTypes.func.isRequired,
};

LoginInput.defaultProps = {
	text: ':',
};

export default LoginInput;