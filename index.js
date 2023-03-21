import express from 'express'
import path from 'path'
import mongoose, { Schema } from 'mongoose'
const port = 3005
const app = express()

const users = []

//Create a database named "mydb":
mongoose
  .connect('mongodb://127.0.0.1:27017/backened', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('database connected'))
  .catch(e => console.log(e))

//making the schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  passward: String
})

const Message = mongoose.model('Message', messageSchema);

app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/add', async(req, res) => {
 await Message.create({ name: 'aloktamrakargf', email: 'aloktamrakar2@gmail.com',mobile:'9644905810',passward:'aloktam' });
    res.send('nemc')
  });
 


app.get('/', (req, res) => {
  res.render('index')
})
app.get('/success', (req, res) => {
  res.render('success')
})
app.get('/service', (req, res) => {
  res.sendFile(__dirname + '/service.html')
})
app.post('/contact',  async(req, res) => {
  const messageData=({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.number,
    passward: req.body.passward
  }) 
  await Message.create(messageData);
  console.log(messageData)
  users.push(messageData)
  res.redirect('/success')
})
app.get('/users', (req, res) => {
  res.json({
    users,
  })
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})











