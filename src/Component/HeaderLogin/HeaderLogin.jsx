import React from 'react';
import Radium from 'radium';
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
			toggled: true,
		};
	}

	handleToggleClick(isToggled){
		this.setState({toggled: !isToggled});
	}

	handleLoginClick(userName) {
		this.setState({username: userName});
	}

	handleLogoutClick() {
		this.setState({username: ''});
	}

	render() {
		return (
			<div style={styles.headerLogin}>
				<LoginMenu onLoginClick={this.handleLoginClick} onLogoutClick={this.handleLogoutClick}/>
				<div>
					<span id="login-status" style={styles.span}>{this.state.username ? 'Jesteś zalogowany: ' + this.state.username : 'Nie jesteś zalogowany'}</span>
					<ToggleHeader toggled={this.state.toggled} onToggleClick={this.handleToggleClick}/>
				</div>
			</div>
		);
	}
}

export default Radium(HeaderLogin);