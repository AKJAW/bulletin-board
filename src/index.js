import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Component/App.jsx';
// import registerServiceWorker from './registerServiceWorker';
import * as Firebase from 'firebase';
import * as ReactFire from 'reactfire';

ReactDOM.render(
	<App/>, document.getElementById('root'));

// const config = {
// 	apiKey: 'AIzaSyBqzVU8p61mFTSdl00ksJnBSTW3pEMk3vw',
// 	authDomain: 'bulletin-board-31d52.firebaseapp.com',
// 	databaseURL: 'https://bulletin-board-31d52.firebaseio.com',
// 	projectId: 'bulletin-board-31d52',
// 	storageBucket: 'bulletin-board-31d52.appspot.com',
// 	messagingSenderId: '326331476469'
// };
// Firebase.initializeApp(config);
//
// class TodoList extends React.Component {
// 	render() {
// 		return (
// 			<ul>
// 				{this.props.items.map(item => (
// 					<li key={item.id}>{item.text}</li>
// 				))}
// 			</ul>
// 		);
// 	}
// }
//
// class TodoApp extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 		this.items = [];
// 		this.state = {
// 			items: [],
// 			text: '',
// 		};
// 	}
//
// 	componentWillMount() {
// 		this.firebaseRef = Firebase.database().ref("items");
// 		// debugger;
// 		this.firebaseRef.on("child_added", function (dataSnapshot) {
// 			this.items.push(dataSnapshot.val());
// 			this.setState({items: this.items});
// 		}.bind(this));
// 	}
//
// 	componentWillUnmount() {
//   this.firebaseRef.off();
// }
//
// 	handleSubmit(e) {
// 		e.preventDefault();
// 		this.firebaseRef.push({text: this.state.text});
// 		this.setState({text: ""});
// 	}
//
// 	render() {
// 		return (
// 			<div>
// 				<h3>TODO</h3>
// 				<TodoList items={this.state.items}/>
// 				<form onSubmit={this.handleSubmit}>
// 					<input onChange={this.handleChange} value={this.state.text}/>
// 					<button>{'Add #' + (this.state.items.length + 1)}</button>
// 				</form>
// 			</div>
// 		);
// 	}
//
// 	handleChange(e) {
// 		this.setState({text: e.target.value});
// 	}
//
// 	// handleSubmit(e) {
// 	// 	e.preventDefault();
// 	// 	var newItem = {
// 	// 		text: this.state.text,
// 	// 		id: Date.now(),
// 	// 	};
// 	// 	this.setState((prevState) => ({items: prevState.items.concat(newItem), text: '',}));
// 	// }
// }

