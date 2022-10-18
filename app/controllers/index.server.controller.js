exports.render = function(req, res) {
    // If the user has visited before, log the time and date of last visit of user
    if (req.session.lastVisit) { 
        console.log(`Last Visited: ${ req.session.lastVisit }`); 
     }
  
    req.session.lastVisit = new Date();
     
    // Render index.ejs and pass variables title and description
    res.render('index', {
        title: 'Express App',
        description: 'This is a simple Express app for demonstrating EJS'
    })
}