export default function addItemLocalStorage(item, stockMax) {
  const getLocal = JSON.parse(localStorage.getItem('cart'));
  const { id, title, thumbnail, price } = item;
  const availableQuant = item[stockMax];
  const objItem = {
    id,
    title,
    thumbnail,
    price,
    availableQuant,
  };
  objItem.quant = 1;
  if (getLocal === null) {
    localStorage.setItem('cart', JSON.stringify([objItem]));
  } else {
    const teste = getLocal.find((idItem) => idItem.id === id);
    if (teste) {
      const newItem = [];
      getLocal.forEach((productId) => {
        if (productId.id === id) { productId.quant += 1; }
        newItem.push(productId);
      });
      localStorage.setItem('cart', JSON.stringify(newItem));
    } else {
      const newList = [...getLocal, objItem];
      localStorage.setItem('cart', (JSON.stringify(newList)));
    }
  }
}
