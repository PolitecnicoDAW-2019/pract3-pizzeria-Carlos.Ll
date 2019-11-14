class Pizza {
  constructor({ name, price = 0, ingredients = [], size = 'defaultPizza' }) {
    this.name = name;
    this.ingredients = ingredients;
    this.size = size;
    this.price = size === 'defaultPizza' ? price : this._calculatePrice(price);
  }

  _calculatePrice(price) {
    const multiplier = this._getMultiplier(this.size);
    const ingredientsPrice = this.ingredients.reduce((acc, curr) => {
      return acc + curr.basePrice * multiplier;
    }, 0);
    const totalPrice = +price + ingredientsPrice;
    return totalPrice.toFixed(2);
  }

  _getMultiplier(size) {
    const multipliers = {
      Pequeña: 1,
      Mediana: 1.1,
      Grande: 1.2
    };
    return multipliers[size];
  }
}
