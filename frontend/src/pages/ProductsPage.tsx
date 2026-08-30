import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { StatusBadge } from '../components/StatusBadge';
import { productService } from '../services/productService';
import type { Product, ProductFormValues } from '../types/product';

const emptyForm: ProductFormValues = {
  name: '',
  category: 'Electronics',
  price: 0,
  stock: 0,
  status: 'Active',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormValues>(emptyForm);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    void refreshProducts();
  }, []);

  const refreshProducts = async () => {
    try {
      const items = await productService.list();
      setProducts(items);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to load products');
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [products, searchTerm, statusFilter, categoryFilter]);

  const pageSize = 5;
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const openCreateModal = () => {
    setSelectedProduct(null);
    setForm(emptyForm);
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (selectedProduct) {
        await productService.update(selectedProduct.id, form);
      } else {
        await productService.create(form);
      }
      setIsModalOpen(false);
      setPage(1);
      await refreshProducts();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save product');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.remove(id);
      await refreshProducts();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete product');
    }
  };

  return (
    <>
      <div className="page-toolbar">
        <div className="toolbar-actions">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search products..." />
        </div>
        <div className="filter-row">
          <select className="select-input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
          <select className="select-input" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category === 'All' ? 'All categories' : category}</option>
            ))}
          </select>
          <Button type="button" onClick={openCreateModal}>+ Add Product</Button>
        </div>
      </div>

      {error ? <div className="status-badge status-danger">{error}</div> : null}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState title="No products found" description="Try changing filters or add a new product." />
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.image ?? '🛍️'} {product.name}</strong>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>${product.price}</td>
                  <td>{product.sales}</td>
                  <td>
                    <StatusBadge status={product.status} />
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="action-btn" onClick={() => openEditModal(product)}>Edit</button>
                      <button type="button" className="action-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="field-row" style={{ marginTop: 16, justifyContent: 'space-between' }}>
        <div className="muted">Showing {filteredProducts.length} products</div>
        <div className="field-row">
          <button type="button" className="btn btn-ghost" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
            Prev
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setPage((current) => current + 1)} disabled={page * pageSize >= filteredProducts.length}>
            Next
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} title={selectedProduct ? 'Edit product' : 'Add product'} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="productName">Name</label>
              <input id="productName" className="text-input" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
            </div>
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select id="category" className="select-input" value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}>
                <option value="Electronics">Electronics</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="price">Price</label>
              <input id="price" type="number" className="text-input" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: Number(event.target.value) }))} />
            </div>
            <div className="form-field">
              <label htmlFor="stock">Stock</label>
              <input id="stock" type="number" className="text-input" value={form.stock} onChange={(event) => setForm((prev) => ({ ...prev, stock: Number(event.target.value) }))} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select id="status" className="select-input" value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as Product['status'] }))}>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {error ? <div className="status-badge status-danger">{error}</div> : null}

          <div className="field-row" style={{ justifyContent: 'flex-end', marginTop: 12 }}>
            <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <Button type="submit">Save product</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
