
module.exports = function setupRoutes(app) {
  app.get('/', (req, res) => { res.render('homepage.html'); });
  // app.get('/*', (req, res) => { res.render('404.html'); });
};
