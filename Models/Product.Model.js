const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
   name:{type:String, require:true},
   description:{type:String, require:true},
   category:{type:String, require:true},
   image_url:{type:String, require:true},
   location:{type:String, require:true},
   date:{type:String, require:true},
   price:{type:Number, require:true}
})

const ProductModel=mongoose.model('product', productSchema)

module.exports={ProductModel}

