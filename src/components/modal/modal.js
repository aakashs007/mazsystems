import React,{ useState } from 'react';

const InfoModal = (props) => {
  const card_id = JSON.parse(props.card_showing);

  return (
    <div className="modal fade" id="info_modal" tabindex="-1" role="dialog" aria-labelledby="info_modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: '20px' }}>
          <div className="modal-header pb-0" style={{ borderBottom: '0px' }}>
            {/* <h5 className="modal-title" id="info_modalLabel"><b>Event</b></h5> */}
            <button type="button" className="close m-0" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body pt-0 ml-5 mr-5">
            <form>
              <div class="form-group">
                <input style={{fontSize:'2em',fontWeight:'bold'}} type="text" class="form-control" id="event_name" placeholder="Event name" value={`${props.event_text}`} onChange={(e) => props.handleTextChange(e)} />
              </div>

              <div class="form-group">
                <b>
                  { (card_id) ? `${card_id.day}, ${card_id.month} ${card_id.date} at ${card_id.time}` : null }
                </b>
              </div>
            </form>

            <div className="d-flex justify-content-around mt-5">
              <button type="button" class="btn btn-warning btn-lg" style={{color:'white',background:'#f5ca5f',borderRadius:'10px'}} data-dismiss="modal" aria-label="Close"
                onClick={() => props.addingEvent(document.getElementById('event_name').value)}
              >
                <i className="fas fa-calendar mr-2"></i>
                Reschedule
              </button>

              <button type="button" class="btn btn-danger btn-lg" style={{color:'white',background:'#fa4141',borderRadius:'10px'}} data-dismiss="modal" aria-label="Close"
                onClick={() => props.deletingEvent(JSON.stringify(card_id))}
              >
                <i className="fas fa-times mr-2"></i>
                Cancel
              </button>
            </div>

          </div>
          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;