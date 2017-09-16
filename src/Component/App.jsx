import React from 'react';
import Firebase from 'firebase';
import {StyleRoot} from 'radium';
import {Motion, spring,} from 'react-motion';
import LoginHeader from './HeaderLogin/HeaderLogin.jsx';
import Notification from './Notification/Notification.jsx';
import TodoApp from './Todo/TodoApp.jsx';
import styles from './App.css.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggleClick = this.handleToggleClick.bind(this);
		this.handleError = this.handleError.bind(this);
		const toggleState = localStorage.getItem('toggled') || 'true';
		this.state = {
			toggled: (toggleState === 'true'),
			errorList: [],
			isLoggedIn: false,
			username: '',
			uid: '',
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
				// debugger;
				this.setState({isLoggedIn: true, isSigningUp:false, username:user.email, uid:user.uid});
				this.handleError({
					code: 'auth/logged-in',
				})
			} else {
				this.setState({isLoggedIn: false, username:''});
			}
		})
	}

	deleteFirstItemFromErrorList(){
		let list = this.state.errorList
		// console.log(list)
		// console.log(this.state.errorList)
		if (list.length > 0){
			const updatedErrorList = list.splice(0,1);
			this.setState({errorList: updatedErrorList});
		}
	}

	handleError(error){
		console.log(error);
		const errorObject = {};
		errorObject.code = error.code;
		// console.log(error);
		switch (errorObject.code) {
		case 'auth/email-already-in-use':
			errorObject.message = 'Email jest już w użyciu';
			errorObject.type = 'error';
			break;
		case 'auth/invalid-email':
			errorObject.message = 'Email jest niepoprawny';
			errorObject.type = 'error';
			break;
		case 'auth/operation-not-allowed':
			errorObject.message = 'Konta są aktualnie wyłączone';
			errorObject.type = 'error';
			break;
		case 'auth/weak-password':
			errorObject.message = 'Hasło powinno mieć przynajmniej 6 znaków';
			errorObject.type = 'error';
			break;
		case 'auth/user-disabled':
			errorObject.message = 'Użytkownik został wyłączony';
			errorObject.type = 'error';
			break;
		case 'auth/user-not-found':
			errorObject.message = 'Nie znaleziono użytkownika';
			errorObject.type = 'error';
			break;
		case 'auth/wrong-password':
			errorObject.message = 'Niepoprawne hasło';
			errorObject.type = 'error';
			break;
		case 'auth/logged-in':
			errorObject.message = 'Zalogowano pomyślnie';
			errorObject.type = 'success';
			break;
		case 'auth/logged-out':
			errorObject.message = 'Wylogowano pomyślnie';
			errorObject.type = 'success';
			break;
		default:
			errorObject.message = error.message;
			errorObject.type = 'error';
		}
		// const updatedErrorList = this.state.errorList.concat(errorObject);
		// console.log("errorObject:");
		// console.log(errorObject)
		// console.log("updatedErrorList:");
		// console.log(updatedErrorList);
		// debugger;
		this.setState({errorList: this.state.errorList.concat(errorObject)},  () => {
			console.log(this.state.errorList);
			setTimeout(() => {
				this.setState({
				  errorList: this.state.errorList.filter((_, i) => i !== 0)
				})
			}, 4000);
		});

		// console.log(this.state.errorList);
		// setTimeout(function() { this.deleteFirstItemFromErrorList(); }.bind(this), 2000);
	}

	handleToggleClick(isToggled) {
		const toggleState = !isToggled
		// console.log(toggleState)
		localStorage.setItem('toggled', toggleState);
		this.setState({
			toggled: toggleState
		});
	}

	render() {
		// console.log(ehh ? 0 : -30)
		return (
			<div>
				<StyleRoot>
					<LoginHeader toggled={this.state.toggled} onToggleClick={this.handleToggleClick} sendError={this.handleError} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>
					<Motion style={{x: spring(this.state.toggled ? 0 : -30)}}>
	          {({x}) =>
	            // children is a callback which should accept the current value of
	            // `style`
							<div style={[{
								WebkitTransform: `translate3d(0, ${x}px, 0)`,
								transform: `translate3d(0, ${x}px, 0)`,
							}, styles.i]}>
								<Notification errorList={this.state.errorList} />
								{(this.state.isLoggedIn && this.state.uid) && <TodoApp uid={this.state.uid}/>}

							</div>
	          }
	        </Motion>

				</StyleRoot>

			</div>
		);
	}
}

export default App;