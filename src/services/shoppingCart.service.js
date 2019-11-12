class ShoppingCart {
  constructor() {
    this.cartElements = [];
  }

  addNewPizza(name, price) {
    const newPizza = new Pizza(name, price);
    if (this._isTheSamePizzaInTheCart(newPizza)) {
      this.cartElements = this.cartElements.map(element => {
        if (element.pizza.name === name) {
          element.cuantity++;
          element.pizza.price = newPizza.price * element.cuantity;
        }
        return element;
      });
    } else {
      this.cartElements = [
        ...this.cartElements,
        { pizza: newPizza, cuantity: 1 }
      ];
    }
    return this.cartElements;
  }

  _isTheSamePizzaInTheCart(newPizza) {
    return this.cartElements.some(({ pizza }) => pizza.name === newPizza.name);
  }
}
