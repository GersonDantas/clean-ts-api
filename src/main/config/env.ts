export default {
  mongoUrl: global.__MONGO_URI__ || 'mongodb://localhost:27017/clean-node-api',
  port: global.PORT || '5050'
}
