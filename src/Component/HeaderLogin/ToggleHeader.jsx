import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import styles from './ToggleHeader.css.js';
import FontAwesome from 'react-fontawesome';
// console.log(styles);
// console.log(styles.headerLogin');

class HeaderLogin extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggleClick = this.handleToggleClick.bind(this);
		// this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {
			style: styles.i
		};
	}
	handleToggleClick() {
		// console.log(e.target);
		this.props.onToggleClick(this.props.toggled);
		if (this.props.toggled) {
			// let arr = this.state.style;
			// console.log(arr);
			// let arr = this.state.style.concat([styles.rotated]);
			this.setState({style: {...this.state.style, ...styles.rotated}});
			// console.log(this.state.style);
		} else {
			this.setState({style: styles.i});
			// console.log(this.state.style);
			// console.log(styles.i);
		}
		// this.setState({toggled: !this.props.toggled});
	}

	render() {
		return (<FontAwesome name={this.props.toggled ? 'minus' : 'plus'} style={this.state.style} onClick={this.handleToggleClick}/>);
	}
}

HeaderLogin.propTypes = {
	toggled: PropTypes.bool.isRequired,
	onToggleClick: PropTypes.func.isRequired,
};

export default Radium(HeaderLogin);