import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import { StatusBadge } from '../components/StatusBadge';
import { inventoryService, type InventoryItem } from '../services/inventoryService';

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    void loadInventory();
  }, []);

  const loadInventory = async () => {
    const inventory = await inventoryService.list();
    setItems(inventory);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = `${item.product} ${item.sku}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, categoryFilter]);

  const categories = ['All', ...new Set(items.map((item) => item.category))];

  const handleRestock = async (id: string) => {
    await inventoryService.restock(id, 25);
    await loadInventory();
  };

  return (
    <>
      <div className="page-toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search inventory..." />
        <div className="filter-row">
          <select className="select-input" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category === 'All' ? 'All categories' : category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">No inventory items found.</div>
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.product}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.currentStock.toLocaleString()}</td>
                  <td>{item.reorderLevel.toLocaleString()}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <Button type="button" variant="secondary" onClick={() => void handleRestock(item.id)}>
                      Restock
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
