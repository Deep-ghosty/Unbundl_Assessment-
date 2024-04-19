const productList = document.querySelectorAll('.product-list .product');
const totalItems = document.querySelector('.total-items');
const totalPrice = document.querySelector('.total-price');
const addToCartButton = document.querySelector('.add-to-cart');

let selectedItems = 0;
let totalCost = 0;

productList.forEach(product => {
  const quantityInput = product.querySelector('.quantity');
  const price = parseFloat(product.querySelector('p').textContent.replace('$', ''));

  quantityInput.addEventListener('input', () => {
    const quantity = parseInt(quantityInput.value);
    updateTotals(quantity, price, quantityInput);
  });
});

function updateTotals(quantity, price, quantityInput) {
  const previousQuantity = parseInt(quantityInput.dataset.quantity || 0);
  selectedItems -= previousQuantity;
  totalCost -= previousQuantity * price;

  selectedItems += quantity;
  totalCost += quantity * price;

  totalItems.textContent = selectedItems;
  totalPrice.textContent = totalCost.toFixed(2);

  quantityInput.dataset.quantity = quantity;

  if (selectedItems === 8) {
    productList.forEach(product => {
      const input = product.querySelector('.quantity');
      if (parseInt(input.value) === 0) {
        input.disabled = true;
      }
    });
  } else {
    productList.forEach(product => {
      const input = product.querySelector('.quantity');
      input.disabled = false;
    });
  }

  addToCartButton.disabled = selectedItems === 0;
}