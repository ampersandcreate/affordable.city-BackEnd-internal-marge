exports.allowOnly = (accessLevel, callback) => {
    const checkUserRole = (req, res) => {
        if (!(accessLevel & req.user.role)) { // eslint-disable-line
            res.sendStatus(403);
            return;
        }
        callback(req, res);
    };

    return checkUserRole;
};