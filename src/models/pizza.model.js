class Pizza {
  constructor(name, price = 0, ingredients = [], size = 'defaultPizza') {
    this.name = name;
    this.ingredients = ingredients;
    this.size = size;
    this.price = price;
  }
}
