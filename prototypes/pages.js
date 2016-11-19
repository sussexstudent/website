function menuItem(title, link) {
  return { title, link };
}


const pages = [
  {
    path: '/get-involved',
    title: 'Get involved',
    desc: 'This is not lorem ipsum, but it is just as useless. I have been burnt before using the noverly generators - never again',
    image: 'https://www.goldsmithssu.org/pageassets/activities/Web-ActivitiesHeader.jpg',
  },
  {
    path: '/about-us',
    title: 'About us',
    desc: 'This is not lorem ipsum, but it is just as useless. I have been burnt before using the noverly generators - never again',
    image: 'https://www.goldsmithssu.org/pageassets/democracy/Web-Democracy.jpg',
  },
  {
    path: '/whats-on',
    title: 'What\'s on',
    desc: 'This is not lorem ipsum, but it is just as useless. I have been burnt before using the noverly generators - never again',
    image: 'https://www.goldsmithssu.org/pageassets/democracy/studentassembly/Web-Democracy_Assembly.jpg',
  },
  {
    path: '/support',
    title: 'Support',
    desc: 'This is not lorem ipsum, but it is just as useless. I have been burnt before using the noverly generators - never again',
    image: 'https://www.goldsmithssu.org/pageassets/advice/Web-Advice2.jpg',
  },
];

module.exports = function setupRoutes(app) {
  app.locals.menu = [
    menuItem('Get involved', '/get-involved'),
    menuItem('What\'s on', '/whats-on'),
    menuItem('About us', '/about-us'),
    menuItem('Support', '/support'),
  ];

  app.get('/', (req, res) => { res.render('homepage.html'); });


  pages.forEach((data) => {
    app.get(data.path, (req, res) => {
      res.render('level2.html', { page: data });
    });
  });
  // app.use((req, res) => { res.render('404.html'); });
};
