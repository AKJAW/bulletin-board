import React from 'react';
import {Motion, spring,} from 'react-motion';
import Firebase from 'firebase';
import styles from './TodoApp.css.js';
import CreateLabelButton from './CreateLabelButton.jsx';
import CreateLabelMenu from './CreateLabelMenu.jsx';
import ItemsContext from './ItemsContext.jsx';


class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.CreateLabel = this.CreateLabel.bind(this);
		this.handleLabelNameChange = this.handleLabelNameChange.bind(this);
		this.handleAddLabel = this.handleAddLabel.bind(this);
		this.state = {
			isCreatingLabel: false,
			position: 0,
			labelName: '',
			items: [{12312:{color: "green", tasks: ["p"]}},
			{asda:{color: "blue", tasks: ["p", 1, 2,3,4 ,5,6,7]}}],
		};
		// setTimeout(() => {
		// 	this.setState({position: 0});
		// }, 1);
	}

	componentWillMount() {
		// this.firebaseTodoUidRef = Firebase.database().ref(`todo-list/${this.props.uid}`);
		// // this.firebaseLabelRef = Firebase.database().ref(`todo-list/${this.props.uid}`);
		// this.firebaseTodoUidRef.once('value').then(function(snapshot) {
		// 	let updatedList = [];
		// 	snapshot.forEach(function(childSnapshot){
		// 		updatedList.push({[childSnapshot.key]: childSnapshot.val()})
		// 		// console.log(snapshot.val());
		// 		// const updatedList = this.state.items.concat(snapshot.val());
		// 	}.bind(this))
		// 	// debugger;
		// 	console.log(updatedList)
		// 	this.setState({items: updatedList});
		// }.bind(this));


		// debugger;
		// this.firebaseTodoUidRef.on("child_added", function (dataSnapshot) {
		// 	this.items.push(dataSnapshot.val());
		// 	this.setState({items: this.items});
		// }.bind(this));
	}




	CreateLabel(){
		this.setState({isCreatingLabel: !this.state.isCreatingLabel});
		console.log("CreateLabel");
	}

	handleLabelNameChange(e) {
		this.setState({labelName: e.target.value});
	}

	handleAddLabel(){
		console.log(this.state.labelName);
		const labelName = this.state.labelName;
		this.firebaseTodoUidRef.child(labelName).set({
				color: 'red',
				tasks: {0:'p'},
		})
		// ({[labelName]: {'placeholder':'placeholder'}});
		this.setState({labelName: ""});
	}

	render() {
		return(
			<div>
				<Motion style={{x: spring(this.state.position)}}>
					{({x}) =>
						// children is a callback which should accept the current value of
						// `style`
						(<div style={{
						WebkitTransform: `translate3d(${x}px, 0, 0)`,
						transform: `translate3d(${x}px, 0, 0)`,
						}}>
							<CreateLabelButton onClick={this.CreateLabel}>{this.state.isCreatingLabel ? 'Anuluj' : 'Stwórz etykietę'}</CreateLabelButton>
							{this.state.isCreatingLabel &&
								(<CreateLabelMenu labelName={this.state.labelName} onAddLabel={this.handleAddLabel} onChange={this.handleLabelNameChange}/>)}

						</div>)
					}
				</Motion>
				<div style={styles.div}>
					{this.state.items.length > 0 && <ItemsContext items={this.state.items}/>}
				</div>
			</div>
		);
	}
}

export default TodoApp;