import express, { response } from "express";
import "dotenv/config";
import { DataTypes, Sequelize } from "sequelize"

const app = express();
const port = process.env.PORT as string;
const db = process.env.DATABASE as string;
const username = process.env.USERNAME as string;
const pass = process.env.PASSWORD as string;

const mySequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
})
const creertache = mySequelize.define("nouvelletache", {
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    timestamps: false,
  })
  console.log(creertache === mySequelize.models.nouvelletache)
 creertache.sync()
  
  //  veririfier la connexion à la BDD
async function auth(){
    try {
        await mySequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
// auth()

app.get("/", (_, res) => { 
  res.send("hello");        
});  

app.get("/hello", (_, res) => { 
    res.send("hello");        
});  

app.get("/afflistetaches", async (_, res) => {
  const maListeDeTache =  await creertache.findAll();
  res.send(maListeDeTache);
});

app.post("/add/:nomtache", async (req, res) => {
  creertache.create({name : req.params.nomtache, status : false})
  res.sendStatus(200);
});

app.get("/todos", async (req, res) =>{
  const todos = await creertache.findAll();
  console.log(JSON.stringify(todos))
  res.status(200).send(JSON.stringify(todos))
})
app.listen( port,  () =>   console.log(`Server is listening on port ${port}`) );