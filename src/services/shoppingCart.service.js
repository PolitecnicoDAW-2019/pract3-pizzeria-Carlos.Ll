class ShoppingCart {
  constructor() {
    this.cartElements = [];
  }

  addNewPizza(name, price) {
    //TODO REFACTOR
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
        {
          pizza: newPizza,
          cuantity: 1
        }
      ];
    }
  }

  _isTheSamePizzaInTheCart(newPizza) {
    return this.cartElements.some(({ pizza }) => pizza.name === newPizza.name);
  }

  removePizza(pizzaName) {
    //TODO REFACTOR
    const cartElement = this._findCartElement(pizzaName);
    const pizzaPrice = cartElement.pizza.price;
    if (cartElement.cuantity === 1) {
      this.cartElements = this.cartElements.filter(
        ({ pizza }) => pizza.name !== pizzaName
      );
    } else {
      this.cartElements = this.cartElements.map(element => {
        if (element.pizza.name === pizzaName) {
          element.pizza.price -= pizzaPrice / element.cuantity;
          element.cuantity--;
        }
        return element;
      });
    }
  }

  _findCartElement(pizzaName) {
    return this.cartElements.find(({ pizza }) => pizza.name === pizzaName);
  }

  getCartElements() {
    return this.cartElements;
  }
}
