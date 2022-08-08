export default function addItemLocalStorage(id, title, thumbnail, price) {
  const objItem = {
    id,
    title,
    thumbnail,
    price,
  };
  objItem.quant = 1;
  const getLocal = JSON.parse(localStorage.getItem('cart'));
  if (getLocal === null) {
    localStorage.setItem('cart', JSON.stringify([objItem]));
  } else {
    const newList = [...getLocal, objItem];
    localStorage.setItem('cart', (JSON.stringify(newList)));
  }
}
