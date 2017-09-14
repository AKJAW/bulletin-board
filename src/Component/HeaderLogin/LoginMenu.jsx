import React from 'react';
import Firebase from 'firebase';
import ReactFire from 'reactfire';
import Radium from 'radium';
import {Motion, spring,} from 'react-motion';
import LoginInput from './LoginInput.jsx';
import LoginButton from './LoginButton.jsx';
// import FontAwesome from 'react-fontawesome';

// console.log(styles);
// console.log(styles.headerLogin');

class LoginMenu extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
		this.handleInputLoginChange = this.handleInputLoginChange.bind(this);
		this.handleSignUpClick = this.handleSignUpClick.bind(this);
		// this.handleInputLogoutChange = this.handleInputLogoutChange.bind(this);
		this.state = {
			isLoggedIn: false,
			loginText: '',
			isSigningUp: false,
			scale: 1,
		};
		console.log(this.state.isSigningUp)
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
	logIn() {
		const email = this.state.loginText;
		// console.log(email);
		const password = this.passwordInput.value;
		// console.log(password);

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

	logOut() {
		Firebase.auth().signOut().then(() => {
			// Sign-out successful.
			this.props.onLogoutClick();
		}, (error) => {
			alert(error.message);
		});
		console.log("Wyloguj");
	}

	handleLoginClick() {
		if (!this.state.isLoggedIn) {
			this.logIn();
		} else {
			this.logOut();
		}
	}

	handleSignUpClick() {
		// console.log(window.innerWidth/2-200);
		this.setState({scale: 0});
		setTimeout(function() { this.setState({scale: 1}); }.bind(this), 200);
		this.setState({isSigningUp: !this.state.isSigningUp});
	}

	render() {
		return (
			<Motion style={{scale: spring(this.state.scale, {stiffness: 140, damping: 16})}}>
				{({scale}) =>
					// children is a callback which should accept the current value of
					// `style`
					<div style={{
						WebkitTransform: `scale3d(${scale}, ${scale}, ${scale})`,
						transform: `scale3d(${scale}, ${scale}, ${scale})`,
					}}>
						<LoginInput fontIcon="user-circle-o" isDisabled={this.state.isLoggedIn} inputType="text" text="login:" onChange={this.handleInputLoginChange}/>
						<LoginInput fontIcon="lock" isDisabled={this.state.isLoggedIn} inputType="password" text="haslo:" inputRef={(input) => {
							this.passwordInput = input;
						}}/>
						{this.state.isSigningUp || <LoginButton style={{}} text={this.state.isLoggedIn ? 'Wyloguj' : 'Zaloguj'} onClick={this.handleLoginClick}/>}
						<LoginButton style={{marginLeft:'10px'}} text='Zarejestruj się' onClick={this.handleSignUpClick}/>
						{this.state.isSigningUp && <LoginButton style={{marginLeft:'10px'}} text='Anuluj' onClick={this.handleLoginClick}/>}
					</div>
				}
			</Motion>

		);
	}
}

export default Radium(LoginMenu);