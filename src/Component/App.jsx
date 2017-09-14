import React from 'react';
import LoginHeader from './HeaderLogin/HeaderLogin.jsx';
import styles from './App.css.js';
import {StyleRoot} from 'radium';
import {Motion, spring,} from 'react-motion';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleToggleClick = this.handleToggleClick.bind(this);
		const toggleState = localStorage.getItem('toggled') || true;
		this.state = {
			toggled: (toggleState == 'true'),
		};
		// if (!toggleState){
		// 	this.setState({
		// 		toggled: false,
		// 	});
		// }
		// console.log(this.state.toggled)
		// console.log(toggleState)
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
					<LoginHeader toggled={this.state.toggled} onToggleClick={this.handleToggleClick}/>
					<Motion style={{x: spring(this.state.toggled ? 0 : -30)}}>
	          {({x}) =>
	            // children is a callback which should accept the current value of
	            // `style`
							<div style={[{
								WebkitTransform: `translate3d(0, ${x}px, 0)`,
								transform: `translate3d(0, ${x}px, 0)`,
							}, styles.i]}>
								<div >assshh</div>

							</div>
	          }
	        </Motion>

				</StyleRoot>

			</div>
		);
	}
}

export default App;