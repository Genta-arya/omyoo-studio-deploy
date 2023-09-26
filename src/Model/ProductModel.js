// ProductModel.js
class ProductModel {
    constructor(id, title, description, price, imageUrl, features) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
      this.features = features || [];
    }
  }
  
  export default ProductModel;
  