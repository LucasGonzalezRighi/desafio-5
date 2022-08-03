const express = require("express");
const exphbs = require("express-handlebars");

const productsRoutes = require("./routes/products");
const Container = require("./models/class");
const app = express();

const PORT = process.env.PORT || 8080;

// traigo la data en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handlebars
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/handlebars/layout",
  partialsDir: __dirname + "/views/handlebars/partials",
  extname: ".hbs",
});

// ruta del formulario
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// ruta que usa handlebars
let container = new Container("products.json"); // Instance created to use products.

app.get("/products", async (req, res) => {
  res.render("handlebars", {
    products: await container.getAll(),
  });
});

// rutas api
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.on("error", (error) => console.log(`Error: ${error}`));