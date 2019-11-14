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
      totalPriceContainer: window.document.getElementById('totalPrice'),
      ingredientsListContainer: window.document.getElementById(
        'ingredientsList'
      ),
      selectedIngredients: window.document.getElementById(
        'selectedIngredients'
      ),
      pizzaBases: window.document.querySelectorAll(
        'input[name=radioIngredient]'
      ),
      selectedPizzaBase: window.document.getElementById('selectedBase'),
      buttonAddCustomPizzaToShoppingCart: window.document.getElementById(
        'addCustomPizza'
      )
    };
    this.customId = 0;
  }

  bindLoadDefaultPizzas(handler) {
    const defaultPizzas = handler();
    for (const pizza of defaultPizzas) {
      this._printDefaultPizza(pizza);
    }
  }

  bindLoadIngredients(handler) {
    const ingredients = handler();
    for (const ingredient of ingredients) {
      this._printIngredients(ingredient);
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

  _printIngredients({ name, basePrice }) {
    const ingredient = window.document.createElement('button');
    ingredient.setAttribute('value', basePrice);
    ingredient.setAttribute('id', name);
    ingredient.setAttribute('type', 'button');
    ingredient.setAttribute(
      'class',
      'list-group-item list-group-item-action text-center m-2'
    );
    const ingredientText = window.document.createTextNode(
      `${name} - ${basePrice}€`
    );
    ingredient.appendChild(ingredientText);
    this._addEventToIngredient(ingredient);
    this._addEventToPizzaBases();
    this.GUI.ingredientsListContainer.appendChild(ingredient);
  }

  _addEventToPizzaBases() {
    const pizzaBases = this.GUI.pizzaBases;
    for (const pizzaBase of pizzaBases) {
      pizzaBase.addEventListener('click', () =>
        this._addSelectedPizzaBase(pizzaBase)
      );
    }
  }

  _addSelectedPizzaBase(pizzaBase) {
    const selectedPizzaBaseContainer = this.GUI.selectedPizzaBase;
    const pizzaBaseName = pizzaBase.id;
    const pizzaBasePrice = pizzaBase.value;
    const selectedPizzaBase = window.document.createElement('button');
    selectedPizzaBase.setAttribute('id', pizzaBaseName);
    selectedPizzaBase.setAttribute('value', pizzaBasePrice);
    selectedPizzaBase.setAttribute(
      'class',
      'text-center list-group-item border-0 h3'
    );
    const selectedBaseText = window.document.createTextNode(
      `${pizzaBaseName}(${pizzaBasePrice}€)`
    );
    selectedPizzaBase.appendChild(selectedBaseText);
    if (selectedPizzaBaseContainer.firstChild) {
      selectedPizzaBaseContainer.removeChild(
        selectedPizzaBaseContainer.firstChild
      );
    }

    selectedPizzaBaseContainer.appendChild(selectedPizzaBase);
  }

  _addEventToIngredient(ingredient) {
    ingredient.addEventListener('click', () => {
      ingredient.classList.toggle('active');
      const ingredientName = ingredient.id;
      const ingredientPrice = ingredient.value;
      this._addIngredientToSelectedIngredients(ingredientName, ingredientPrice);
    });
  }

  _addIngredientToSelectedIngredients(ingredientName, ingredientPrice) {
    const ingredient = window.document.createElement('button');
    ingredient.setAttribute('class', 'list-group-item text-center');
    ingredient.setAttribute('value', ingredientPrice);
    ingredient.setAttribute('id', ingredientName);
    const ingredientText = window.document.createTextNode(ingredientName);
    ingredient.appendChild(ingredientText);
    const selectedIngredients = this.GUI.selectedIngredients.childNodes;
    let wasIngredientAlreadySelected = false;
    for (const selectedIngredient of selectedIngredients) {
      if (selectedIngredient.id === ingredient.id) {
        this.GUI.selectedIngredients.removeChild(selectedIngredient);
        wasIngredientAlreadySelected = true;
      }
    }
    if (!wasIngredientAlreadySelected) {
      this.GUI.selectedIngredients.appendChild(ingredient);
    }
  }

  bindAddCustomPizzaToShoppingCart(handlerAddPizza, handlerRemovePizza) {
    this.GUI.buttonAddCustomPizzaToShoppingCart.addEventListener(
      'click',
      () => {
        this.customId++;
        const ingredients = this._getSelectedIngredients();
        const base = window.document.getElementById('selectedBase').firstChild;
        const baseName = base.id;
        const basePrice = base.value;
        const pizza = {
          name: `custom${baseName}_${this.customId}`,
          ingredients: ingredients,
          size: baseName,
          price: basePrice
        };
        const cartElements = handlerAddPizza(pizza);
        this._printPizzaInCart(cartElements, handlerRemovePizza);
      }
    );
  }

  _getSelectedIngredients() {
    const selectedIngredients = this.GUI.selectedIngredients.childNodes;
    let ingredients = [];
    for (const ingredient of selectedIngredients) {
      ingredients = [
        ...ingredients,
        { name: ingredient.id, basePrice: +ingredient.value }
      ];
    }
    return ingredients;
  }

  bindAddDefaultPizzaToShoppingCart(handlerAddPizza, handlerRemovePizza) {
    this.GUI.buttonAddDefaultPizzaToShoppingCart.addEventListener(
      'click',
      () => {
        const selectedRadio = window.document.querySelector(
          'input[name=radioDefaultPizza]:checked'
        );
        const priceValue = selectedRadio.value;
        const name = selectedRadio.id;
        const pizza = {
          name: name,
          price: priceValue
        };
        const cartElements = handlerAddPizza(pizza);
        console.log(cartElements);
        this._printPizzaInCart(cartElements, handlerRemovePizza);
      }
    );
  }

  _printPizzaInCart(cartElements, handlerRemovePizza) {
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
      const buttonText = window.document.createTextNode('Descartar');
      removeButton.appendChild(buttonText);
      removeButton.setAttribute('class', 'btn btn-danger m-2');
      removeButton.setAttribute('id', cartElement.pizza.name);
      colPizzaElement.appendChild(pizzaText);
      rowCartElement.appendChild(colPizzaElement);
      pizzaElement.appendChild(rowCartElement);
      colRemoveButton.appendChild(removeButton);
      rowCartElement.appendChild(colRemoveButton);
      pizzaElement.appendChild(rowCartElement);
      pizzaElement.setAttribute('class', 'list-group-item text-left ');
      this.GUI.shoppingCartContainer.appendChild(pizzaElement);
      this._addEventToDeleteButton(removeButton, handlerRemovePizza);
    }
    this._printTotalPrice(totalPrice);
  }

  _addEventToDeleteButton(removeButton, handlerRemovePizza) {
    const pizzaName = removeButton.id;
    removeButton.addEventListener('click', () => {
      this._removePizzaFromShoppingCart(handlerRemovePizza, pizzaName);
    });
  }

  _removePizzaFromShoppingCart(handlerRemovePizza, pizzaName) {
    const newCartItemsList = handlerRemovePizza(pizzaName);
    this._printPizzaInCart(newCartItemsList, handlerRemovePizza);
  }

  _printTotalPrice(totalPrice) {
    this._clearTotalPrice();
    const totalPriceFixed = totalPrice.toFixed(2);
    const totalPriceElement = window.document.createElement('h3');
    const totalPriceText = window.document.createTextNode(
      `Total: ${totalPriceFixed}€`
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
