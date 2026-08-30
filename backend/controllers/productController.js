const { products } = require('../data/mockData');

const listProducts = (req, res) => {
  return res.json(products);
};

const createProduct = (req, res) => {
  const { name, category, price, stock, status } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ message: 'Name, category and price are required' });
  }

  const newProduct = {
    id: `p_${Date.now()}`,
    name,
    category,
    price: Number(price),
    cost: Number(price) * 0.55,
    stock: Number(stock || 0),
    status: status || 'Active',
    sales: 0,
    image: '🛍️',
  };

  products.unshift(newProduct);
  return res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products[index] = { ...products[index], ...req.body };
  return res.json(products[index]);
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const [deletedProduct] = products.splice(index, 1);
  return res.json({ success: true, product: deletedProduct });
};

module.exports = {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
