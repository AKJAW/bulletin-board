import React from 'react';
// import styles from './HeaderLogin.css.js';
import LoginInput from './LoginInput.jsx';
import LoginButton from './LoginButton.jsx';
import FontAwesome from 'react-fontawesome';

// console.log(styles);
// console.log(styles.headerLogin');

class LoginMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.handleInputLoginChange = this.handleInputLoginChange.bind(this);
		this.handleInputLogoutChange = this.handleInputLogoutChange.bind(this);
		this.state = {
			isLoggedIn: false,
			loginText: '',
			passwordText: ''
		};

	}

	handleInputLoginChange(e) {
		this.setState({loginText: e.target.value});
		// console.log(e.target.value);
	}

	handleInputLogoutChange(e) {
		this.setState({passwordText: e.target.value});
		// console.log(e.target.value);
	}

	handleLoginClick() {
		// this.setState({isLoggedIn: true});
		console.log("Zaloguj");
	}

	handleLogoutClick() {
		// this.setState({isLoggedIn: false});
		console.log("Wyloguj");
	}

	render() {
		return (
			<div>
				<LoginInput fontIcon="user-circle-o" inputType="text" text="login:" onChange={this.handleInputLoginChange}/>
				<LoginInput fontIcon="lock" inputType="password" text="haslo:" onChange={this.handleInputLogoutChange}/>
				<LoginButton text="Zaloguj" onClick={this.handleLoginClick}/>
				<LoginButton text="Wyloguj" onClick={this.handleLogoutClick}/>
			</div>
		);
	}
}

export default LoginMenu;