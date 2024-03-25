const pool = require("../db");
const queries = require("./queries");

const getEventsByDate = async (req, res) => {
  const date = req.params.date;
  const userLat = req.params.lat;
  const userLong = req.params.long;

  const page = parseInt(req.params.page);

  try {
    function addDaysToDate(dateString, daysToAdd) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + daysToAdd);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    const initialDate = date;
    const newDate = addDaysToDate(initialDate, 14);

    const events = await pool.query(queries.getEventsByDate, [date, newDate]);

    const enhancedEvents = await Promise.all(
      events.rows.map(async (event) => {
        const weatherResponse = await fetch(
          ` https://github.com/AmanSharma202/eventFinder-API/security/secret-scanning/unblock-secret/2e9EXFvgK2LRR0S7OVhK2KNEINV`
        );
        const weatherRes = await weatherResponse.json();

        const distanceResponse = await fetch(
          ` https://github.com/AmanSharma202/eventFinder-API/security/secret-scanning/unblock-secret/2e9EXFvgK2LRR0S7OVhK2KNEINV`
        );
        const distanceRes = await distanceResponse.json();

        return {
          event_name: event.event_name,
          city_name: event.city_name,
          date: event.date_info,
          weather: weatherRes.weather,
          distance: distanceRes.distance,
        };
      })
    );

    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;

    const eventSlice = enhancedEvents.slice(startIndex, endIndex);

    if (page) res.status(200).json(eventSlice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const postAllEvents = async function (req, res) {
  const { event_name, city_name, date_info, time_info, latitude, longitude } =
    req.body;

  try {
    const result = await pool.query(
      "INSERT INTO events (event_name, city_name, date, time, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [event_name, city_name, date_info, time_info, latitude, longitude]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the event" });
  }
};

module.exports = {
  getEventsByDate,
  postAllEvents,
};
