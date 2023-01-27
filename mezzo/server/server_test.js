const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/';

mongoose.set('strictQuery', true);


;(async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${url}`)
  } catch (err) {
    console.error(err)
  }
})()