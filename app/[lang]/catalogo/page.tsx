'use client';

import { useState, useEffect, useMemo } from 'react';
import { products as fallbackProducts, getProducts, categoryLabels, type Product } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import { useToast, ToastContainer } from '@/components/ui/Toast';
import { useCart } from '@/lib/cart-context';
import CartDrawer from '@/components/layout/CartDrawer';

interface CatalogPageProps {
  params: { lang: string };
}

export default function CatalogPage({ params: { lang } }: CatalogPageProps) {
  const isEs = lang === 'es';
  const { showToast, toasts } = useToast();
  const { addItem } = useCart();
  
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { 
    getProducts().then(data => setProducts(data || []));
  }, []);
  
  // State for filters
  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter logic
  const filteredProducts = useMemo(() => {
    const result = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.specs.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCats.length === 0 || selectedCats.includes(p.category);
      const matchGrade = selectedGrades.length === 0 || selectedGrades.includes(p.grade);
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchCat && matchGrade && matchPrice;
    });

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [search, selectedCats, selectedGrades, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    showToast(isEs ? '¡Añadido al carrito!' : 'Added to cart!');
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <ToastContainer toasts={toasts} />
      <CartDrawer isEs={isEs} />
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR FILTROS */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-10">
            <h2 className="text-xl font-display font-bold text-brand-text mb-6">
              {isEs ? 'Filtros' : 'Filters'}
            </h2>

            {/* Search */}
            <div>
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isEs ? "Buscar..." : "Search..."}
                className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-green transition-colors"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">{isEs ? 'Categorías' : 'Categories'}</h3>
              <div className="space-y-3">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 text-sm text-brand-text/80 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedCats.includes(key)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedCats([...selectedCats, key]);
                        else setSelectedCats(selectedCats.filter((c: string) => c !== key));
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 rounded border-brand-border bg-brand-surface text-brand-green focus:ring-offset-brand-bg focus:ring-brand-green" 
                    />
                    <span className="group-hover:text-brand-green transition-colors">{isEs ? label.es : label.en}</span>
                    <span className="ml-auto text-[10px] text-brand-muted">{label.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">
                {isEs ? 'Precio Máximo' : 'Max Price'}: <span className="text-brand-green">{maxPrice}€</span>
              </h3>
              <input 
                type="range" 
                min="0" 
                max="1500" 
                step="50"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(parseInt(e.target.value)); setCurrentPage(1); }}
                className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-green"
              />
            </div>

            {/* Grades */}
            <div>
              <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">{isEs ? 'Grado de reacondicionado' : 'Refurbished Grade'}</h3>
              <div className="flex gap-4">
                {['A+', 'A', 'B'].map(grade => (
                  <button 
                    key={grade}
                    onClick={() => {
                       if (selectedGrades.includes(grade)) setSelectedGrades(selectedGrades.filter((g: string) => g !== grade));
                       else setSelectedGrades([...selectedGrades, grade]);
                       setCurrentPage(1);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${selectedGrades.includes(grade) ? 'bg-brand-green border-brand-green text-black' : 'border-brand-border text-brand-muted hover:border-brand-green'}`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setSelectedCats([]); setSelectedGrades([]); setMaxPrice(1500); setSearch(''); setCurrentPage(1); }}
              className="text-xs text-brand-muted hover:text-red-400 transition-colors underline underline-offset-4"
            >
              {isEs ? 'Limpiar filtros' : 'Clear filters'}
            </button>
          </div>
        </aside>

        {/* MAIN GRID */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <p className="text-sm text-brand-muted">
              {isEs ? `Mostrando ${filteredProducts.length} productos` : `Showing ${filteredProducts.length} products`}
            </p>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-brand-surface border border-brand-border rounded-xl px-4 py-2 text-sm outline-none focus:border-brand-green transition-colors"
            >
              <option value="newest">{isEs ? 'Más nuevo' : 'Newest'}</option>
              <option value="price-asc">{isEs ? 'Precio: Menor a Mayor' : 'Price: Low to High'}</option>
              <option value="price-desc">{isEs ? 'Precio: Mayor a Menor' : 'Price: High to Low'}</option>
            </select>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-brand-muted">{isEs ? 'No se encontraron productos con estos filtros.' : 'No products found with these filters.'}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                  <div key={product.id} className="relative group">
                    <ProductCard product={product} />
                    {/* Add to cart overlay shortcut or simply redefine the card button behavior */}
                    <div className="mt-[-60px] pb-6 px-6 relative z-10 pointer-events-none">
                       <Button 
                         onClick={() => handleAddToCart(product)}
                         className="w-full pointer-events-auto shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                         {isEs ? 'Añadir al carrito' : 'Add to cart'}
                       </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-10 h-10 rounded-lg border font-bold text-xs transition-all ${currentPage === page ? 'bg-brand-green border-brand-green text-black' : 'border-brand-border text-brand-muted hover:border-brand-green'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
