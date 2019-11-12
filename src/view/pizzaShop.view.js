class View {
  constructor() {
    this.GUI = {
      defaultPizzasContainer: window.document.getElementById(
        'defaultPizzasContainer'
      ),
      buttonAddDefaultPizzaToShoppingCart: window.document.getElementById(
        'buttonAddDefaultPizzaToShoppingCart'
      ),
      shoppingCartContainer: window.document.getElementById(
        'shoppingCartContainer'
      ),
      totalPriceContainer: window.document.getElementById('totalPrice')
    };
  }

  bindLoadDefaultPizzas(handler) {
    const defaultPizzas = handler();
    for (const pizza of defaultPizzas) {
      this._printDefaultPizza(pizza);
    }
  }

  _printDefaultPizza({ name, prices, urlImage }) {
    const pizzaContainer = window.document.createElement('div');
    pizzaContainer.setAttribute('class', 'col m-1');
    const pizzaNameLabel = window.document.createElement('h4');
    pizzaNameLabel.setAttribute('class', 'text-center');
    const pizzaNameText = window.document.createTextNode(name);
    pizzaNameLabel.appendChild(pizzaNameText);
    const rowImage = window.document.createElement('div');
    rowImage.setAttribute('class', 'row justify-content-center');
    const pizzaImage = window.document.createElement('img');
    pizzaImage.setAttribute('src', urlImage);
    pizzaImage.setAttribute('class', 'img-thumbnail rounded-circle border-0');
    rowImage.appendChild(pizzaImage);

    pizzaContainer.appendChild(pizzaNameLabel);
    pizzaContainer.appendChild(rowImage);
    const rowPrices = window.document.createElement('div');
    rowPrices.setAttribute('class', 'row justify-content-center');
    for (const price in prices) {
      const pricesContainer = window.document.createElement('div');
      pricesContainer.setAttribute(
        'class',
        'custom-control custom-radio custom-control-inline'
      );
      const priceLabel = window.document.createElement('label');
      priceLabel.setAttribute('for', name + price);
      const priceLabelText = window.document.createTextNode(price);
      priceLabel.appendChild(priceLabelText);
      priceLabel.setAttribute('class', 'custom-control-label');
      const priceValue = window.document.createElement('span');
      const priceValueText = window.document.createTextNode(
        `(${prices[price]}€)`
      );
      priceValue.appendChild(priceValueText);
      const priceRadioButton = window.document.createElement('input');
      priceRadioButton.setAttribute('id', name + price);
      priceRadioButton.setAttribute('value', prices[price]);
      priceRadioButton.setAttribute('name', 'radioDefaultPizza');
      priceRadioButton.setAttribute('type', 'radio');
      priceRadioButton.setAttribute('class', 'custom-control-input');
      pricesContainer.appendChild(priceRadioButton);
      pricesContainer.appendChild(priceLabel);
      pricesContainer.appendChild(priceValue);
      rowPrices.appendChild(pricesContainer);
      pizzaContainer.appendChild(rowPrices);
    }
    this.GUI.defaultPizzasContainer.appendChild(pizzaContainer);
  }

  bindAddDefaultPizzaToShoppingCart(handler) {
    this.GUI.buttonAddDefaultPizzaToShoppingCart.addEventListener(
      'click',
      () => {
        const selectedRadio = window.document.querySelector(
          'input[name=radioDefaultPizza]:checked'
        );
        const priceValue = selectedRadio.value;
        const name = selectedRadio.id;
        const cartElements = handler(name, priceValue);
        console.log(cartElements);
        this._printPizzaInCart(cartElements);
      }
    );
  }

  _printPizzaInCart(cartElements) {
    this._clearShoppingCart();
    let totalPrice = 0;
    for (const cartElement of cartElements) {
      totalPrice += +cartElement.pizza.price;
      const rowCartElement = window.document.createElement('div');
      rowCartElement.setAttribute('class', 'row');
      const colPizzaElement = window.document.createElement('div');
      colPizzaElement.setAttribute('class', 'col-8 vertical-align');
      const colRemoveButton = window.document.createElement('div');
      colRemoveButton.setAttribute('class', 'col-4 text-right');
      const pizzaElement = window.document.createElement('li');
      const stringContent = `x${cartElement.cuantity} ${cartElement.pizza.name} - ${cartElement.pizza.price}€`;
      const pizzaText = window.document.createTextNode(stringContent);
      const removeButton = window.document.createElement('button');
      const buttonCross = window.document.createTextNode('Descartar');
      removeButton.appendChild(buttonCross);
      removeButton.setAttribute('class', 'btn btn-danger m-2');
      colPizzaElement.appendChild(pizzaText);
      rowCartElement.appendChild(colPizzaElement);
      pizzaElement.appendChild(rowCartElement);
      colRemoveButton.appendChild(removeButton);
      rowCartElement.appendChild(colRemoveButton);
      pizzaElement.appendChild(rowCartElement);
      pizzaElement.setAttribute('class', 'list-group-item text-left ');
      this.GUI.shoppingCartContainer.appendChild(pizzaElement);
    }
    this._printTotalPrice(totalPrice);
  }

  _printTotalPrice(totalPrice) {
    this._clearTotalPrice();
    const totalPriceElement = window.document.createElement('h3');
    const totalPriceText = window.document.createTextNode(
      `Total: ${totalPrice}€`
    );
    totalPriceElement.appendChild(totalPriceText);
    this.GUI.totalPriceContainer.appendChild(totalPriceElement);
  }

  _clearTotalPrice() {
    this.GUI.totalPriceContainer.removeChild(
      this.GUI.totalPriceContainer.firstChild
    );
  }

  _clearShoppingCart() {
    const shoppingCartContainer = this.GUI.shoppingCartContainer;
    while (shoppingCartContainer.firstChild) {
      shoppingCartContainer.removeChild(shoppingCartContainer.firstChild);
    }
  }
}
