
module.exports = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;

    if(err.code == '11000'){
        err.statusCode = 400;
        for (let p in err.keyValue) {
            err.message = `${p} already exist`
        }
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}