const handleMongooseSchemaErr = (error, data, next) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  erorr.status = status;
  next();
};

module.exports = handleMongooseSchemaErr;
