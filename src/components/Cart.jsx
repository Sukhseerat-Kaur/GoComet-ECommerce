import deliveryIcon from '../assets/delivery.png';
import { removeItem, incItem, decItem } from '../redux/slices/Cartslice';
import delIcon from '../assets/delete.png';
import { useDispatch, useSelector } from 'react-redux';
import './cart.scss';
import { toggleCart } from '../redux/slices/showCartSlice';

export default function Cart() {
  const showCartVal = useSelector((state) => state.showCart.value);
  const selectedItem = useSelector((state) => state.cart);
  let totalPrice = 0;
  const dispatch = useDispatch();
  return (
    <div
      className={
        showCartVal
          ? 'h-screen w-screen bg-black bg-opacity-80 fixed z-20 top-0 flex justify-center items-center overflow-y-auto'
          : 'hidden'
      }
      onClick={() => dispatch(toggleCart())}
    >
      {selectedItem.length > 0 ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="border-black border h-full"
        >
          {selectedItem.map((item, idx) => {
            totalPrice += parseInt(item.price) * parseInt(item.quantity + 1);
            return (
              <div className="cart-item flex" key={idx}>
                <div className="cart-item-image-container">
                  <img
                    className="cart-item-image"
                    src={item.img}
                    alt="cartImage"
                  />
                </div>

                <div>
                  <div className="price-del">
                    <div className="cart-item-title">{item.title}</div>
                    <img
                      className="del-icon cursor-pointer"
                      src={delIcon}
                      alt="del-Icon"
                      onClick={() => {
                        dispatch(removeItem(item.id));
                        console.log(item.id);
                      }}
                    />
                  </div>
                  <div className="wishlist-container">
                    {item.description.slice(0, 75)}
                  </div>
                  <div className="cart-item-price">
                    <span className="discounted-price">
                      ₹ {item.price * (item.quantity + 1).toFixed(2)}
                    </span>

                    <span className="actual-price">
                      {(
                        (item.price / 10 + item.price) *
                        (item.quantity + 1)
                      ).toFixed(2)}
                    </span>

                    <span className="off-span"> (10% off) </span>

                    <div className="qnt-wl">
                      <span>
                        <span>
                          QUANTITY :{' '}
                          <button
                            className={
                              item.quantity + 1 === 5
                                ? 'max inc-btn'
                                : 'inc-btn'
                            }
                            onClick={() => {
                              dispatch(incItem(item.id));
                            }}
                          >
                            +
                          </button>
                          {item.quantity + 1}
                          <button
                            className={
                              item.quantity === 0 ? 'min dec-btn' : 'dec-btn'
                            }
                            onClick={() => dispatch(decItem(item.id))}
                          >
                            -
                          </button>
                        </span>
                      </span>
                    </div>

                    <div className="delivery-info">
                      <img
                        src={deliveryIcon}
                        alt="Delivery"
                        className="delivery-icon"
                      />
                      <div>
                        Delivery expected 15 April !
                        <span className="free-tag">FREE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="text-xl text-white font-bold
        "
        >
          No items inside cart
        </div>
      )}
      <div className="text-xl absolute font-bold text-white top-10 right-10">
        Total Price:
        <br />
        {totalPrice}
      </div>
    </div>
  );
}
