class PizzaShopService {
  loadDefaultPizzasJSON() {
    return fetch('../data/pizzas.json')
      .then(rawPizzas => rawPizzas.json())
      .then(pizzas => (this.pizzas = pizzas));
  }

  loadIngredientsJSON() {
    return fetch('../data/ingredients.json')
      .then(rawIngredients => rawIngredients.json())
      .then(ingredients => (this.ingredients = ingredients));
  }

  getDefaultPizzas() {
    return this.pizzas;
  }

  getIngredients() {
    return this.ingredients;
  }
}
