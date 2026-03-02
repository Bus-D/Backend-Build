const homePage = (req, res) => {
    res.render('home', {title: 'Bus-D Designs'});
};

const aboutPage = (req, res) => {
    res.render('about', {title: 'About Bus-D Designs'});
};

export { homePage, aboutPage };