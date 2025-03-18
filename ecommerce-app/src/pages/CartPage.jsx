import { useSelector, useDispatch } from 'react-redux';
import { incrementQty, decrementQty, removeFromCart } from '../redux/cart/cartSlice';
import '../styles/cartPage.scss';

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="details">
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decrementQty(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="total-section">
            <h3>Total Amount: ${totalPrice}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
