import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  RotateCcw,
  CheckCircle,
  X,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, ProductCondition, Product } from '../types';

interface ProductsPageProps {
  onViewProductDetail: (productId: string) => void;
  onBuyNowProduct: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onViewProductDetail,
  onBuyNowProduct
}) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [conditionFilter, setConditionFilter] = useState<'ALL' | ProductCondition>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedRAM, setSelectedRAM] = useState<string>('ALL');
  const [selectedStorage, setSelectedStorage] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(70000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'discount'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return list.sort();
  }, [products]);

  // Extract unique categories
  const categories: (ProductCategory | 'ALL')[] = [
    'ALL',
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
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
          return false;
        }

        // Condition
        if (conditionFilter !== 'ALL' && p.condition !== conditionFilter) {
          return false;
        }

        // Brand
        if (selectedBrand !== 'ALL' && p.brand !== selectedBrand) {
          return false;
        }

        // Price
        if (p.price > maxPrice) {
          return false;
        }

        // In Stock
        if (onlyInStock && !p.inStock) {
          return false;
        }

        // RAM Filter
        if (selectedRAM !== 'ALL') {
          if (!p.specifications.ram || !p.specifications.ram.toLowerCase().includes(selectedRAM.toLowerCase())) {
            return false;
          }
        }

        // Storage Filter
        if (selectedStorage !== 'ALL') {
          if (!p.specifications.storage || !p.specifications.storage.toLowerCase().includes(selectedStorage.toLowerCase())) {
            return false;
          }
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchProc = p.specifications.processor?.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat && !matchSku && !matchProc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'discount') return b.discount - a.discount;
        // Popular / default
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    conditionFilter,
    selectedBrand,
    maxPrice,
    onlyInStock,
    selectedRAM,
    selectedStorage,
    searchQuery,
    sortBy
  ]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setConditionFilter('ALL');
    setSelectedBrand('ALL');
    setSelectedRAM('ALL');
    setSelectedStorage('ALL');
    setMaxPrice(70000);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('popular');
  };

  const filterSidebar = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Category
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition truncate ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'ALL' ? 'All Products' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Condition
        </h4>
        <div className="flex flex-col gap-1.5 text-xs text-slate-700">
          {[
            { label: 'All Conditions', value: 'ALL' },
            { label: 'Brand New', value: 'New' },
            { label: 'Used / Refurbished', value: 'Used / Refurbished' }
          ].map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
            >
              <input
                type="radio"
                name="condition"
                checked={conditionFilter === item.value}
                onChange={() => setConditionFilter(item.value as any)}
                className="text-blue-600 focus:ring-blue-500 rounded"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Brand
        </h4>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* RAM Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          RAM
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {['ALL', '8GB', '16GB', '32GB'].map((ram) => (
            <button
              key={ram}
              onClick={() => setSelectedRAM(ram)}
              className={`text-xs px-2.5 py-1 rounded-md border transition ${
                selectedRAM === ram
                  ? 'bg-blue-600 text-white border-blue-600 font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {ram}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Filter */}
      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Storage
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {['ALL', '256GB', '512GB', '1TB'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStorage(st)}
              className={`text-xs px-2.5 py-1 rounded-md border transition ${
                selectedStorage === st
                  ? 'bg-blue-600 text-white border-blue-600 font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Max Price
          </h4>
          <span className="text-xs font-bold text-blue-600">
            ₹{maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="70000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹500</span>
          <span>₹70,000+</span>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-4 border-t border-slate-200">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Reset button */}
      <button
        onClick={resetFilters}
        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner & Title */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk']">
            {selectedCategory === 'ALL' ? 'All Products & Accessories' : selectedCategory}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {filteredProducts.length} verified products available at GS COMPUTER
          </p>
        </div>

        {/* Sorting & Mobile Filter trigger */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3.5 rounded-xl border border-slate-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="popular">Popular & Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-blue-600 hover:underline font-semibold"
            >
              Reset
            </button>
          </div>
          {filterSidebar}
        </div>

        {/* Product Grid (9 cols) */}
        <div className="lg:col-span-9">
          {/* Active Filter Chips */}
          {(selectedCategory !== 'ALL' ||
            conditionFilter !== 'ALL' ||
            selectedBrand !== 'ALL' ||
            searchQuery.trim() !== '') && (
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              <span className="text-xs text-slate-400 mr-1">Active:</span>
              {selectedCategory !== 'ALL' && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  {selectedCategory}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSelectedCategory('ALL')}
                  />
                </span>
              )}
              {conditionFilter !== 'ALL' && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  {conditionFilter}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setConditionFilter('ALL')}
                  />
                </span>
              )}
              {selectedBrand !== 'ALL' && (
                <span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Brand: {selectedBrand}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSelectedBrand('ALL')}
                  />
                </span>
              )}
              {searchQuery && (
                <span className="text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  Query: "{searchQuery}"
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSearchQuery('')}
                  />
                </span>
              )}
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewProductDetail}
                  onBuyNow={onBuyNowProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No products matched your filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try widening your price range, searching for another brand, or resetting your filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-base text-slate-900">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterSidebar}
            <div className="pt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
