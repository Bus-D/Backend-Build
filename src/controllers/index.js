const homePage = (req, res) => {
    const user = req.session.user;
    res.render('home', {title: 'Bus-D Designs', user});
};

const aboutPage = (req, res) => {
    res.render('about', {title: 'About Bus-D Designs'});
};

export { homePage, aboutPage };