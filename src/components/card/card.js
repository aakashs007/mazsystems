import React from 'react';
import './style.scss';
import { connect } from "react-redux";
import { addEvent,deleteEvent } from '../../store/actions/calendar';

let my_dragging_id = null;
let my_dropping_id = null;

class card extends React.Component {
  constructor(props) {
    super(props);
  }

  updateBoxValues = () => {
    if(!my_dragging_id || !my_dropping_id) return;
    const { events } = this.props;

    if(events[my_dragging_id] && !events[my_dropping_id]) {
      this.props.addEvent(my_dropping_id,{
        ...events[my_dragging_id]
      });

      this.props.deleteEvent(my_dragging_id);

      my_dragging_id = null;
      my_dropping_id = null;
    } else {
      alert('Not possible!');
    }
  }

  dragEnd(e) {
    // console.log('drag End',e.target.id,my_dropping_id);
    my_dragging_id = e.target.id;
    this.updateBoxValues();
  }

  whenDropped(e) {
    e.preventDefault();
    my_dropping_id = e.target.id;
    // console.log('dropped',my_dropping_id);
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragStart(e) {
    // my_dragging_id = e.target.id;
    // console.log('drag start',my_dragging_id);
  }

  render() {
    const { events,id,time } = this.props;

    const card_class = (events[id]) ? 'card_custom_select' : 'card_custom';
    const card_values = (events[id]) ? events[id] : {};

    return (
      <div
        onDrop={(e) => this.whenDropped(e)}
        onDragOver={(e) => this.dragOver(e)}
      >
        <div className={`card ${card_class} ml-2 mr-2 mt-2`}
          // onDragStart={(e) => this.dragStart(e)}
          // onDrag={this.dragging}
          onDragEnd={(e) => this.dragEnd(e)}
          draggable="true"
          id={this.props.id}
          data-toggle="modal" data-target="#info_modal"
          onClick={() => this.props.cardClicked(id)}
        >
          <div className="card-body" id={id}>
            <h5 className="card-title" id={id}>{time || '0:00'}</h5>
            <h6 className="card-subtitle mb-2" id={id}>{card_values.name || 'Blocked'}</h6>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(card);