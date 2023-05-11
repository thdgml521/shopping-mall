import { graphqlFetcher, QueryKeys } from '../../queryClient'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ProductDetail from '../../components/product/detail'
import { GET_PRODUCT, Products } from '../../graphql/products'

const ProductDetailPage = () => {
  const {id} = useParams()
  const {data} = useQuery<Products>([QueryKeys.PRODUCTS, id], () =>
      graphqlFetcher(GET_PRODUCT, id)
  )
  console.log(data)
  if(!data) return null;

  return (
      <div>
        <h2>상품상세</h2>
        <ProductDetail item={data}/>
      </div>
  )
}

export default ProductDetailPage