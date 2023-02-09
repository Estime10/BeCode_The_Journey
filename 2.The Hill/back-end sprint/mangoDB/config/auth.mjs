const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "PLEASE LOG IN FIRST");
    res.redirect("/login");
  };
  
export default ensureAuthenticated
  