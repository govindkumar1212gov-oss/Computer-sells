import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Building,
  CreditCard,
  QrCode,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Store,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GSLogo } from '../components/GSLogo';
import { OrderCustomer, PaymentMethod } from '../types';

interface CheckoutPageProps {
  onBackToCart: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onBackToCart,
  onOrderSuccess
}) => {
  const {
    cart,
    getCartTotal,
    createOrder,
    settings
  } = useStore();

  const { subtotal } = getCartTotal();

  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: '',
    mobileNumber: '',
    email: '',
    house: '',
    street: '',
    city: 'Paschim Sharira',
    district: 'Kaushambi',
    state: 'Uttar Pradesh',
    pinCode: '212214'
  });

  const [deliveryOption, setDeliveryOption] = useState<'Home Delivery' | 'Store Pickup'>('Home Delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate dynamic delivery charge
  const deliveryCharge =
    deliveryOption === 'Home Delivery'
      ? subtotal >= settings.freeDeliveryThreshold
        ? 0
        : settings.deliveryCharge
      : 0;

  const totalAmount = subtotal + deliveryCharge;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customer.fullName.trim() || !customer.mobileNumber.trim()) {
      setErrorMsg('Please enter your full name and valid mobile number.');
      return;
    }

    if (customer.mobileNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (deliveryOption === 'Home Delivery') {
      if (!customer.house.trim() || !customer.street.trim() || !customer.pinCode.trim()) {
        setErrorMsg('Please fill in complete delivery address details (House/Street/Pincode).');
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate order placement through system
    setTimeout(() => {
      const order = createOrder({
        customer,
        deliveryOption,
        paymentMethod
      });
      setIsSubmitting(false);
      onOrderSuccess(order.id);
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <button
          onClick={onBackToCart}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Checkout Brand Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <GSLogo size="md" customLogoUrl={settings.logoUrl} />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transparent &amp; Secure Order Processing</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Customer Details & Delivery (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Option Selector */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                1. Delivery Option
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setDeliveryOption('Home Delivery')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition ${
                    deliveryOption === 'Home Delivery'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryOption"
                    checked={deliveryOption === 'Home Delivery'}
                    onChange={() => setDeliveryOption('Home Delivery')}
                    className="mt-0.5 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Home Delivery</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Delivered to your doorstep in Kaushambi &amp; UP.
                    </p>
                    <p className="text-[11px] font-bold text-blue-700 mt-1">
                      {subtotal >= settings.freeDeliveryThreshold ? (
                        <span className="text-emerald-600">FREE Delivery</span>
                      ) : (
                        `Delivery Charge: ₹${settings.deliveryCharge}`
                      )}
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setDeliveryOption('Store Pickup')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition ${
                    deliveryOption === 'Store Pickup'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryOption"
                    checked={deliveryOption === 'Store Pickup'}
                    onChange={() => setDeliveryOption('Store Pickup')}
                    className="mt-0.5 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                      <Store className="w-4 h-4 text-emerald-600" />
                      <span>Store Pickup (FREE)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Pick up directly from GS COMPUTER, Paschim Sharira.
                    </p>
                    <p className="text-[11px] font-bold text-emerald-600 mt-1">
                      ₹0 Delivery Charge
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                2. Customer Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={customer.fullName}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={customer.mobileNumber}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. customer@gmail.com"
                    value={customer.email}
                    onChange={handleChange}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {deliveryOption === 'Home Delivery' && (
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800">
                    Delivery Address Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        House / Building / Flat No. <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="house"
                        required
                        placeholder="House or Shop No."
                        value={customer.house}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Street / Village / Area <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="street"
                        required
                        placeholder="Street or Village Name"
                        value={customer.street}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        City / Town <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={customer.city}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        required
                        value={customer.district}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={customer.state}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        required
                        maxLength={6}
                        value={customer.pinCode}
                        onChange={handleChange}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                3. Payment Method
              </h3>

              {/* Demo Mode Notice Requirement */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Test / Demo Payment Mode Active</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    No actual bank debit will occur. If you choose Cash on Delivery, payment is collected in cash upon delivery or at the store counter.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* UPI */}
                <label
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'UPI'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <QrCode className="w-4 h-4 text-blue-600" />
                      <span>UPI (GPay / PhonePe / Paytm / BHIM)</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Instant QR or VPA handle</span>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Pay when receiving items</span>
                  </div>
                </label>

                {/* Card */}
                <label
                  onClick={() => setPaymentMethod('Credit / Debit Card')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'Credit / Debit Card'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Credit / Debit Card'}
                    onChange={() => setPaymentMethod('Credit / Debit Card')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <CreditCard className="w-4 h-4 text-slate-600" />
                      <span>Credit / Debit Card</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Visa, Mastercard, RuPay</span>
                  </div>
                </label>

                {/* Net Banking */}
                <label
                  onClick={() => setPaymentMethod('Net Banking')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'Net Banking'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Net Banking'}
                    onChange={() => setPaymentMethod('Net Banking')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Building className="w-4 h-4 text-slate-600" />
                      <span>Net Banking</span>
                    </div>
                    <span className="text-[10px] text-slate-500">SBI, HDFC, ICICI, etc.</span>
                  </div>
                </label>
              </div>

              {/* UPI input field if UPI selected */}
              {paymentMethod === 'UPI' && (
                <div className="pt-2">
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">
                    Your UPI ID / VPA (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. yourname@oksbi / yourname@paytm"
                    value={upiIdInput}
                    onChange={(e) => setUpiIdInput(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 sticky top-28">
            <h3 className="text-base font-extrabold text-slate-900 font-['Space_Grotesk'] pb-3 border-b border-slate-100">
              Order Summary ({cart.length} {cart.length === 1 ? 'Product' : 'Products'})
            </h3>

            {/* Items list summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-2.5 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span className="text-xs font-black text-slate-900 font-['Space_Grotesk']">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge ({deliveryOption})</span>
                <span className="font-bold text-slate-900">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Total Payable</span>
                <span className="text-2xl font-black text-slate-950 font-['Space_Grotesk']">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-start gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <span>Place Order (₹{totalAmount.toLocaleString('en-IN')})</span>
              )}
            </button>

            <button
              type="button"
              onClick={onBackToCart}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition text-center"
            >
              ← Edit Cart Items
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
