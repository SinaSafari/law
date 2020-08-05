const mongoose = require('mongoose')

async function connectDB() {
    try {
        mongoose.connect("mongodb://localhost:27017/law",{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        }, (err)=> {
            if (err) {
                console.log(`❌ there's something wrong with database connection: ${err}`)
                return
            }
        })
        console.log(`✅ DB Connected`)
    } catch (err) {
        console.log(`❌ there's something wrong with database connection`)
    }
}

module.exports = connectDB