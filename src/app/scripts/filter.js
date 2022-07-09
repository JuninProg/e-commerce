function filterByPrice(minPrice, maxPrice) {
  const filteredProducts = globalThis.PRODUCTS.filter((product) => {
    const validMaxPrice = maxPrice ? product.price <= maxPrice : true;
    return product.price >= minPrice && validMaxPrice;
  });

  globalThis.buildProductsHTML(filteredProducts);
}

function filterByPriceInput() {
  const minPrice = document.getElementById('min_price').value;
  const maxPrice = document.getElementById('max_price').value;

  if (minPrice || maxPrice) {
    filterByPrice(
      minPrice ? parseFloat(minPrice) : 0,
      maxPrice ? parseFloat(maxPrice) : undefined
    );
  }
}

function filterByUsage(usage) {
  const filteredProducts = globalThis.PRODUCTS.filter(
    (product) => product.usage === usage
  );
  globalThis.buildProductsHTML(filteredProducts);
}

function filterByLocation(state) {
  const filteredProducts = globalThis.PRODUCTS.filter(
    (product) => product.location.state === state
  );
  globalThis.buildProductsHTML(filteredProducts);
}

function filterByName() {
  const textSearchInput = document.getElementById('text_search').value;

  if (textSearchInput) {
    const filteredProducts = globalThis.PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().search(textSearchInput.toLowerCase()) !== -1
    );

    globalThis.buildProductsHTML(filteredProducts);
  } else {
    globalThis.buildProductsHTML(globalThis.PRODUCTS);
  }
}

globalThis.filterByName = filterByName;
globalThis.filterByPriceInput = filterByPriceInput;
