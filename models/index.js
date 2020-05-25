/* MongoDB Config */
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const config = require('../config')
const { logger } = require('../middlewares/logger')

/* ${config.mongoDB.username}:${config.mongoDB.password}@ */
const MongoDB_URL = `mongodb://${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.database}`

/* Open MongoDB Connection */
mongoose.set('useCreateIndex', true) /* solve problem: Use createIndexes instead. */
const mongodb =mongoose.createConnection(MongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

/* Listen to MongoDB Error Events */
mongodb.on('error', (err) => { logger.info(new Error(err)) })

/* Listen to MongoDB Open Events only once */
mongodb.once('open', () => { logger.info(`MongoDB ${config.mongoDB.database} Connecting successfully.`) })

/* MongoDB Object */
const db = {
  mongoose: mongoose,
  mongodb: mongodb,
  models: {},
  getModel (name) {
    return this.models[name]
  }
}

/* Schema Format: { name: 'model_name', schema: { username: String, age: Number, ... }, indexs: [ {username: 1} ] } */
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file)) /* Model Object */
    const schema = new mongoose.Schema(model.schema) /* Schema Object */
    model.indexs.forEach(item => { schema.index(item) }) /* create index */
    db.models[model.name] = mongodb.model(model.name, schema, model.name) /* Declare Collection */
  })

module.exports = db
