export class Role{
    roleId: number;
    roleName: string;

    constructor(){
        this.roleId = 0;
        this.roleName='';
    }
}

export class Category{
    categoryId: number;
    name: string;

    constructor(){
        this.categoryId = 0;
        this.name ='';
    }
}

export class Product{
    productId: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    imageUrl: string;

    constructor(){
        this.productId = 0;
        this.name = '';
        this.description = '';
        this.price = 0;
        this.categoryId = 0;
        this.imageUrl = '';
    }
}

export class ProductMasters {
  productId: number
  name: string
  categoryId: number
  description: string
  image: string;

  constructor(){
        this.productId = 0;
        this.name = '';
        this.categoryId = 0;
        this.description = '';
        this.image = '';
    }
}

