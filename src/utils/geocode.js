import request from "request";

export const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWF0ZW1paGFseSIsImEiOiJja2d1ejQ2eDQwdDRtMnBuYXVhYnNydDZuIn0.cVYHP6gv7GwN1tPBnujemA`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services...", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Please try another one.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
