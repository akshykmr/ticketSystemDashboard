const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name:{
      type:String , unique :true, required: true,
    },
},{ timestamps: true })
const Category = mongoose.model('category', categorySchema);

const createDefaultCategories = async()=>{
 const categories = ['EconomyClass', 'BusinessClass', 'firstClass'];
 for (let categoryName of categories) {
    const isExist = await Category.findOne({name: categoryName});
    if (!isExist) {
      let obj = {
        name: categoryName,
      };
      await Category.create(obj);
      console.log(`${categoryName} category created successfully.`);
    } 
 }
}
createDefaultCategories();
module.exports = Category;
