import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import hbs from "hbs";
import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Vödör",
    name: "Mate Mihaly",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mate Mihaly",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "You must provide a valid address...",
    });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "You must provide a search term!",
    });

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mate Mihaly",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
