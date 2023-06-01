import { Link } from 'react-router-dom'
import { Product } from '../../graphql/products'
import { ADD_CART } from '../../graphql/cart'
import { Query, useMutation, useQuery } from "react-query";
import {graphqlFetcher, QueryKeys} from "../../queryClient";

const ProductItem =
    ({ id, imageUrl, price, title, description, createdAt }:
         Product) => {
      const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }))
      return (
         <li className="product-item">
           <Link to={`/products/${id}`}>
             <p className="product-item__title">{title}</p>
             <img className="product-item__image"src={imageUrl}/>
             <span className="product-item__price">{price}</span>
             <p className="product-item__description">{description}</p>
           </Link>
           <button className="product-item__add-cart" onClick={() => addCart(id)}>
             담기
           </button>
         </li>
      )
    }

export default ProductItem