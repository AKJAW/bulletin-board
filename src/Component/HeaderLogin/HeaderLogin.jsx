import React from 'react';
import styles from './HeaderLogin.css.js';
import LoginMenu from './LoginMenu.jsx';
// console.log(styles);
// console.log(styles.headerLogin');
class HeaderLogin extends React.Component {
	render() {
		return (
			<div style={styles.headerLogin}>
				<LoginMenu />
				<span id="login-status">login-status</span>
			</div>
		);
	}
}

export default HeaderLogin;