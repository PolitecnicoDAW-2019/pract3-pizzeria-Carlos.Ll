class Controller {
  constructor(view, shoppingCart, pizzaShopService) {
    this.view = view;
    this.shoppingCart = shoppingCart;
    this.pizzaShopService = pizzaShopService;
    pizzaShopService.loadDefaultPizzasJSON().then(() => {
      this.view.bindLoadDefaultPizzas(this.handlerLoadDefaultPizzas);
      this.view.bindAddDefaultPizzaToShoppingCart(
        this.handlerAddDefaultPizzaToShoppingCart,
        this.handlerRemoveItemFromShoppingCart
      );
    });
  }

  handlerLoadDefaultPizzas = () => {
    return this.pizzaShopService.getDefaultPizzas();
  };

  handlerAddDefaultPizzaToShoppingCart = (name, price) => {
    this.shoppingCart.addNewPizza(name, price);
    return this.shoppingCart.getCartElements();
  };

  handlerRemoveItemFromShoppingCart = pizzaName => {
    this.shoppingCart.removePizza(pizzaName);
    return this.shoppingCart.getCartElements();
  };
}
