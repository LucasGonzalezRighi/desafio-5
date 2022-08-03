class HttpError extends Error {
    constructor(message, errorCode) {
      super(message); // => se añade el mensaje
      this.code = errorCode;
    }
  }
  
  module.exports = HttpError;