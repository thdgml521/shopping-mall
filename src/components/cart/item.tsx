import { CartType } from "../../graphql/cart";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
    return (
        <li className="cart-item">
          {id} {imageUrl} {price} {title} {amount}
        </li>
    )
}

export default CartItem