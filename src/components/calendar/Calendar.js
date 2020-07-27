import React from 'react';
import { getCurrentWeek } from '../../../src/utils'
import Card from '../card/card';
import InfoModal from '../modal/modal';
import './style.scss';
import { connect } from "react-redux";
import { addEvent,deleteEvent } from '../../store/actions/calendar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.time = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7: 00 PM','8:00 PM'];
    this.state = {
      card_showing: null,
      event_text: ''
    }
  }

  handleTextChange = (e) => {
    this.setState({event_text: e.target.value});
  }

  cardClicked = (card_id) => {
    const event_name = this.props.events[card_id] ? this.props.events[card_id].name : '';    

    this.setState({ card_showing: card_id });
    this.setState({ event_text: event_name});
  }

  addingEvent = (event_name) => {
    this.props.addEvent(this.state.card_showing,{
      name: event_name,
      ...JSON.parse(this.state.card_showing)
    });
  }

  deletingEvent = (event_id) => {
    this.props.deleteEvent(event_id);
  }

  showCurrentWeek(curr_week) {
    return(
      curr_week.map((cw,i) => (
        <div className="d-flex align-items-center justify-content-center flex-column">
            <div className="d-flex align-items-center justify-content-center">
              {!i ? <div className="pr-4" style={{visibility:'hidden'}}>{'8:00 AM'}</div> : null}

              <div>
                <div className="text-center week_day" key={`week_${i}`}>
                  {cw.day}
                </div>
                <div className="text-center date" key={`date_${i}`}>
                  {cw.date}
                </div>
              </div>
            </div>

            {this.time.map(time => (
              <div className="d-flex align-items-center justify-content-center mt-4">
                {!i ? <div className="pr-4"><b>{time}</b></div> : null}
                <Card time={time} id={`${JSON.stringify({ ...cw,time })}`} cardClicked={this.cardClicked} />
              </div>
            ))}

        </div>
      ))
    );
  }

  render() {
    const current_week = getCurrentWeek();
    const { events } = this.props;
    
    return(
      <React.Fragment>
        <div className="calendar">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-center">
              {this.showCurrentWeek(current_week)}
            </div>
          </div>
        </div>
        <InfoModal 
          card_showing={this.state.card_showing}
          events={events}
          addingEvent={this.addingEvent}
          deletingEvent={this.deletingEvent}
          handleTextChange={this.handleTextChange}
          event_text={this.state.event_text}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state =>
  ({
    events: state.CalendarReducer.events,
    error: state.CalendarReducer.error
  })

const mapDispatchToProps = dispatch =>
  ({
    addEvent: (event_id,event) => dispatch(addEvent(event_id,event)),
    deleteEvent: (event_id) => dispatch(deleteEvent(event_id))
  })

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);