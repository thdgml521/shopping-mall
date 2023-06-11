import { CartType, UPDATE_CART } from "../../graphql/cart";
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

    const handleUpdateAmount = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        updateCart({ id, amount})
      }
    return (
        <li className="cart-item">
            <img src={imageUrl} />
            <p className="cart-item__price">{price}</p>
            <p className="cart-item__title">{title}</p>
            <input type="number" className="cart-item__amount" value={amount} onChange={handleUpdateAmount}/>
        </li>
    )
}
export default CartItem