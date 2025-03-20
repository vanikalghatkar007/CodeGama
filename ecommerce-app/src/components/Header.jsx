import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import '../styles/header.scss';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCountItems = cartItems.length

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CodeGama Shop</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          <FaShoppingCart size={20} />
          <span className="cart-count">{totalCountItems}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
