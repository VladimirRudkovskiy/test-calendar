import React from 'react';
import moment from 'moment';
import './calendar.css';

export default class Calendar extends React.Component {
	state = {
		dateContext: moment(),
		today: moment(),
		showMonthPopup: false
	}
	
	constructor(props) {
		super(props);
		this.width = props.width || "350px";
		this.style = props.style || {};
		this.style.width = this.width;

	}

	weekdays = moment.weekdays(); // названия дней
	weekdaysShort = moment.weekdaysShort(); // короткие названия для календаря
	months = moment.months(); // месяца

	//функции из moment библиотеки (momentjs.com), которые будут возвращать дату
	year = () => {
		return this.state.dateContext.format("Y");
	}
	month = () => {
		return this.state.dateContext.format("MMMM");
	}
	daysInMonth = () => {
		return this.state.dateContext.daysInMonth();
	}
	currentDate = () => {
		return this.state.dateContext.get("date");
	}
	currentDay = () => {
		return this.state.dateContext.format("D");
	}
	firstDayOfMonth = () => {
		let dateContext = this.state.dateContext;
		let firstDay = moment(dateContext).startOf('month').format("d"); //дни недели 0..1..5..6
		return firstDay;
	}

	setMonth = (month) => {
		let monthNo = this.months.indexOf(month);
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set("month", monthNo);
		this.setState({
			dateContext:dateContext
		});
	}

	nextMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext); 
    dateContext = moment(dateContext).add(1, 'month'); // прибавляем 1 месяц
    this.setState({ 
      dateContext: dateContext
    });
    this.props.onNextMonth && this.props.onNextMonth();
	}

	prevMonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, 'month');
    this.setState({
      dateContext: dateContext
    });
    this.props.onPrevMonth && this.props.onPrevMonth();
	}

	onSelectChange = (e, data) => { // меняет на выбранный из списка месяц при помощи SetMonth
		this.setMonth(data);
		this.props.onMonthChange && this.props.onMonthChange();

	}

	SelectList = (props) => { //окно,Ю которое выводит на экран список менсяцев
		let popup = props.data.map((data) => {
			return (
				<div key={data}>
					<a href="#" onClick={(e) => {this.onSelectChange(e, data)}}> 
						{data}
					</a>
				</div>
			);
		});
		return (
			<div className="month-popup">
				{popup}
			</div>
		)
	}

	onChangeMonth = (e, month) => {
		this.setState({
			showMonthPopup: !this.state.showMonthPopup // меняем state для того, что бы по дефолту окно было закрыто
		})
	}

	MonthNav = () => { //с помощью SelectList выводит на экран список месяцев при нажатии
		return (
			<span className="label-month"
				onClick={(e) => {this.onChangeMonth(e, this.month())}}> 
				{this.month()}
				{this.state.showMonthPopup &&
				<this.SelectList data={this.months} /> //список месяцев
				}
			</span>
		);
	}
	YearNav = () => { //выводит на экран текущий год
		return (
			<span className="label-year">
				{this.year()}
			</span>
		)
	}
 
	onDayClick = (e, day) => {
		this.props.onDayClick && this.props.onDayClick(e, day);
	}
	
	render() {
		// просмотрит все дни как ячейки <td>
		// для каждого дня создаем td с ключем day
		let weekdays = this.weekdaysShort.map((day) => {
			return (
				<td key={day} className="week-day">{day}</td>
			)
		});

		// просматриваем все начала месяцев и создаем список пустых ячеек для каждого месяца
		let blanks = [];
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanks.push(<td key={i * 80} className="emptySlot">
				{""}
			</td>
			);
		}
		console.log('blanks', blanks); // выведем пустые ячейки в консоль

		//
		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++) { // просмотрим все дни
			let className = (d === this.currentDate() ? "day current-day": "day");
			daysInMonth.push( //// создаем строку из дней при помощи daysInMonth.push
				<td key={d} className={className} >
					<span onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span> 
				</td>
			);
		}
		console.log("days: ", daysInMonth);

		var totalSlots = [...blanks, ...daysInMonth]; //создаем масив из пустых ячеек и дней в месяце
		let rows = []; // строки
		let cells = []; // ячейки

		totalSlots.forEach((row, i) => { // применяем для каждой строки с индексом
			// делаем так, что бы в строке было 7 чисел при помощи остатка при делении на 7
			if((i % 7) !== 0) {
				cells.push(row);
			} else { //если i % 7 = 0 создаем новую строку из дней
				let insertRow = cells.slice();
				rows.push(insertRow);
				cells = []; //переустонавливаем cells  в пустые ячейки
				cells.push(row); 
			}
			if(i === totalSlots.length -1) { // для отображения последней строки 
				let insertRow = cells.slice();
				rows.push(insertRow);
			}
		});

		let trElems = rows.map((d, i) => {
			return (
				<tr key={i*100}>
					{d}
				</tr>
			);
		})

		return(
			<div className="calendar-container" style={this.style}>
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
						<td colspan="1" className="label-month">
								<i className="fas fa-chevron-left"
									onClick = {(e) => {this.prevMonth()}}>
								</i>
						</td>
							<td colspan="5">
								<this.MonthNav/>
								{" "}
								<this.YearNav/>
							</td>
							<td colspan="1" className="label-month">
								<i className = "fas fa-chevron-right"
                  onClick = {(e) => {this.nextMonth()}}>
                </i>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
						{weekdays}
						</tr>
						{trElems}
					</tbody>
				</table>
			</div>
		)
	}
}