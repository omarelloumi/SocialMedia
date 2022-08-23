const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const postRoutes = require('./routes/postRoute');

const app = express();

app.use(bodyParser.json({ limit : "30mb" , extended : true}));
app.use(bodyParser.urlencoded({ limit : "30mb" , extended : true}));
app.use(cors());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000 ;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true , useUnifiedTopology : true})
.then(() => {
    app.listen(PORT, () => {
    console.log("Server is running on port "+PORT);
    }
    )
}).catch(err => {
    console.log("Error: ", err.message);
}
);