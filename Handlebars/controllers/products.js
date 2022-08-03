const Container = require("../models/class");
const HttpError = require("../models/http-error");

let container = new Container("products.json");

//creo la funcion para crear la lista de productos
const createProduct = async (req, res, next) => {
  const { title, price, thumbnail } = req.body;
  let newProduct;

  try {
    newProduct = await container.save({ title, price, thumbnail });
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again",
      500
    );

    return next(error);
  }

  res.redirect('/products');
};


exports.createProduct = createProduct;