import request from "request";

export const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8625cc37d51db845009c03c7541a3550&query=${lat},${long}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the service...", undefined);
    } else if (body.error) {
      callback("Unable to find location...", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}°C out. Percipitation is ${body.current.precip}mm. Humidity is ${body.current.humidity}%. Wind speed is ${body.current.wind_speed}kmph.`
      );
    }
  });
};
