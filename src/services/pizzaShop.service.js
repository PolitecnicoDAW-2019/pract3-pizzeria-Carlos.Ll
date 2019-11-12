class PizzaShopService {
  loadDefaultPizzasJSON() {
    return fetch('../constants/pizzas.json')
      .then(rawPizzas => rawPizzas.json())
      .then(pizzas => (this.pizzas = pizzas));
  }

  getDefaultPizzas() {
    return this.pizzas;
  }
}
