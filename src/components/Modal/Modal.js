import React from 'react';


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
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	onClose = (e) => {
		e.stopPropagation();
		this.props.onClose && this.props.onClose(e);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()})

		console.log('value')
	}

	handleSubmit(event) {
		alert('An event was submitted: ' + this.state.value);
		event.preventDefault();
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
		<form onSubmit={this.handleSubmit}>
			<label>
				Enter Event:
				<input type="text" value={this.state.value} onChange={this.handleChange} />
			</label>
			<input type="submit" value="submit" />
		</form>
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