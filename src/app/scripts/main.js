class Product {
  constructor({
    price,
    priceConditions,
    deliveryFree,
    usage,
    description,
    location,
    name,
    imageLink,
  }) {
    this.price = price;
    this.priceConditions = priceConditions;
    this.deliveryFree = deliveryFree;
    this.usage = usage;
    this.location = location;
    this.description = description;
    this.name = name;
    this.imageLink = imageLink;
  }

  toHTML() {
    return {
      name: this.name,
      price: `R$ ${this.price.toFixed(2)}`.replace('.', ','),
      priceConditions: `${this.priceConditions.installmentsNumber}x de R$ ${(
        this.price / this.priceConditions.installmentsNumber
      ).toFixed(2)} ${
        this.priceConditions.hasInterest ? 'com juros' : 'sem juros'
      }`.replace('.', ','),
      deliveryFree: this.deliveryFree,
      usage: this.usage,
      description: this.description,
      location: `${this.location.city} - ${this.location.state}`,
      imageLink: this.imageLink,
    };
  }
}

function randLocation() {
  const locations = [
    {
      city: 'Osório',
      state: 'Rio Grande do Sul',
    },
    {
      city: 'São Paulo',
      state: 'São Paulo',
    },
    {
      city: 'Belém',
      state: 'Pará',
    },
  ];

  return locations[Math.floor(Math.random() * locations.length)];
}

function randProducts() {
  const products = [
    {
      description: 'Microsoft Xbox Series S 512GB Standard cor branco.',
      location: randLocation(),
      name: 'Xbox',
      imageLink: 'images/home/main/main__items-box__image-1.png',
      price: Math.random() * 3000,
    },
    {
      description: 'Sony PlayStation 4 Slim 1TB Standard cor  preto-azeviche.',
      location: randLocation(),
      name: 'PS4',
      imageLink:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/PS4-Console-wDS4.png/1280px-PS4-Console-wDS4.png',
      price: Math.random() * 4000,
    },
    {
      description: 'Porsche Panamera 4 E-hybrid Sport Turismo.',
      location: randLocation(),
      name: 'Carro',
      imageLink: 'https://cdn.picpng.com/porsche/porsche-web-29279.png',
      price: Math.random() * 10000,
    },
    {
      description: 'Sony PlayStation 2 Slim Standard cor charcoal black.',
      location: randLocation(),
      name: 'PS2',
      imageLink:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/PlayStation_2.png/469px-PlayStation_2.png',
      price: Math.random() * 900,
    },
    {
      description: 'Sony PlayStation 2 Slim Standard cor charcoal black.',
      location: randLocation(),
      name: 'Teste',
      imageLink:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/PlayStation_2.png/469px-PlayStation_2.png',
      price: Math.random() * 9800,
    },
  ];

  return products[Math.floor(Math.random() * products.length)];
}

const PRODUCTS = [];

for (let i = 0; i < 80; i++) {
  const randProd = randProducts();

  const product = new Product({
    deliveryFree: Math.round(Math.random()) === 1 ? true : false,
    description: randProd.description,
    location: randProd.location,
    price: randProd.price,
    priceConditions: {
      hasInterest: false,
      installmentsNumber: 10,
    },
    usage: Math.round(Math.random()) === 1 ? 'Novo' : 'Usado',
    name: randProd.name,
    imageLink: randProd.imageLink,
  });

  PRODUCTS.push(product);
}

globalThis.PRODUCTS = PRODUCTS;

window.onload = () => {
  globalThis.buildProductsHTML(PRODUCTS);

  document.body.addEventListener('keypress', ({ key }) => {
    if (key === 'Enter') {
      const activeElementId = document.activeElement.id;

      if (activeElementId === 'text_search') {
        globalThis.filterByName();
      }
      if (activeElementId === 'min_price' || activeElementId === 'max_price') {
        globalThis.filterByPriceInput();
      }
    }
  });
};
