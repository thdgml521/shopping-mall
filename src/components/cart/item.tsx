import {CartType, DELETE_CART, UPDATE_CART} from "../../graphql/cart";
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import { useMutation } from "react-query";
import { SyntheticEvent } from "react";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
    const queryClient = getClient()
    const { mutate: updateCart } = useMutation(
        ({id, amount }: {id: string, amount: number}) => graphqlFetcher(UPDATE_CART, { id, amount }),
        {
          onMutate: async({ id, amount }) => {
            await queryClient.cancelQueries(QueryKeys.CART)
            //Snapshot the previous value
            const prevCart = queryClient.getQueryData<{[key: string]: CartType }>(QueryKeys.CART)
            if(!prevCart) return prevCart

            const newCart = {
              ...(prevCart || {}),
              [id]: { ...prevCart[id], amount },
            }
            queryClient.setQueryData(QueryKeys.CART, newCart)
            return prevCart
          },
          onSuccess: newValue => {
            const prevCart = queryClient.getQueryData<{[key: string]: CartType }>(QueryKeys.CART)
            const newCart = {
              ...(prevCart || {}),
              [id]: newValue,
            }
            queryClient.setQueryData(QueryKeys.CART, newCart)
          },
        },
    )

    const { mutate: deleteCart } = useMutation(
        ({ id }: {id: string}) => graphqlFetcher(DELETE_CART, { id }),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.CART)
          }
      }
    )

    const handleUpdateAmount = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        updateCart({ id, amount})
      }

    const handleDeleteItem = () => {
      deleteCart({ id })
    }

    return (
        <li className="cart-item">
            <input type="checkbox" />
            <img src={imageUrl} />
            <p className="cart-item__price">{price}</p>
            <p className="cart-item__title">{title}</p>
            <input type="number" className="cart-item__amount" value={amount} onChange={handleUpdateAmount}/>
            <button className="cart-item__delete" type="button" onClick={handleDeleteItem}>삭제</button>
        </li>
    )
}
export default CartItem