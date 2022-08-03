const fs = require("fs");

class Container {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save = async (obj) => {
    try {
      let data = await fs.promises.readFile(
        `./resources/${this.fileName}`,
        "utf-8"
      );

      if (data.length == 0) {
        obj.id = 1;

        // creo un array primero para crear un json en products.txt.
        await fs.promises.writeFile(
          `./resources/${this.fileName}`,
          JSON.stringify(new Array(obj))
        );

        return obj;
      } else {
        let fileContent = JSON.parse(data);

        // traigo el maximo id del array de objetos.
        let maxId = fileContent.reduce((prev, curr) =>
          prev.id > curr.id ? prev : curr
        );

        // le asigno un nuevo id al nuevo objeto.
        obj.id = Number(maxId.id) + 1;
        // pusheo el nuevo objeto al array de objetos, ahora este con el nuevo maximo id.
        fileContent.push(obj);

        await fs.promises.writeFile(
          `./resources/${this.fileName}`,
          JSON.stringify(fileContent)
        );

        return obj;
      }
    } catch (err) {
       console.log(err);
    }
  };

      //creo la funcion para traer todos los productos
  getAll = async () => {
    try {
      let data = await fs.promises.readFile(
        `./resources/${this.fileName}`,
        "utf-8"
      );

      return JSON.parse(data);
    } catch (err) {
       console.log(err);
    }
  };

  

  
}

module.exports = Container;