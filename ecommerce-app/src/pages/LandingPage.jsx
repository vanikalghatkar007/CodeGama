import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../styles/landingPage.scss';

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch {
      setError('Something went wrong while fetching products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="landing-container">
      <h2>Products</h2>
      <div className="filters">
        <button onClick={() => setCategory('')}>All</button>
        <button onClick={() => setCategory("men's clothing")}>Men</button>
        <button onClick={() => setCategory("women's clothing")}>Women</button>
        <button onClick={() => setCategory('jewelery')}>Jewellery</button>
        <button onClick={() => setCategory('electronics')}>Electronics</button>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
