function buildProductsHTML(products) {
  const mainTotalPTag = document.getElementById('main_total');
  const mainTitlePTag = document.getElementById('main_title');

  const TOTAL_PRODUCTS = globalThis.PRODUCTS.length;

  const title =
    products.length === 0
      ? 'Nenhum'
      : products.length !== TOTAL_PRODUCTS
      ? products[0].name
      : 'Todos';

  mainTitlePTag.textContent = title;
  mainTotalPTag.textContent = `${products.length} resultados`;

  const [mainItemsDivTag] = document.getElementsByClassName('main__items');

  mainItemsDivTag.innerHTML = '';

  products = products.sort((a, b) => b.price - a.price);

  for (const product of products) {
    const data = product.toHTML();
    const component = parseProductToComponent(data);
    const componentTag = createTagByComponent(component);
    mainItemsDivTag.appendChild(componentTag);
  }
}

function createTagByComponent(component) {
  const firstTag = document.createElement(component.tag);

  for (const key in component.prop) {
    firstTag[key] = component.prop[key];
  }

  for (const child in component.children) {
    if (component.children[child]) {
      const childTag = createTagByComponent(component.children[child]);
      firstTag.appendChild(childTag);
    }
  }

  return firstTag;
}

function parseProductToComponent(
  product = {
    price,
    priceConditions,
    deliveryFree,
    usage,
    description,
    location,
    imageLink,
  }
) {
  return {
    tag: 'div',
    prop: {
      className: 'main__items-box',
    },
    children: {
      image_container: {
        tag: 'div',
        prop: {
          className: 'main__items-box__image',
        },
        children: {
          image: {
            tag: 'img',
            prop: {
              src: product.imageLink,
              alt: 'image',
            },
          },
        },
      },
      caption_container: {
        tag: 'div',
        prop: {
          className: 'main__items-box__caption',
        },
        children: {
          price_container: {
            tag: 'div',
            children: {
              price_value: {
                tag: 'h2',
                prop: {
                  textContent: product.price,
                },
              },
              price_payment: {
                tag: 'p',
                prop: {
                  className: 'text-green',
                  innerHTML: `<strong class="text-black">em</strong> ${product.priceConditions}`,
                },
              },
            },
          },
          delivery_free: product.deliveryFree
            ? {
                tag: 'p',
                prop: {
                  className: 'text-green',
                  innerHTML: '<strong>Frete Grátis</strong>',
                },
              }
            : null,
          usage: {
            tag: 'p',
            prop: {
              textContent: product.usage,
            },
          },
          description: {
            tag: 'p',
            prop: {
              textContent: product.description,
            },
          },
          location: {
            tag: 'p',
            prop: {
              textContent: product.location,
            },
          },
        },
      },
    },
  };
}
