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
		this.handleInputLogoutChange = this.handleInputLogoutChange.bind(this);
		this.state = {
			isLoggedIn: false,
			loginText: '',
			passwordText: ''
		};
	}

	componentDidMount() {
		const config = {
			apiKey: 'AIzaSyBqzVU8p61mFTSdl00ksJnBSTW3pEMk3vw',
			authDomain: 'bulletin-board-31d52.firebaseapp.com',
			databaseURL: 'https://bulletin-board-31d52.firebaseio.com',
			projectId: 'bulletin-board-31d52',
			storageBucket: 'bulletin-board-31d52.appspot.com',
			messagingSenderId: '326331476469'
		};
		Firebase.initializeApp(config);
		Firebase.auth().onAuthStateChanged((user) => {
			// 	// debugger;
			// 	// if (localStorage.getItem('toggleHeaderLogin') === 'false') {
			// 	// 	toggleHeaderLogin();
			// 	// }
			// 	// document.getElementById('quickstart-verify-email').disabled = true;
			if (user) {
				console.log(user);
				this.setState({isLoggedIn: true});
				this.props.onLoginClick(this.state.loginText);
				// 		// User is signed in.
				// 		const email = user.email;
				// 		const uid = user.uid;
				// 		// console.log('Init', email)
				// 		// console.log(email);
				// 		// console.log(uid);
				//
				// 		// var database = firebase.database().ref('users')
				// 		// database.child(uid).once('value', function(snap) {
				// 		// 	var data = snap.val()
				// 		// 	var displayName = data.displayName
				// 		// 	document.getElementById('login-status').textContent = 'Jesteś zalogowany(' + displayName + ')'
				// 		// })
				//
				// 		// var name = database.ref('Users/' + uid + '/displayName').val();
				// 		// console.log('Users' + uid + '/displayName');
				// 		// localStorage.setItem("uid", uid);
				// 		// // [START_EXCLUDE]
				// 		// document.getElementById('login-status').textContent = 'Jesteś zalogowany: ' + email;
				// 		// document.getElementById('login-text').value = email;
				// 		//
				// 		// document.getElementById('login-button').disabled = true;
				// 		// document.getElementById('logout-button').disabled = false;
				// 		// document.getElementById('login-text').disabled = true;
				// 		// document.getElementById('password-text').disabled = true;
				// 		//
				// 		// $('#login-text').css('cursor', 'not-allowed');
				// 		// $('#password-text').css('cursor', 'not-allowed');
				// 		//
				// 		// $('#login-text').removeClass('not-logged-in');
				// 		// $('#password-text').removeClass('not-logged-in');
				// 		// document.getElementById('focused-input').disabled = true
				// 		// document.getElementById('search-icon').addEventListener('click', eraseInput, false)
				// 		// document.onkeydown = keyPressSearch
				// 		// document.getElementById('delete-row').addEventListener('click', deleteRow, false)
				// 		// document.getElementById('add-row').addEventListener('click', popupRowName, false)
				// 		// document.getElementById('delete-cell').addEventListener('click', deleteCell, false)
				// 		// initializeDatabase()
				// 		// initDatabase()
			} else {
				this.setState({isLoggedIn: false});
				// 		// User is signed out.
				// 		// [START_EXCLUDE]
				// 		// document.getElementById('login-status').textContent = 'Nie jesteś zalogowany';
				// 		// document.getElementById('login-button').disabled = false;
				// 		// document.getElementById('logout-button').disabled = true;
				// 		// document.getElementById('login-text').disabled = false;
				// 		// document.getElementById('password-text').disabled = false;
				// 		// $('#login-text').css('cursor', '');
				// 		// $('#password-text').css('cursor', '');
				// 		//
				// 		//
				// 		// // listUpdatedRows(ehh)
				// 		// hidePanel();
			}
		})
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
		// if (Firebase.auth().currentUser) {
		// 	// [START signout]
		// 	Firebase.auth().signOut();
		// 	// [END signout]
		// }
		const email = this.state.loginText;
		// console.log(email);
		const password = this.state.passwordText;
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
				<LoginInput fontIcon="lock" isDisabled={this.state.isLoggedIn} inputType="password" text="haslo:" onChange={this.handleInputLogoutChange}/>
				<LoginButton text="Zaloguj" isDisabled={this.state.isLoggedIn} onClick={this.handleLoginClick}/>
				<LoginButton text="Wyloguj" isDisabled={!this.state.isLoggedIn} onClick={this.handleLogoutClick}/>
			</div>
		);
	}
}

export default LoginMenu;