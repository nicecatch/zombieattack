module.exports = {
  publicRuntimeConfig: {
    SERVER_ADDRESS: "http://localhost:3000"
  },
  serverRuntimeConfig: {
    db: {
      url: "mongodb://localhost:27017/pltest"
    }
  }
};
