import React from 'react';
import Firebase from 'firebase';
import ReactFire from 'reactfire';
import LoginInput from './LoginInput.jsx';
import LoginButton from './LoginButton.jsx';
// import FontAwesome from 'react-fontawesome';

// console.log(styles);
// console.log(styles.headerLogin');

class LoginMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.handleInputLoginChange = this.handleInputLoginChange.bind(this);
		// this.handleInputLogoutChange = this.handleInputLogoutChange.bind(this);
		this.state = {
			isLoggedIn: false,
			loginText: ''
		};
	}

	componentDidMount() {
		const config = {
			apiKey: 'AIzaSyBqzVU8p61mFTSdl00ksJnBSTW3pEMk3vw',
			authDomain: 'bulletin-board-31d52.firebaseapp.com',
			databaseURL: 'https://bulletin-board-31d52.firebaseio.com',
			projectId: 'bulletin-board-31d52',
			storageBucket: 'bulletin-board-31d52.appspot.com',
			messagingSenderId: '326331476469',
		};
		Firebase.initializeApp(config);
		Firebase.auth().onAuthStateChanged((user) => {

			if (user) {
				this.setState({isLoggedIn: true});
				this.props.onLoginClick(this.state.loginText);
			} else {
				this.setState({isLoggedIn: false});
			}
		})
	}

	handleInputLoginChange(e) {
		this.setState({loginText: e.target.value});

	}

	// handleInputLogoutChange(e) {
	// 	this.setState({passwordText: e.target.value});
	// 	// console.log(e.target.value);
	// }

	handleLoginClick() {
		const email = this.state.loginText;
		console.log(email);
		const password = this.passwordInput.value;
		console.log(password);

		Firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// [START_EXCLUDE]
			if (errorCode === 'auth/wrong-password') {
				alert('Zle haslo.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
			// document.getElementById('quickstart-sign-in').disabled = false;
			// [END_EXCLUDE]
		});
		// this.setState({username: this.state.loginText});
		console.log("Zaloguj");
	}

	handleLogoutClick() {
		Firebase.auth().signOut().then(() => {
			// Sign-out successful.
			this.props.onLogoutClick();
		}, (error) => {
			alert(error.message);
		});
		console.log("Wyloguj");
	}

	render() {
		return (
			<div>
				<LoginInput fontIcon="user-circle-o" isDisabled={this.state.isLoggedIn} inputType="text" text="login:" onChange={this.handleInputLoginChange}/>
				<LoginInput fontIcon="lock" isDisabled={this.state.isLoggedIn} inputType="password" text="haslo:" inputRef={(input) => {
					this.passwordInput = input;
				}}/>
				<LoginButton text="Zaloguj" isDisabled={this.state.isLoggedIn} onClick={this.handleLoginClick}/>
				<LoginButton text="Wyloguj" isDisabled={!this.state.isLoggedIn} onClick={this.handleLogoutClick}/>
			</div>
		);
	}
}

export default LoginMenu;