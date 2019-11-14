class Controller {
  constructor(view, shoppingCart, pizzaShopService) {
    this.view = view;
    this.shoppingCart = shoppingCart;
    this.pizzaShopService = pizzaShopService;
    pizzaShopService.loadDefaultPizzasJSON().then(() => {
      pizzaShopService.loadIngredientsJSON().then(() => {
        this.view.bindLoadDefaultPizzas(this.handlerLoadDefaultPizzas);
        this.view.bindLoadIngredients(this.handlerLoadIngredients);
        this.view.bindAddDefaultPizzaToShoppingCart(
          this.handlerAddPizzaToShoppingCart,
          this.handlerRemoveItemFromShoppingCart
        );
        this.view.bindAddCustomPizzaToShoppingCart(
          this.handlerAddPizzaToShoppingCart,
          this.handlerRemoveItemFromShoppingCart
        );
      });
    });
  }

  handlerLoadDefaultPizzas = () => {
    return this.pizzaShopService.getDefaultPizzas();
  };

  handlerLoadIngredients = () => {
    return this.pizzaShopService.getIngredients();
  };

  handlerAddPizzaToShoppingCart = pizza => {
    this.shoppingCart.addNewPizza(pizza);
    return this.shoppingCart.getCartElements();
  };

  handlerRemoveItemFromShoppingCart = pizzaName => {
    this.shoppingCart.removePizza(pizzaName);
    return this.shoppingCart.getCartElements();
  };
}
