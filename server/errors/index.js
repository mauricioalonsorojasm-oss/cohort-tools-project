function handlingError(app) {
  app.use((req, res) => {
    res.status(404).json({ errorMessage: 'Route not found' });
  });
  app.use((error, req, res, next) => {
    res.status(500).json({ errorMessage: 'Server not reachable' });
  });
}
module.exports = handlingError;
