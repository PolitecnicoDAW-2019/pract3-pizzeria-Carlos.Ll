class Controller {
  constructor(view, shoppingCart, pizzaShopService) {
    this.view = view;
    this.shoppingCart = shoppingCart;
    this.pizzaShopService = pizzaShopService;
    pizzaShopService.loadDefaultPizzasJSON().then(() => {
      this.view.bindLoadDefaultPizzas(this.handlerLoadDefaultPizzas);
      this.view.bindAddDefaultPizzaToShoppingCart(
        this.handlerAddDefaultPizzaToShoppingCart
      );
    });
  }

  handlerLoadDefaultPizzas = () => {
    return this.pizzaShopService.getDefaultPizzas();
  };

  handlerAddDefaultPizzaToShoppingCart = (name, price) => {
    return this.shoppingCart.addNewPizza(name, price);
  };
}
