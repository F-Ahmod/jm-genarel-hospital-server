const express=require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app=express();
const ObjectId=require('mongodb').ObjectId;
const port=process.env.PORT || 5000 
const cors =require('cors')
// medilware
app.use(cors());
app.use(express.json());



// cannect uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n0kiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run (){
    try {
        await client.connect();
        const database = client.db('m-hospital');
        const finddoctorCallection = database.collection('finddoctor');
        const servicedoctorCallection = database.collection('service');
       
        

        // get api

        app.get('/service',async(req,res)=>{
            const cursor=servicedoctorCallection.find({});
            const user=await cursor.toArray();
          
            res.send(user)
            
        });


        app.get('/finddoctor',async(req,res)=>{
            const cursor=finddoctorCallection.find({});
            const user=await cursor.toArray();
          
            res.send(user)
            
        });

     }

    finally{
         // await client.close();
    }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('runing server 5000')
});
app.listen(port,()=>{
    console.log('live server',port);
})