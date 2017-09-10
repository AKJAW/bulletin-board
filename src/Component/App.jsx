import React from 'react';
import LoginHeader from './HeaderLogin.jsx';
import styles from './App.css.js';

class App extends React.Component {
	constructor(prop){
		super(prop);
		console.log(styles);
	}
	render() {
		return (
			<div>
				<LoginHeader/>
				<div style={styles.i}>ahh</div>
			</div>
		// <div>
		// 	<form class="show-hide-header-login" action="" id="login-form">
		// 		<i class="fa fa-user-circle-o">
		// 		login:</i>
		// 		<input type="text" id="login-text"/>
		// 		<i class="fa fa-lock">
		// 		haslo:</i>
		// 		<input type="password" id="password-text"/>
		// 	</form>
		// 	<button class="show-hide-header-login" id="login-button">Zaloguj</button>
		// 	<button class="show-hide-header-login" id="logout-button">Wyloguj</button>
		// 	<span id="login-status"></span>
		// </div>
		);
	}
}

export default App;