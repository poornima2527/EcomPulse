import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { StatusBadge } from '../components/StatusBadge';
import { customerService } from '../services/customerService';
import type { Customer } from '../types/customer';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    void loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const items = await customerService.list();
    setCustomers(items);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => `${customer.name} ${customer.email}`.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [customers, searchTerm]);

  return (
    <>
      <div className="page-toolbar">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search customers..." />
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>City</th>
              <th>Total Orders</th>
              <th>Total Spending</th>
              <th>Last Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">No customers available.</div>
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <strong>{customer.name}</strong>
                    <div className="muted">{customer.email}</div>
                  </td>
                  <td>{customer.city}</td>
                  <td>{customer.totalOrders}</td>
                  <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(customer.totalSpending)}</td>
                  <td>{customer.lastOrder}</td>
                  <td>
                    <StatusBadge status={customer.status} />
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
