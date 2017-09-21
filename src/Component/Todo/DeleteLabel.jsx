import React from 'react';
// import {Motion, spring,} from 'react-motion';
import Styled from 'styled-components';

const Wrapper = Styled.div`
  display: inline-flex;
  flex-direction: row;
	width: 100%;
	text-align: center;
  justify-content: center;
`;

const Container = Styled.div`
  display: inline-flex;
  flex-direction: column;
	width: 100%;
	text-align: center;
  justify-content: center;
`;

const InputText = Styled.span`
	margin-top:4px;
`;

const TaskInput = Styled.input`
	height: 19px;
	transition: box-shadow 0.3s, border 0.3s;
	border: ${({ border }) => (border)};
	padding: 3px;
	marginRight: 7px;
	marginLeft: 2px;
`;

const TaskButton = Styled.button`
		color: #82A2D7;
		border-style: solid;
		border-width: 2px;
		border-color: #82A2D7;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.3;
    width: 150px;
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

class AddTask extends React.Component {
	constructor(props) {
		super(props);
	  this.handleOnYesDeleteLabel = this.handleOnYesDeleteLabel.bind(this);
		this.handleOnNoCancelDeleteLabel = this.handleOnNoCancelDeleteLabel.bind(this);
		this.state = {
			taskName: '',
			inputBorder: 'solid 1px #dcdcdc',
		}
	}

	handleOnYesDeleteLabel(){
		this.props.onYesDeleteLabel();
	}

	handleOnNoCancelDeleteLabel(){
		this.props.onNoCancelDeleteLabel();
	}

	render() {
		return (
			<Wrapper>
        <Container>
          <InputText>Czy na pewno chcesz usunąć etykiete?</InputText>
          <div>
            <TaskButton onClick={this.handleOnYesDeleteLabel}>Tak</TaskButton>
            <TaskButton onClick={this.handleOnNoCancelDeleteLabel}>Nie</TaskButton>
          </div>
        </Container>
			</Wrapper>
		);
	}
}

export default AddTask;