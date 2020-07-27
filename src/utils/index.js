// Resuable utility function comes here
import moment from 'moment';

export const getCurrentWeek = () => {
  var currentDate = moment();

  var weekStart = currentDate.clone().startOf('isoWeek');
  var weekEnd = currentDate.clone().endOf('isoWeek');

  var days = [];

  for (var i = 0; i <= 6; i++) {
    let weekinfo = moment(weekStart).add(i, 'days');
    days.push({
      month: weekinfo.format("MMMM"),
      date: weekinfo.format('DD'),
      day: weekinfo.format('dddd')
    });
  }

  return days;
}