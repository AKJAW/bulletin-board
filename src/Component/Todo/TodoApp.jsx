import React from 'react';
import {Motion, spring,} from 'react-motion';
import Firebase from 'firebase';
import styles from './TodoApp.css.js';
import CreateLabelButton from './CreateLabelButton.jsx';
import CreateLabelMenu from './CreateLabelMenu.jsx';
import LabelBoard from './LabelBoard.jsx';
import AddTask from './AddTask.jsx';
import IconChooser from './IconChooser.jsx';


class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.CreateLabel = this.CreateLabel.bind(this);
		this.handleLabelNameChange = this.handleLabelNameChange.bind(this);
		this.handleAddLabel = this.handleAddLabel.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
		this.handleIconSelect = this.handleIconSelect.bind(this);
		this.state = {
			isCreatingLabel: false,
			position: 0,
			labelName: '',
			isAddingTask: false,
			isChosingTaskIcon: false,
			taskName: '',
			currentLabel: '',
			items: [{12312:{color: "green", tasks: [{isInvisibleNiewidka:'none'}]}},
			{asda:{color: "blue", tasks: [{psssssssssssssssssssssssssssssssssssssssssssssssssss:'etsy'},{1:'id-card'},{2:'thermometer-full'},{3:'american-sign-language-interpreting'}]}},
			{111:{color: "purple", tasks: [{p:'none'}]}},
			{bialy:{color: "white", tasks: [{p:'none'}]}},
			{czarny:{color: "black", tasks: [{p:'none'}]}},
		],
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

	handleAddTaskClick(text){
		this.setState({ isChosingTaskIcon: true, taskName: text, isAddingTask: false });
		// console.log(text);
	}

	handleAddClick(labelName){
		this.setState({ isAddingTask: !this.state.isAddingTask, isChosingTaskIcon: false, currentLabel: labelName });
		// console.log(labelName);
	}

	handleDeleteClick(labelName){
		console.log(labelName);
	}

	handleIconSelect(iconName){
		const labelName = this.state.currentLabel;
		console.log(labelName);
		if(labelName !== ''){
			let currentItems = [...this.state.items];
			let newItems = []
			for(var i = 0; i < currentItems.length; i++) {
				newItems[i] = JSON.parse(JSON.stringify(currentItems[i]));
				const currentKey = Object.keys(currentItems[i])[0]
				if(currentKey === labelName){
					newItems[i][labelName]['tasks'].push({ [this.state.taskName]: iconName })
				}
			}
			console.log(this.state.taskName);
			console.log(iconName);
			// console.log(newItems);
			// console.log(this.state.items);
			this.setState({ items: [].concat(newItems), isChosingTaskIcon: false }, () => {console.log(this.state.items);});
			// console.log(this.state.items);
		}

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
				{this.state.isAddingTask && <AddTask onAddTaskClick={this.handleAddTaskClick}/>}
				{this.state.isChosingTaskIcon && <IconChooser taskName={this.state.taskName} onIconSelect={this.handleIconSelect}/>}
				{this.state.items.length > 0 && <LabelBoard items={this.state.items} onAddClick={this.handleAddClick} onDeleteClick={this.handleDeleteClick}/>}
			</div>
		);
	}
}

export default TodoApp;