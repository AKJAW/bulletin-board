import React from 'react';
import {Motion, spring,} from 'react-motion';
import Firebase from 'firebase';
import styles from './TodoApp.css.js';
import CreateLabelButton from './CreateLabelButton.jsx';
import CreateLabelMenu from './CreateLabelMenu.jsx';
import LabelBoard from './LabelBoard.jsx';
import AddTask from './AddTask.jsx';
import DeleteLabel from './DeleteLabel.jsx';
import IconChooser from './IconChooser.jsx';
import ManageChanges from './ManageChanges.jsx';


class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.CreateLabel = this.CreateLabel.bind(this);
		this.handleLabelNameChange = this.handleLabelNameChange.bind(this);
		this.handleAddLabel = this.handleAddLabel.bind(this);
		this.handleDeleteLabelClickInTitle = this.handleDeleteLabelClickInTitle.bind(this);
		this.handleAddClickInTitle = this.handleAddClickInTitle.bind(this);
		this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
		this.handleIconSelect = this.handleIconSelect.bind(this);
		this.handleCancelTaskClick = this.handleCancelTaskClick.bind(this);
		this.handleYesDeleteLabel = this.handleYesDeleteLabel.bind(this);
		this.handleNoCancelDeleteLabel = this.handleNoCancelDeleteLabel.bind(this);
		this.overWriteItems = this.overWriteItems.bind(this);
		this.updateBoardChanges = this.updateBoardChanges.bind(this);
		this.handelCancelChanges = this.handelCancelChanges.bind(this);
		this.state = {
			isCreatingLabel: false,
			position: 0,
			labelName: '',
			isAddingTask: false,
			isDeletingLabel: false,
			isChosingTaskIcon: false,
			taskName: '',
			currentLabel: '',
			isBoardChanged: false,
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

	updateBoardChanges(){
		this.setState({ isBoardChanged: true });
	}

	overWriteItems(items){
		this.setState({ items: [].concat(items), isBoardChanged: false });
	}

	handelCancelChanges(){
		let currentItems = [...this.state.items];
		let newItems = []
		for(var i = 0; i < currentItems.length; i++) {
			newItems.push(JSON.parse(JSON.stringify(currentItems[i])));
		}
		this.setState({ items: [].concat(newItems), isBoardChanged: false });
	}

	handleAddTaskClick(text){
		this.setState({ isChosingTaskIcon: true, taskName: text, isAddingTask: false });
		// console.log(text);
	}

	handleAddClickInTitle(labelName){
		this.setState({ isAddingTask: true, isChosingTaskIcon: false, isDeletingLabel:false,  currentLabel: labelName });
		// console.log(labelName);
	}

	handleDeleteLabelClickInTitle(labelName){
		// console.log(labelName);
		this.setState({ isDeletingLabel: true, isChosingTaskIcon: false, isAddingTask: false, currentLabel: labelName });
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
			// this.setState({ items: [].concat(newItems), isChosingTaskIcon: false, taskName: '' }, () => {console.log(this.state.items);});
			this.setState({ items: [].concat(newItems), isChosingTaskIcon: false, taskName: '', currentLabel: '' });
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
			tasks: {0: 'p'},
		})
		// ({[labelName]: {'placeholder':'placeholder'}});
		this.setState({labelName: ""});
	}

	handleCancelTaskClick(){
		this.setState({ isAddingTask: false });
	}

	handleNoCancelDeleteLabel(){
		this.setState({ isDeletingLabel: false });
	}

	handleYesDeleteLabel(){
		const labelName = this.state.currentLabel;
		console.log('labelName');
		let currentItems = [...this.state.items];
		let newItems = []
		for(var i = 0; i < currentItems.length; i++) {
			const currentKey = Object.keys(currentItems[i])[0]
			if(currentKey !== labelName){
				newItems.push(JSON.parse(JSON.stringify(currentItems[i])));
				// newItems[i][labelName]['tasks'].push({ [this.state.taskName]: iconName })
			}
		}
		// debugger;
		// console.log(this.state.taskName);
		// console.log(iconName);
		// console.log(newItems);
		// console.log(this.state.items);
		this.setState({ items: [].concat(newItems), isDeletingLabel: false, currentLabel: '' });
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
							{this.state.isBoardChanged || <CreateLabelButton onClick={this.CreateLabel}>{this.state.isCreatingLabel ? 'Anuluj' : 'Stwórz etykietę'}</CreateLabelButton>}
							{this.state.isCreatingLabel &&
								(<CreateLabelMenu labelName={this.state.labelName} onAddLabel={this.handleAddLabel} onChange={this.handleLabelNameChange}/>)}
							{this.state.isBoardChanged && <ManageChanges onNoCancelChanges={this.handelCancelChanges} onApplyChanges={() => this.refs.board.overWriteItemsBoard()}/>}
						</div>)
					}
				</Motion>

				{this.state.isAddingTask && <AddTask onCancelTaskClick={this.handleCancelTaskClick} onAddTaskClick={this.handleAddTaskClick}/>}
				{this.state.isDeletingLabel && <DeleteLabel onNoCancelDeleteLabel={this.handleNoCancelDeleteLabel} onYesDeleteLabel={this.handleYesDeleteLabel}/>}
				{this.state.isChosingTaskIcon && <IconChooser taskName={this.state.taskName} onIconSelect={this.handleIconSelect}/>}
				{this.state.items.length > 0 && <LabelBoard items={this.state.items} onAddClick={this.handleAddClickInTitle} onDeleteClick={this.handleDeleteLabelClickInTitle} overWriteItems={this.overWriteItems} updateBoardChanges={this.updateBoardChanges} ref={'board'}/>}
			</div>
		);
	}
}

export default TodoApp;