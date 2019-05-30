import React from 'react';


const inpKey = document.getElementById("inpKey");
const btnInsert = document.getElementById("btnInsert");
const lsOutput = document.getElementById("lsOutput");
const inpValue = document.getElementById("inpValue");


const backdropStyle = {
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	backgroundColor: 'rgba(0,0,0,0.3)',
	padding: 50
	
}

const modalStyle = {
	backgroundColor: '#fff',
	borderRadius: 5,
	maxWidth: 500,
	minHeight: 300,
	margin: '0 auto',
	padding: 30,
	position: 'relative'
};

const footerStyle = {
	position: 'absolute',
	bottom: 20
};



export default class Modal extends React.Component{
	constructor(props) {
		super(props);
		this.state = {value: ""};
		this.handleChange = this.handleChange.bind(this);
	}


	onClose = (e) => {
		e.stopPropagation();
		this.props.onClose && this.props.onClose(e);
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}


	onKeyUp = (e) => { //esc
		if(e.which === 27 && this.props.show) {
			this.onClose(e);
		}
	}

	componentDidMount() {
		document.addEventListener("keyup", this.onKeyUp);
	}

	componentWillUnmount() {
		document.removeEventListener("keyup", this.onKeyUp)
	}

	render() {
		if (!this.props.show) {
			return null;
		}
		return(
			<div style={backdropStyle}>
			<div style={modalStyle}>
		<fieldset>
					<legend>Enter Your Event</legend>
						<input id="inpKey" type="text" placeholder="Enter Event..."></input>
						<input id="inpValue" type="text" placeholder="Enter Time..."></input>
						<button type="button" id="btnInsert">Add Event</button>
				</fieldset>
				<fieldset>
					<legend>your Events: </legend>
					<div id="lsOutput"></div>
				</fieldset>
				{this.props.children}

				<div style={footerStyle}>
					<button onClick={(e) => { this.onClose(e)}}>
						Save
					</button>
				</div>
				</div>
			</div>
		);
		
	}
}