
/* Not need to deal cors request list */
const NotCorsList = []

/* Deal Cors middleware */
const corsHandler = {
  origin: ctx => {
    const bool = NotCorsList.some(item => { ctx.url === item})
    if (bool) { return false }
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-type', 'Authorization', 'Accept']
}

module.exports = { corsHandler }
