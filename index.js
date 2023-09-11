const express=require('express');
const { ProductModel } = require('./models/Product.model');
const { connection } = require('./Configs/db');
const cors=require('cors');
require('dotenv').config();
const app=express();
app.use(express.json())
app.use(cors({
    origin: "*"
}))


//base URL
app.get('/', (req, res)=>{
    res.send('BASE URL POINT')
})



//post product
app.post('/addData', async(req, res)=>{
    //const {name, description, location, price, image_url, category}=req.body;
    const newProduct=new ProductModel(req.body);
    await newProduct.save();
    res.json({msg:'product added successfully'})
})



//get product
app.get('/getData', async(req,res)=>{
   const{category, sort, page, q}=req.query;
   const filteredData={};
   if(category){
      filteredData.category=category;
   }
   if(q){
    filteredData.name={$regex:q, $option:"i"}
   }
   const skip=(page-1)*4;
   const product=await ProductModel.find(filteredData).sort({date:sort=="asc" ? 1 : -1}).skip(skip).limit(4);
   res.json(product)
})



//update product
app.put('/edit/:id', async(req, res)=>{
    const idx=req.params.id;
    const item=await ProductModel.findOne({_id:idx});
    if(item){
        const product=await ProductModel.findByIdAndUpdate(idx, req.body);
        res.json({msg:"updated successfully"})
    }else{
        res.status(500).json({msg:'product not found'}) 
    }
})



//delete product
app.delete("/remove/:id", async(req, res)=>{
    const idx=req.params.id;
    const item=await ProductModel.findOne({_id:idx});
    if(item){
        const product=await ProductModel.findByIdAndDelete(idx);
        res.json({msg:"deleted successfully", data:product})
    }else{
        res.status(500).json({msg:'product not found'}) 
    }
})



app.listen(process.env.PORT, async()=>{
    try{
        await connection;
        console.log(`listening on port ${process.env.PORT}`)
    }catch(error){
        console.log('Unable to Connect to DB')
    }
})

