import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import axios from 'axios';
import '../styles/productDetails.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch {
      setError('Something went wrong while fetching product details.');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="product-details">
      {error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <>
          <img src={product.image} alt={product.title} />
          <div className="info">
            <h2>{product.title}</h2>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">${product.price?.toFixed(2)}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
