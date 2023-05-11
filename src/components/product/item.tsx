import {Product} from "../../type";

const ProductItem = ({
     category,
     description,
     id,
     image,
     price,
     rating,
     title,
}: Product) => (
    <li className="product-item">
        <p className="product-item__category">{category}</p>
        <p className="product-item__title">{title}</p>
        {/* <p className="product-item__description">{description}</p> */}
        <img className="product-item__image"src={image}/>
        <span className="product-item__price">{price}</span>
        <span className="product-item__rating">{rating.rate}</span>
    </li>
)

export default ProductItem