const dht11 = require('./dht11');
const device = require('./device');
const historyAction = require('./historyAction');
const user = require('./user')
const routes = (app) => {
  app.use('/api/data', dht11)
  app.use('/api/data', device)
  app.use('/api/data', historyAction)
  app.use('/api/data',user )
}
module.exports = routes