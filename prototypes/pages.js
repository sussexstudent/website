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
    template: 'events-level2.html',
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

const news = [
  {
    title: 'Be part of designing the new Students’ Union building',
    desc: 'We are getting a new Students’ Union building on campus and need your help in designing it! Share your ideas and suggestions on what you want to see in the new buidling.',
    image: 'https://www.goldsmithssu.org/asset/News/6013/14556676_1780002735589659_9031388599201121360_o.jpg?thumbnail_width=600&thumbnail_height=300&resize_type=CropToFit'
  },
  {
    title: 'Academic Cost Hardship Fund',
    desc: "Students' Union Education Officers have allocated funding to help to support students who are struggling to cover costs such as printing, textbooks, dissertation binding and academic trips.",
    image: 'https://www.sussexstudent.com/asset/News/6166/980082_1050057988373951_4820204357273492473_o.jpg?thumbnail_width=200&thumbnail_height=160&resize_type=CropToFit'
  },
  {
    title: 'Statement on Sussex UCU and Sussex Students’ Union Current Industrial Action',
    desc: 'This statement calls on the University of Sussex to reallocate all strike monies from the three days of strike action at Sussex last spring, to be deducted from employees wages to the Student Hardship Funds.',
    image: 'https://www.sussexstudent.com/asset/News/6667/uk.jpg?thumbnail_width=200&thumbnail_height=160&resize_type=CropToFit'
  },
  {
    title: 'Rent Smart Brighton and Hove',
    desc: 'The partnership is made up of a group of organisations that are working together to provide information on renting in Brighton & Hove and signposts tenants to helpful sources.',
    image: 'https://www.sussexstudent.com/asset/News/6634/photo-1429866900350-3db79b5beca2.jpeg?thumbnail_width=200&thumbnail_height=160&resize_type=Force'
  },
];

module.exports = function setupRoutes(app) {
  app.locals.menu = [
    menuItem('Get involved', '/get-involved'),
    menuItem('What\'s on', '/whats-on'),
    menuItem('About us', '/about-us'),
    menuItem('Support', '/support'),
  ];

  app.get('/', (req, res) => { res.render('homepage.html', { news_items: news}); });
  app.get('/get-involved/societies-sports', (req, res) => { res.render('soc-listings.html'); });


  pages.forEach((data) => {
    app.get(data.path, (req, res) => {
      res.render(Object.hasOwnProperty.call(data, 'template') ? data.template : 'level2.html', { page: data });
    });
  });
  // app.use((req, res) => { res.render('404.html'); });
};
