import React from 'react';
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
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.handleToggleClick = this.handleToggleClick.bind(this);
		this.state = {
			username: '',
			style: {},
		};
	}

	handleToggleClick(isToggled) {
		this.props.onToggleClick(isToggled);
	}

	handleLoginClick(userName) {
		this.setState({username: userName});
	}

	handleLogoutClick() {
		this.setState({username: ''});
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
							<LoginMenu onLoginClick={this.handleLoginClick} onLogoutClick={this.handleLogoutClick}/>
							<span id="login-status" style={styles.span}>{this.state.username ? 'Jesteś zalogowany: ' + this.state.username : 'Nie jesteś zalogowany'}</span>

						</div>
          }
        </Motion>

				<ToggleHeader toggled={this.props.toggled} onToggleClick={this.handleToggleClick}/>
			</div>
		);
	}
}

export default Radium(HeaderLogin);