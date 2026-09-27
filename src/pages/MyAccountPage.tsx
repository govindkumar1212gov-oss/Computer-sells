import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Truck,
  LogOut,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GSLogo } from '../components/GSLogo';

interface MyAccountPageProps {
  onTrackOrder: (orderId: string) => void;
  onExploreProducts: () => void;
  onViewWishlist: () => void;
}

export const MyAccountPage: React.FC<MyAccountPageProps> = ({
  onTrackOrder,
  onExploreProducts,
  onViewWishlist
}) => {
  const { orders, wishlist, settings } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'tracking'>('orders');

  // Simple state profile
  const [profile, setProfile] = useState({
    name: 'Customer Account',
    phone: '9161765722',
    email: 'customer@example.com',
    city: 'Paschim Sharira, Kaushambi'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              {profile.name}
            </h1>
            <p className="text-xs text-slate-500">
              {profile.phone} • {profile.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Customer</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile Details</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'addresses'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Saved Addresses</span>
        </button>

        <button
          onClick={onViewWishlist}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition flex items-center gap-1.5"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Wishlist ({wishlist.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Order History &amp; Status
            </h2>
            <button
              onClick={onExploreProducts}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              + Place New Order
            </button>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Order ID
                      </span>
                      <p className="text-base font-black text-slate-900 font-['Space_Grotesk']">
                        {order.id}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-950 font-['Space_Grotesk']">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                          />
                          <div>
                            <span className="font-semibold text-slate-900">
                              {item.productName}
                            </span>
                            <p className="text-[10px] text-slate-400">
                              Qty: {item.quantity} • {item.condition}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-800">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-3">
                    <div>
                      <span>Delivery: <strong>{order.deliveryOption}</strong></span>
                      <span className="mx-2">•</span>
                      <span>Payment: <strong>{order.paymentMethod}</strong></span>
                    </div>

                    <button
                      onClick={() => onTrackOrder(order.id)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <Truck className="w-3.5 h-3.5 text-blue-400" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-xs text-slate-500">No orders placed yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Customer Profile Information</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {savedSuccess && (
            <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg font-semibold">
              ✓ Profile updated successfully!
            </p>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Mobile Number</label>
              <input
                type="tel"
                disabled={!isEditing}
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                disabled={!isEditing}
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white disabled:opacity-80"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">City / Region</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white disabled:opacity-80"
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 max-w-xl space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Default Delivery Address</h3>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900 block">Home / Office</span>
            <p className="text-slate-700">Paschim Sharira Main Market, Near SBI</p>
            <p className="text-slate-600">Kaushambi, Uttar Pradesh – 212214</p>
            <p className="text-slate-500 pt-1">Phone: 9161765722</p>
          </div>
        </div>
      )}
    </div>
  );
};
