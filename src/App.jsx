
import React, { useEffect, useMemo, useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  PackageSearch,
} from "lucide-react";

import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import ProductSection from "./components/ProductSection";
import CartModal from "./components/CartModal";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

import useProducts from "./hooks/useProducts";

export default function App() {
  const { products, loading, error, retry } = useProducts();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [modal, setModal] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 250);

    return () => window.clearTimeout(timer);
  }, [search]);

  // Get available categories
  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  // Search, filter and sort products
  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case "name":
        result = [...result].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "rating":
        result = [...result].sort(
          (a, b) =>
            (b.rating?.rate || 0) - (a.rating?.rate || 0)
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, debouncedSearch, category, sort]);

  // Divide products into two sections
  const featured = filtered.slice(0, 5);
  const moreProducts = filtered.slice(5);

  const hasActiveFilters =
    debouncedSearch !== "" ||
    category !== "all" ||
    sort !== "featured";

  const resetFilters = () => {
    setCategory("all");
    setSort("featured");
    setSearch("");
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        onOpenCart={() => setModal("cart")}
        onOpenWishlist={() => setModal("wishlist")}
      />

      <main>
        <div className="page-shell">
          <HeroSlider />

          <div className="catalog-toolbar">
            <button
              type="button"
              className={`filter-toggle ${
                showFilters ? "selected" : ""
              }`}
              onClick={() => setShowFilters((value) => !value)}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={16} />
              Filters & Sort
              <ChevronDown size={15} />
            </button>
          </div>

          {showFilters && (
            <div className="filter-panel">
              <label>
                Category

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                >
                  <option value="all">All categories</option>

                  {categories.map((item) => (
                    <option value={item} key={item}>
                      {item.charAt(0).toUpperCase() +
                        item.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Sort by

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">
                    Price: low to high
                  </option>
                  <option value="price-high">
                    Price: high to low
                  </option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>

              <button
                type="button"
                className="reset-filters"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading-state" role="status">
              <span className="spinner" />
              <p>Finding products for you...</p>
            </div>
          ) : error ? (
            <div className="error-state" role="alert">
              <PackageSearch size={30} />
              <p>{error}</p>

              <button type="button" onClick={retry}>
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <PackageSearch size={30} />
              <h3>No products found</h3>
              <p>
                Try another search term or change your filters.
              </p>

              <button
                type="button"
                className="reset-filters"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {hasActiveFilters && (
                <p className="result-count" aria-live="polite">
                  {filtered.length} product
                  {filtered.length === 1 ? "" : "s"} found
                </p>
              )}

              {featured.length > 0 && (
                <ProductSection
                  title="Special Products For You"
                  products={featured}
                />
              )}

              {moreProducts.length > 0 && (
                <ProductSection
                  title="More To Love"
                  subtitle="Discover more from our collection"
                  products={moreProducts}
                />
              )}
            </>
          )}

          <Newsletter />
        </div>
      </main>

      <Footer />

      <CartModal
        open={Boolean(modal)}
        mode={modal}
        onClose={() => setModal("")}
      />
    </>
  );
}
