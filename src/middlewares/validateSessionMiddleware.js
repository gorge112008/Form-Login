const validateSession = async (req, res, next) => {
if (req.session.counter) {
    return next();
}else{
    return res.status(200).render("redirection", {isLogin: true});
}
};

export default validateSession;
