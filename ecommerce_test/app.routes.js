const path = require("path")

const apiRoutes = require("./api")
const useRoutes = function (app){
    app.use('/api/user',apiRoutes.userRouter)
}

module.exports  = {
    useRoutes:useRoutes
}