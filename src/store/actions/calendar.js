export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";

export const addEvent = (event_id,event) => ({
  type: ADD_EVENT,
  payload: { event_id,event }
});

export const deleteEvent = (event_id) => ({
  type: DELETE_EVENT,
  payload: event_id
});

export const updateEvent = (event_id,event) => ({
  type: UPDATE_EVENT,
  payload: { event_id,event }
});
