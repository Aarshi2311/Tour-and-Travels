function logger(req , res , next){
    const time = new Date().toLocaleString();

    console.log(
        `[${time}] ${req.method} request received at ${req.url}`
    );

    next();
}

module.exports = logger;