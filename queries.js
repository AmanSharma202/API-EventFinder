const getEventsByDate =
  "SELECT * FROM eventdetails WHERE date_info BETWEEN $1 AND $2 ORDER BY date_info ASC";

module.exports = {
  getEventsByDate,
};
