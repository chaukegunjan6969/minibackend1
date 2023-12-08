const express = require('express');

const app  = express();

const cors  = require('cors')
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./Config/database").connect();
require("./Config/cloudinary").cloudinaryConnect();


const routes = require("./routes/routes");
app.use("/api/v2", routes);

app.listen(PORT , ()=>{
    console.log(`App is running on ${PORT}`);
})

app.get('/', (req,res)=>{
    res.send(`<h1>GUNJAN IS BACK BABY</h1>`)
})