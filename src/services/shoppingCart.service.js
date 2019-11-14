class ShoppingCart {
  constructor() {
    this.cartElements = [];
  }

  addNewPizza(pizza) {
    const newPizza = new Pizza(pizza);
    this._isTheSamePizzaInTheCart(newPizza)
      ? this._sumPizzaToCart(newPizza)
      : this._addNewPizzaToCart(newPizza);
  }

  _addNewPizzaToCart(newPizza) {
    this.cartElements = [
      ...this.cartElements,
      {
        pizza: newPizza,
        cuantity: 1
      }
    ];
  }

  _sumPizzaToCart(newPizza) {
    this.cartElements = this.cartElements.map(element => {
      if (element.pizza.name === newPizza.name) {
        element.cuantity++;
        element.pizza.price = newPizza.price * element.cuantity;
      }
      return element;
    });
  }

  _isTheSamePizzaInTheCart(newPizza) {
    return this.cartElements.some(({ pizza }) => pizza.name === newPizza.name);
  }

  removePizza(pizzaName) {
    const cartElement = this._findCartElement(pizzaName);
    cartElement.cuantity === 1
      ? this._removeCartItem(pizzaName)
      : this._substractCartItem(cartElement.pizza);
  }

  _substractCartItem(pizzaToSubstract) {
    this.cartElements = this.cartElements.map(element => {
      if (element.pizza.name === pizzaToSubstract.name) {
        element.pizza.price -= pizzaToSubstract.price / element.cuantity;
        element.cuantity--;
      }
      return element;
    });
  }

  _removeCartItem(pizzaName) {
    this.cartElements = this.cartElements.filter(
      ({ pizza }) => pizza.name !== pizzaName
    );
  }

  _findCartElement(pizzaName) {
    return this.cartElements.find(({ pizza }) => pizza.name === pizzaName);
  }

  getCartElements() {
    return this.cartElements;
  }
}
