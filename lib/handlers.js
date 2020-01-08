const handlers = {};


handlers.notFound = (payload, cb) => {
    cb(404)
}
module.exports = handlers;