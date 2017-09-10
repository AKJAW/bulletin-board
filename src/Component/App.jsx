import React from 'react';
import LoginHeader from './HeaderLogin/HeaderLogin.jsx';
import styles from './App.css.js';

class App extends React.Component {

	render() {
		return (
			<div>
				<LoginHeader/>
				<div style={styles.i}>ahh</div>
			</div>
		);
	}
}

export default App;