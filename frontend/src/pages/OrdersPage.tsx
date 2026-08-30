import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { StatusBadge } from '../components/StatusBadge';
import { orderService } from '../services/orderService';
import type { Order } from '../types/order';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    void loadOrders();
  }, []);

  const loadOrders = async () => {
    const items = await orderService.list();
    setOrders(items);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = `${order.id} ${order.customer} ${order.product}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const handleStatusChange = async (id: string, status: Order['status']) => {
    await orderService.updateStatus(id, status);
    await loadOrders();
  };

  return (
    <>
      <div className="page-toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search orders..." />
        <div className="filter-row">
          <select className="select-input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="All">All statuses</option>
            <option value="Paid">Paid</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">No matching orders found.</div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.amount)}</td>
                  <td>{order.date}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td>
                    <select
                      className="select-input"
                      value={order.status}
                      onChange={(event) => void handleStatusChange(order.id, event.target.value as Order['status'])}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Refunded">Refunded</option>
                    </select>
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
