const express = require("express");

const productsRoutes = require("./routes/products");
const Container = require("./models/class");
const app = express();

const PORT = process.env.PORT || 8080;

// Traigo la data en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ruta del formulario
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.set('view engine', 'pug');
app.set('views', './views');

// Ruta que usa pug
let container = new Container("products.json"); // Instance created to use products.

app.get("/products", async (req, res) => {
  res.render("index", {
    products: await container.getAll(),
  });
});

// Rutas api
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.on("error", (error) => console.log(`Error: ${error}`));