const express = require("express");

const productsRoutes = require("./routes/products");
const Container = require("./models/class");
const app = express();

const PORT = process.env.PORT || 8080;

// traigo la data en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pongo la ruta para usar el formulario
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.set('view engine', 'ejs');

// Pongo la ruta para usar la plantilla ejs
let container = new Container("products.json"); 

app.get("/products", async (req, res) => {
  res.render("layout/index", {
    products: await container.getAll(),
  });
});

// rutas API
app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.on("error", (error) => console.log(`Error: ${error}`));