export type ProductCategory =
  | 'NEW LAPTOPS'
  | 'USED / SECOND-HAND LAPTOPS'
  | 'DESKTOP / PC'
  | 'MONITORS'
  | 'KEYBOARDS'
  | 'MOUSE'
  | 'PRINTERS'
  | 'SSD'
  | 'RAM'
  | 'HARD DISK'
  | 'PENDRIVE'
  | 'HEADPHONES'
  | 'WEBCAM'
  | 'LAPTOP CHARGER'
  | 'LAPTOP BAG'
  | 'OTHER COMPUTER ACCESSORIES';

export type ProductCondition = 'New' | 'Used / Refurbished';

export interface ProductSpecifications {
  ram?: string;
  storage?: string;
  processor?: string;
  display?: string;
  graphics?: string;
  os?: string;
  warranty?: string;
  conditionGrade?: 'Brand New' | 'Like New (Grade A+)' | 'Excellent (Grade A)' | 'Good (Grade B)';
  batteryHealth?: string;
  screenSize?: string;
  ports?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: number;
  mrp: number;
  discount: number; // percentage
  inStock: boolean;
  stockCount: number;
  sku: string;
  description: string;
  specifications: ProductSpecifications;
  images: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  deliveryInfo?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'UPI' | 'Credit / Debit Card' | 'Net Banking' | 'Cash on Delivery';

export type PaymentStatus = 'Paid (Demo Mode)' | 'Pending COD' | 'Completed' | 'Failed';

export interface OrderCustomer {
  fullName: string;
  mobileNumber: string;
  email?: string;
  house: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
}

export interface OrderHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  condition: ProductCondition;
}

export interface Order {
  id: string; // e.g. GS-2026-9182
  customer: OrderCustomer;
  deliveryOption: 'Home Delivery' | 'Store Pickup';
  deliveryCharge: number;
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery: string;
  createdAt: string;
  history: OrderHistoryItem[];
  items: OrderItem[];
}

export interface RepairRequest {
  id: string;
  customerName: string;
  mobileNumber: string;
  deviceType: 'Laptop' | 'Desktop' | 'Printer' | 'Accessories' | 'Other';
  brand: string;
  model: string;
  problem: string;
  preferredDate: string;
  address: string;
  serviceType: 'Store Drop-off' | 'Home Pickup';
  status: 'Pending' | 'In Progress' | 'Repaired' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface ExchangeRequest {
  id: string;
  customerName: string;
  mobileNumber: string;
  laptopBrand: string;
  laptopModel: string;
  processor: string;
  ram: string;
  storage: string;
  purchaseYear: string;
  condition: string;
  batteryCondition: string;
  screenCondition: string;
  keyboardCondition: string;
  expectedPrice: string;
  additionalInfo?: string;
  photoUrl?: string;
  status: 'Pending Review' | 'Estimate Offered' | 'Accepted' | 'Declined';
  createdAt: string;
}

export interface SellLaptopRequest {
  id: string;
  customerName: string;
  mobileNumber: string;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  age: string;
  condition: string;
  expectedPrice: string;
  location: string;
  additionalDetails?: string;
  photoUrl?: string;
  status: 'Pending Inspection' | 'Offer Sent' | 'Sold' | 'Closed';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface AdminSettings {
  businessName: string;
  tagline: string;
  ownerName: string;
  ownerDesignation: string;
  address: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  deliveryAvailable: boolean;
  storePickupAvailable: boolean;
  deliveryCharge: number;
  freeDeliveryThreshold: number;
  deliveryAreas: string[];
  estimatedDeliveryTime: string;
  codEnabled: boolean;
  onlinePaymentEnabled: boolean;
  testPaymentModeNotice: boolean;
  logoUrl?: string;
  ownerPhotoUrl?: string;
  bannerNotice?: string;
}
