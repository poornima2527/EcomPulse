const bcrypt = require('bcryptjs');

const users = [
  {
    id: 'user_1',
    name: 'Poorni',
    username: 'Poorni',
    email: 'poorni@ecompulse.com',
    passwordHash: bcrypt.hashSync('1234', 10),
    role: 'admin',
  },
  {
    id: 'user_2',
    name: 'Alicia Reed',
    username: 'alicia',
    email: 'alicia@ecompulse.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'manager',
  },
];

const products = [
  { id: 'p_101', name: 'Aero Smartwatch', category: 'Electronics', price: 249, cost: 150, stock: 48, status: 'Active', sales: 412, image: '⌚' },
  { id: 'p_102', name: 'Luna Running Shoes', category: 'Footwear', price: 179, cost: 94, stock: 34, status: 'Active', sales: 326, image: '👟' },
  { id: 'p_103', name: 'Nimbus Headphones', category: 'Electronics', price: 299, cost: 178, stock: 21, status: 'Low Stock', sales: 240, image: '🎧' },
  { id: 'p_104', name: 'Orion Backpack', category: 'Accessories', price: 129, cost: 72, stock: 12, status: 'Low Stock', sales: 184, image: '🎒' },
  { id: 'p_105', name: 'Harbor Coffee Set', category: 'Home', price: 89, cost: 49, stock: 64, status: 'Active', sales: 142, image: '☕' },
  { id: 'p_106', name: 'Velora Speaker', category: 'Electronics', price: 189, cost: 110, stock: 26, status: 'Active', sales: 205, image: '🔊' },
  { id: 'p_107', name: 'Summit Desk Lamp', category: 'Home', price: 74, cost: 38, stock: 18, status: 'Draft', sales: 58, image: '💡' },
  { id: 'p_108', name: 'Aster Travel Case', category: 'Accessories', price: 59, cost: 30, stock: 0, status: 'Archived', sales: 37, image: '🧳' },
];

const orders = [
  { id: 'ORD-1042', customer: 'Nina Patel', product: 'Aero Smartwatch', amount: 249, date: '2026-08-11', status: 'Paid', channel: 'Website' },
  { id: 'ORD-1043', customer: 'Marcus Lee', product: 'Luna Running Shoes', amount: 179, date: '2026-08-10', status: 'Processing', channel: 'Marketplace' },
  { id: 'ORD-1044', customer: 'Jasmine Wu', product: 'Nimbus Headphones', amount: 299, date: '2026-08-09', status: 'Shipped', channel: 'Website' },
  { id: 'ORD-1045', customer: 'Olivia Brooks', product: 'Harbor Coffee Set', amount: 89, date: '2026-08-08', status: 'Refunded', channel: 'Retail' },
  { id: 'ORD-1046', customer: 'Daniel Kim', product: 'Orion Backpack', amount: 129, date: '2026-08-07', status: 'Paid', channel: 'Website' },
  { id: 'ORD-1047', customer: 'Priya Shah', product: 'Velora Speaker', amount: 189, date: '2026-08-12', status: 'Paid', channel: 'Mobile App' },
  { id: 'ORD-1048', customer: 'Leo Martin', product: 'Summit Desk Lamp', amount: 74, date: '2026-08-06', status: 'Processing', channel: 'Marketplace' },
  { id: 'ORD-1049', customer: 'Ava Thompson', product: 'Aero Smartwatch', amount: 249, date: '2026-08-05', status: 'Shipped', channel: 'Website' },
  { id: 'ORD-1050', customer: 'Sofia Nguyen', product: 'Aster Travel Case', amount: 59, date: '2026-08-04', status: 'Refunded', channel: 'Retail' },
];

const customers = [
  { id: 'cust_1', name: 'Nina Patel', email: 'nina@email.com', phone: '+1 415 372 8820', city: 'San Francisco', totalOrders: 18, totalSpending: 5820, lastOrder: '2026-08-11', status: 'Active' },
  { id: 'cust_2', name: 'Marcus Lee', email: 'marcus@email.com', phone: '+1 212 416 8321', city: 'New York', totalOrders: 10, totalSpending: 3210, lastOrder: '2026-08-10', status: 'Active' },
  { id: 'cust_3', name: 'Jasmine Wu', email: 'jasmine@email.com', phone: '+1 206 628 1114', city: 'Seattle', totalOrders: 15, totalSpending: 4650, lastOrder: '2026-08-09', status: 'VIP' },
  { id: 'cust_4', name: 'Olivia Brooks', email: 'olivia@email.com', phone: '+1 310 667 9914', city: 'Los Angeles', totalOrders: 7, totalSpending: 2190, lastOrder: '2026-08-08', status: 'Inactive' },
  { id: 'cust_5', name: 'Priya Shah', email: 'priya@email.com', phone: '+1 646 281 4402', city: 'Chicago', totalOrders: 12, totalSpending: 3870, lastOrder: '2026-08-12', status: 'Active' },
  { id: 'cust_6', name: 'Leo Martin', email: 'leo@email.com', phone: '+1 512 470 2189', city: 'Austin', totalOrders: 9, totalSpending: 2815, lastOrder: '2026-08-06', status: 'VIP' },
  { id: 'cust_7', name: 'Ava Thompson', email: 'ava@email.com', phone: '+1 303 889 1452', city: 'Denver', totalOrders: 6, totalSpending: 1930, lastOrder: '2026-08-05', status: 'Inactive' },
];

const inventory = [
  { id: 'inv_1', sku: 'AER-228', product: 'Aero Smartwatch', category: 'Electronics', currentStock: 48, reorderLevel: 20, status: 'Healthy', location: 'Warehouse A', lastUpdated: '2026-08-11' },
  { id: 'inv_2', sku: 'RUN-410', product: 'Luna Running Shoes', category: 'Footwear', currentStock: 34, reorderLevel: 15, status: 'Healthy', location: 'Warehouse B', lastUpdated: '2026-08-11' },
  { id: 'inv_3', sku: 'NIM-102', product: 'Nimbus Headphones', category: 'Electronics', currentStock: 8, reorderLevel: 12, status: 'Low Stock', location: 'Warehouse A', lastUpdated: '2026-08-09' },
  { id: 'inv_4', sku: 'ORI-395', product: 'Orion Backpack', category: 'Accessories', currentStock: 0, reorderLevel: 18, status: 'Out of Stock', location: 'Warehouse C', lastUpdated: '2026-08-08' },
  { id: 'inv_5', sku: 'VEL-913', product: 'Velora Speaker', category: 'Electronics', currentStock: 26, reorderLevel: 10, status: 'Healthy', location: 'Warehouse D', lastUpdated: '2026-08-12' },
  { id: 'inv_6', sku: 'SUM-771', product: 'Summit Desk Lamp', category: 'Home', currentStock: 18, reorderLevel: 14, status: 'Healthy', location: 'Warehouse B', lastUpdated: '2026-08-07' },
  { id: 'inv_7', sku: 'AST-552', product: 'Aster Travel Case', category: 'Accessories', currentStock: 0, reorderLevel: 12, status: 'Out of Stock', location: 'Warehouse C', lastUpdated: '2026-08-04' },
];

const analytics = {
  revenue: 184250,
  orders: 643,
  customers: 2841,
  conversionRate: 4.8,
  salesOverview: [12, 16, 14, 18, 21, 19, 24],
  revenueSummary: [
    { label: 'Jan', revenue: 22000 },
    { label: 'Feb', revenue: 26800 },
    { label: 'Mar', revenue: 25400 },
    { label: 'Apr', revenue: 30100 },
    { label: 'May', revenue: 33800 },
    { label: 'Jun', revenue: 36200 },
    { label: 'Jul', revenue: 40100 },
  ],
  salesByCategory: [
    { category: 'Electronics', value: 41 },
    { category: 'Apparel', value: 28 },
    { category: 'Home', value: 17 },
    { category: 'Accessories', value: 14 },
  ],
  salesByProduct: [
    { product: 'Aero Smartwatch', value: 128000 },
    { product: 'Luna Running Shoes', value: 94000 },
    { product: 'Nimbus Headphones', value: 76000 },
    { product: 'Orion Backpack', value: 54000 },
    { product: 'Velora Speaker', value: 49600 },
  ],
  customerGrowth: [
    { month: 'Jan', customers: 1200 },
    { month: 'Feb', customers: 1380 },
    { month: 'Mar', customers: 1480 },
    { month: 'Apr', customers: 1630 },
    { month: 'May', customers: 1845 },
    { month: 'Jun', customers: 2100 },
    { month: 'Jul', customers: 2325 },
  ],
};

const aiInsights = {
  revenueTrends: [
    { label: 'Mon', value: 8200 },
    { label: 'Tue', value: 9600 },
    { label: 'Wed', value: 10200 },
    { label: 'Thu', value: 11900 },
    { label: 'Fri', value: 13300 },
    { label: 'Sat', value: 14800 },
    { label: 'Sun', value: 15500 },
  ],
  productRecommendations: [
    { name: 'Aero Smartwatch', reason: 'High demand in premium electronics' },
    { name: 'Luna Running Shoes', reason: 'Strong repeat purchase trend' },
    { name: 'Nimbus Headphones', reason: 'Bundle purchase opportunity' },
    { name: 'Velora Speaker', reason: 'Great upsell for home setup bundles' },
  ],
  lowStockWarnings: [
    { product: 'Nimbus Headphones', stock: 8 },
    { product: 'Orion Backpack', stock: 0 },
    { product: 'Aster Travel Case', stock: 0 },
  ],
  salesPredictions: [
    { period: 'Next 7 days', forecast: '$39.2K' },
    { period: 'Next 30 days', forecast: '$186.4K' },
    { period: 'Next 90 days', forecast: '$572.8K' },
  ],
  bestSellingCategories: [
    { category: 'Electronics', revenue: '$74.5K' },
    { category: 'Footwear', revenue: '$49.2K' },
    { category: 'Accessories', revenue: '$31.9K' },
    { category: 'Home', revenue: '$18.7K' },
  ],
  peakShoppingHours: [
    { hour: '10:00 AM', orders: 42 },
    { hour: '12:00 PM', orders: 57 },
    { hour: '6:00 PM', orders: 74 },
    { hour: '8:00 PM', orders: 66 },
    { hour: '9:00 PM', orders: 53 },
  ],
};

module.exports = {
  users,
  products,
  orders,
  customers,
  inventory,
  analytics,
  aiInsights,
};
