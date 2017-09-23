import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {Motion, spring,} from 'react-motion';
// import {slideInDown} from 'react-animations'
import styles from './HeaderLogin.css.js';
import LoginMenu from './LoginMenu.jsx';
import ToggleHeader from './ToggleHeader.jsx';
// console.log(styles);
// console.log(styles.headerLogin');

class HeaderLogin extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggleClick = this.handleToggleClick.bind(this);
		this.handleSendError = this.handleSendError.bind(this);
		this.state = {
			style: {},
		};
	}

	handleSendError(error){
		this.props.sendError(error);
	}

	handleToggleClick(isToggled) {
		this.props.onToggleClick(isToggled);
	}

	render() {
		return (
			<div>
				<Motion style={{x: spring(this.props.toggled ? 0 : -50)}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
						<div style={[this.state.style, styles.headerLogin, {
							WebkitTransform: `translate3d(0, ${x}px, 0)`,
							transform: `translate3d(0, ${x}px, 0)`,
						}]}>
							<LoginMenu sendError={this.handleSendError} isLoggedIn={this.props.isLoggedIn}/>
							<span id="login-status" style={styles.span}>{this.props.username ? 'Jesteś zalogowany: ' + this.props.username : 'Nie jesteś zalogowany'}</span>

						</div>
          }
        </Motion>

				<ToggleHeader toggled={this.props.toggled} onToggleClick={this.handleToggleClick}/>
			</div>
		);
	}
}

HeaderLogin.propTypes = {
	toggled: PropTypes.bool.isRequired,
	onToggleClick: PropTypes.func.isRequired,
	sendError: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
};

export default Radium(HeaderLogin);