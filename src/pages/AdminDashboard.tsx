import React, { useState } from 'react';
import {
  ShieldCheck,
  Package,
  ShoppingCart,
  Wrench,
  RefreshCw,
  DollarSign,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Truck,
  MessageSquare,
  Phone,
  Mail,
  AlertCircle,
  Eye,
  LogOut,
  Layers,
  Save,
  Search
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, ProductCategory, ProductCondition } from '../types';
import { GSLogo } from '../components/GSLogo';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    repairRequests,
    exchangeRequests,
    sellRequests,
    contactMessages,
    settings,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateOrderTracking,
    updateRepairStatus,
    updateExchangeStatus,
    updateSellStatus,
    updateSettings,
    getWhatsAppUrl
  } = useStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'products' | 'orders' | 'repairs' | 'exchanges' | 'sells' | 'settings' | 'messages'
  >('orders');

  // Product Form Modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Search in Products or Orders
  const [adminSearch, setAdminSearch] = useState('');

  // Settings form local state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Product form local state
  const initialProductForm: Omit<Product, 'id'> = {
    name: '',
    brand: 'Dell',
    category: 'USED / SECOND-HAND LAPTOPS',
    condition: 'Used / Refurbished',
    price: 25000,
    mrp: 50000,
    discount: 50,
    inStock: true,
    stockCount: 5,
    sku: `GS-${Math.floor(1000 + Math.random() * 9000)}`,
    description: '',
    specifications: {
      processor: '',
      ram: '',
      storage: '',
      display: '',
      warranty: '6 Months Store Warranty',
      os: 'Windows 11'
    },
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80']
  };

  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>(initialProductForm);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  // If not logged in, show secure login page
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-6">
          <div className="flex justify-center">
            <GSLogo size="lg" />
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900 font-['Space_Grotesk']">
              Store Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized access for Govind Patrkar &amp; GS COMPUTER staff
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs text-left">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Admin Passcode / Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin passcode (e.g. admin)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200">
                Invalid admin passcode. Default passcode is: <code className="font-bold">admin</code>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-md shadow-blue-500/20 text-xs sm:text-sm"
            >
              Log In to Admin Dashboard
            </button>
          </form>

          <p className="text-[11px] text-slate-400">
            Default credentials for testing: passcode <strong>admin</strong> or <strong>gscomputer</strong>
          </p>
        </div>
      </div>
    );
  }

  // Handle Product Save
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    if (editingProduct) {
      updateProduct({ ...productForm, id: editingProduct.id });
    } else {
      addProduct(productForm);
    }

    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm(initialProductForm);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      condition: p.condition,
      price: p.price,
      mrp: p.mrp,
      discount: p.discount,
      inStock: p.inStock,
      stockCount: p.stockCount,
      sku: p.sku,
      description: p.description,
      specifications: { ...p.specifications },
      images: [...p.images]
    });
    setShowProductModal(true);
  };

  // Handle Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Status updates
  const orderStatuses: OrderStatus[] = [
    'Order Placed',
    'Order Confirmed',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Admin Top Navigation & Status */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GSLogo size="md" variant="dark" customLogoUrl={settings.logoUrl} />
          <div>
            <h1 className="text-lg font-black font-['Space_Grotesk'] text-white">
              GS COMPUTER Administration
            </h1>
            <p className="text-xs text-blue-300">
              Welcome, {settings.ownerName} ({settings.ownerDesignation})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setProductForm(initialProductForm);
              setShowProductModal(true);
            }}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Orders</span>
          <p className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] mt-0.5">
            {orders.length}
          </p>
          <span className="text-[11px] text-blue-600 font-semibold">
            {orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length} In Progress
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Products</span>
          <p className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] mt-0.5">
            {products.length}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {products.filter((p) => p.condition === 'Used / Refurbished').length} Used / 2nd Hand
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Repair Tickets</span>
          <p className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] mt-0.5">
            {repairRequests.length}
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">
            {repairRequests.filter((r) => r.status === 'Pending').length} Pending Review
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Exchange &amp; Sell</span>
          <p className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] mt-0.5">
            {exchangeRequests.length + sellRequests.length}
          </p>
          <span className="text-[11px] text-indigo-600 font-semibold">
            {exchangeRequests.length} Exchange, {sellRequests.length} Sell
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('repairs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'repairs' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Repair Requests ({repairRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('exchanges')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'exchanges' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Exchange Requests ({exchangeRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sells')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'sells' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Sell Laptop Submissions ({sellRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Store &amp; Delivery Settings</span>
        </button>
      </div>

      {/* 1. ORDERS MANAGEMENT TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Live Orders &amp; Delivery Tracking
            </h2>
            <p className="text-xs text-slate-500">
              Click status dropdown to update customer tracking immediately
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                  <div>
                    <span className="text-xs font-black text-slate-900 font-['Space_Grotesk'] text-base">
                      {order.id}
                    </span>
                    <span className="ml-2 text-xs text-slate-500">
                      Placed: {new Date(order.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-black text-slate-950 font-['Space_Grotesk']">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>

                    {/* Status updater */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 font-semibold">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="text-xs font-bold p-1.5 rounded-lg border border-slate-300 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {orderStatuses.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Customer Info & Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="font-bold text-slate-900 block">Customer</span>
                    <p className="font-medium">{order.customer.fullName}</p>
                    <p className="text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${order.customer.mobileNumber}`}>{order.customer.mobileNumber}</a>
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block">
                      Delivery Option ({order.deliveryOption})
                    </span>
                    {order.deliveryOption === 'Home Delivery' ? (
                      <p className="text-slate-600">
                        {order.customer.house}, {order.customer.street}, {order.customer.city},{' '}
                        {order.customer.district} – {order.customer.pinCode}
                      </p>
                    ) : (
                      <p className="text-emerald-700 font-semibold">Store Pickup in Paschim Sharira</p>
                    )}
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block">Payment &amp; Tracking</span>
                    <p className="text-slate-600">{order.paymentMethod} ({order.paymentStatus})</p>
                    <div className="mt-1 flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Tracking AWB"
                        defaultValue={order.trackingNumber || ''}
                        onBlur={(e) =>
                          updateOrderTracking(order.id, e.target.value, order.estimatedDelivery)
                        }
                        className="p-1 text-[11px] bg-white border border-slate-300 rounded font-mono w-32"
                      />
                      <span className="text-[10px] text-slate-400">Auto-saved</span>
                    </div>
                  </div>
                </div>

                {/* Products list in Order */}
                <div className="space-y-1.5 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-slate-800">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />
                        <span>{item.productName} (Qty: {item.quantity})</span>
                      </div>
                      <span className="font-bold">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex justify-end gap-2 text-xs">
                  <a
                    href={getWhatsAppUrl({ type: 'order', orderId: order.id })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Customer</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PRODUCTS MANAGEMENT TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Catalog &amp; Inventory Management
              </h2>
              <p className="text-xs text-slate-500">
                Add, edit prices, update stock, and modify specifications
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search products..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm(initialProductForm);
                  setShowProductModal(true);
                }}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3">Price / MRP</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products
                  .filter((p) =>
                    adminSearch.trim()
                      ? p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
                        p.brand.toLowerCase().includes(adminSearch.toLowerCase())
                      : true
                  )
                  .map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1 max-w-xs">
                            {product.name}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            Brand: {product.brand} | SKU: {product.sku}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-slate-600">{product.category}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            product.condition === 'Used / Refurbished'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {product.condition}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through block">
                          ₹{product.mrp.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-bold ${
                            product.inStock ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${product.name}?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. REPAIR REQUESTS TAB */}
      {activeTab === 'repairs' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
            Computer Repair Requests ({repairRequests.length})
          </h2>

          <div className="space-y-3">
            {repairRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-700">{req.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-900">{req.customerName}</span>
                    <span className="text-slate-400">•</span>
                    <a href={`tel:${req.mobileNumber}`} className="text-emerald-600 font-bold">
                      {req.mobileNumber}
                    </a>
                  </div>
                  <p className="text-slate-700">
                    <strong>Device:</strong> {req.deviceType} ({req.brand} {req.model}) | <strong>Mode:</strong> {req.serviceType}
                  </p>
                  <p className="text-slate-600">
                    <strong>Problem:</strong> {req.problem}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Address: {req.address} | Preferred Date: {req.preferredDate || 'Earliest'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={req.status}
                    onChange={(e) => updateRepairStatus(req.id, e.target.value as any)}
                    className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Repaired">Repaired</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <a
                    href={getWhatsAppUrl({
                      type: 'repair',
                      details: `Ticket: ${req.id}, Problem: ${req.problem}`
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-emerald-600 text-white rounded-lg"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EXCHANGE REQUESTS TAB */}
      {activeTab === 'exchanges' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
            Laptop Exchange Requests ({exchangeRequests.length})
          </h2>

          <div className="space-y-3">
            {exchangeRequests.map((exc) => (
              <div
                key={exc.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-700">{exc.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-900">{exc.customerName}</span>
                    <span className="text-slate-400">•</span>
                    <a href={`tel:${exc.mobileNumber}`} className="text-blue-600 font-bold">
                      {exc.mobileNumber}
                    </a>
                  </div>
                  <p className="text-slate-700">
                    <strong>Laptop:</strong> {exc.laptopBrand} {exc.laptopModel} ({exc.processor} • {exc.ram} • {exc.storage})
                  </p>
                  <p className="text-slate-600">
                    <strong>Conditions:</strong> Body: {exc.condition} | Screen: {exc.screenCondition} | Battery: {exc.batteryCondition}
                  </p>
                  <p className="text-slate-800 font-semibold">
                    Expected Price: ₹{exc.expectedPrice}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={exc.status}
                    onChange={(e) => updateExchangeStatus(exc.id, e.target.value as any)}
                    className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-xs"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="Estimate Offered">Estimate Offered</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Declined">Declined</option>
                  </select>

                  <a
                    href={getWhatsAppUrl({
                      type: 'exchange',
                      details: `Exchange ${exc.id} for ${exc.laptopBrand} ${exc.laptopModel}`
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-emerald-600 text-white rounded-lg"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SELL LAPTOP REQUESTS TAB */}
      {activeTab === 'sells' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
            Sell Old Laptop Submissions ({sellRequests.length})
          </h2>

          <div className="space-y-3">
            {sellRequests.map((s) => (
              <div
                key={s.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-700">{s.id}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-900">{s.customerName}</span>
                    <span className="text-slate-400">•</span>
                    <a href={`tel:${s.mobileNumber}`} className="text-blue-600 font-bold">
                      {s.mobileNumber}
                    </a>
                  </div>
                  <p className="text-slate-700">
                    <strong>Model:</strong> {s.brand} {s.model} ({s.processor} • {s.ram} • {s.storage})
                  </p>
                  <p className="text-slate-600">
                    <strong>Age:</strong> {s.age} | <strong>Location:</strong> {s.location} | <strong>Expected:</strong> ₹{s.expectedPrice}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={s.status}
                    onChange={(e) => updateSellStatus(s.id, e.target.value as any)}
                    className="p-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-xs"
                  >
                    <option value="Pending Inspection">Pending Inspection</option>
                    <option value="Offer Sent">Offer Sent</option>
                    <option value="Sold">Sold</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <a
                    href={getWhatsAppUrl({
                      type: 'sell',
                      details: `Sell ID ${s.id} for ${s.brand} ${s.model}`
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-emerald-600 text-white rounded-lg"
                    title="WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. STORE & DELIVERY SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-4xl space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Store, Delivery &amp; Contact Configurations
              </h2>
              <p className="text-xs text-slate-500">
                Changes made here immediately take effect across the entire website and database
              </p>
            </div>
            {settingsSaved && (
              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                ✓ Settings Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
            {/* Delivery Toggles & Charges */}
            <div className="space-y-3 pb-5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Delivery &amp; Logistics Configuration
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.deliveryAvailable}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, deliveryAvailable: e.target.checked })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900">Online Delivery Enabled</span>
                    <p className="text-[11px] text-slate-500">Allow customers to choose Home Delivery</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.storePickupAvailable}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, storePickupAvailable: e.target.checked })
                    }
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900">Store Pickup Enabled</span>
                    <p className="text-[11px] text-slate-500">Allow customers to pick up at Paschim Sharira</p>
                  </div>
                </label>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Standard Delivery Charge (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.deliveryCharge}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, deliveryCharge: Number(e.target.value) })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Free Delivery Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        freeDeliveryThreshold: Number(e.target.value)
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Estimated Delivery Time Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.estimatedDeliveryTime}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, estimatedDeliveryTime: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Delivery Areas (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.deliveryAreas.join(', ')}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        deliveryAreas: e.target.value.split(',').map((s) => s.trim())
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Business Info */}
            <div className="space-y-3 pb-5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Business &amp; Contact Numbers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.primaryPhone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, primaryPhone: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Alternate Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.secondaryPhone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, secondaryPhone: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    WhatsApp Number (with country code, e.g. +919161765722)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, email: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Physical Store Address
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Top Bar Announcement Banner
                  </label>
                  <input
                    type="text"
                    value={settingsForm.bannerNotice || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, bannerNotice: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Custom Brand Logo & Owner Photo URL */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Branding &amp; Owner Images
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Custom GS COMPUTER Logo Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://... logo.png"
                    value={settingsForm.logoUrl || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, logoUrl: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Govind Patrkar Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://... owner.jpg"
                    value={settingsForm.ownerPhotoUrl || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, ownerPhotoUrl: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 text-xs sm:text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Apply Store Settings</span>
            </button>
          </form>
        </div>
      )}

      {/* PRODUCT ADD / EDIT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowProductModal(false)}
          />

          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk'] mb-4">
              {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value as ProductCategory })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {[
                      'NEW LAPTOPS',
                      'USED / SECOND-HAND LAPTOPS',
                      'DESKTOP / PC',
                      'MONITORS',
                      'KEYBOARDS',
                      'MOUSE',
                      'PRINTERS',
                      'SSD',
                      'RAM',
                      'HARD DISK',
                      'PENDRIVE',
                      'HEADPHONES',
                      'WEBCAM',
                      'LAPTOP CHARGER',
                      'LAPTOP BAG',
                      'OTHER COMPUTER ACCESSORIES'
                    ].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Condition</label>
                  <select
                    value={productForm.condition}
                    onChange={(e) =>
                      setProductForm({ ...productForm, condition: e.target.value as ProductCondition })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    <option value="New">New</option>
                    <option value="Used / Refurbished">Used / Refurbished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      const discount = productForm.mrp > p ? Math.round(((productForm.mrp - p) / productForm.mrp) * 100) : 0;
                      setProductForm({ ...productForm, price: p, discount });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.mrp}
                    onChange={(e) => {
                      const mrp = Number(e.target.value);
                      const discount = mrp > productForm.price ? Math.round(((mrp - productForm.price) / mrp) * 100) : 0;
                      setProductForm({ ...productForm, mrp, discount });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stockCount}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      setProductForm({ ...productForm, stockCount: count, inStock: count > 0 });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Image URL</label>
                  <input
                    type="url"
                    value={productForm.images[0] || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, images: [e.target.value] })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Processor</label>
                  <input
                    type="text"
                    value={productForm.specifications.processor || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        specifications: { ...productForm.specifications, processor: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">RAM</label>
                  <input
                    type="text"
                    value={productForm.specifications.ram || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        specifications: { ...productForm.specifications, ram: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Storage</label>
                  <input
                    type="text"
                    value={productForm.specifications.storage || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        specifications: { ...productForm.specifications, storage: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Warranty</label>
                  <input
                    type="text"
                    value={productForm.specifications.warranty || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        specifications: { ...productForm.specifications, warranty: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
