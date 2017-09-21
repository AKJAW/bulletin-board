import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {fontAwesomeArray} from '../../Data/fontAwesome.js';

const Container = Styled.div`
  display: inline-flex;
  flex-direction: row;
	width: 100%;
  height: 100%;
	text-align: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const InputText = Styled.div`
	margin-top:4px;
  word-wrap: break-word;
`;

const IconInput = Styled.input`
	height: 19px;
	transition: box-shadow 0.3s, border 0.3s;
	border: 'solid 1px #dcdcdc';
	padding: 3px;
	marginRight: 7px;
	marginLeft: 2px;
`;

const IconButton = Styled.button`
		color: #82A2D7;
		border-style: solid;
		border-width: 2px;
		border-color: #82A2D7;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.3;
    height: 27px;
    background: rgba(0,0,0,0);
		background: rgb(255,255,255);
		&:hover {
			border-color: #4D6EA4;
			color: #4D6EA4;
		};
    &:active {
			border-color: #27496d;
			color: #27496d;
		};
`;

const IconDiv = Styled.div`
  word-wrap: break-word;
  border: 1px solid black;
  overflow: auto;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 1 auto;
  overflow-y: auto;
  height: 214px;
	width: 70%;
	text-align: center;
  justify-content: center;
`;

const UserChooseDiv = Styled.div`
  max-width: 181px;
  word-wrap: break-word;
  border: 1px solid black;
  display: inline-flex;
  flex-direction: column;
	text-align: center;
  justify-content: space-between;
`;

class IconChooser extends React.Component {
	constructor(props) {
		super(props);
    this.handleOnIconClick = this.handleOnIconClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnIconSelect = this.handleOnIconSelect.bind(this);
    this.state = {
      currentIcons: fontAwesomeArray,
      chosenIcon: 'none',
    }
	}

    handleOnIconSelect(){
      this.props.onIconSelect(this.state.chosenIcon);
    }

  	handleOnChange(e){
      const currentInput = e.target.value;
      if(!currentInput) {
        this.setState({currentIcons: []})
      }
      const currentIcons = fontAwesomeArray.filter(function (iconName){
        // debugger;
        return iconName.includes(currentInput);
      })
      this.setState({currentIcons})
  	}

  	handleOnIconClick(IconName){
      this.setState({chosenIcon: IconName});
  		// debugger;
  	}

	render() {
    const chosenIcon= this.state.chosenIcon;
		return (
      <Container>
        <UserChooseDiv>
          <div>
            <InputText>Tekst: {this.props.taskName}</InputText>
          </div>
          <div>
            <InputText>Nazwa ikony:</InputText>
            <IconInput onChange={this.handleOnChange} />
          </div>
          <div>
            <InputText>Obecnie wybrana Ikona:</InputText>
            <FontAwesome style={{margin: '0 5px 0 5px'}} title={chosenIcon} name={chosenIcon} size='2x' />
            <InputText>{chosenIcon}</InputText>
          </div>
          <IconButton onClick={this.handleOnIconSelect}>Dodaj</IconButton>
        </UserChooseDiv>
        <IconDiv>
          {this.state.currentIcons.map(function(icon){
            return <FontAwesome style={{margin: '0 5px 0 5px'}} key={icon} title={icon} name={icon} size='2x' onClick={() => (this.handleOnIconClick(icon))}/>

          }.bind(this))}
        </IconDiv>
			</Container>
		);
	}
}

export default IconChooser;