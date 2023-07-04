import {checkedCartState} from "../../recoils/cart";
import {useRecoilState} from "recoil";
import WillPay from "../willPay";
import PaymentModal from "./modal";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {EXECUTE_PAY} from "../../graphql/payment";
import {graphqlFetcher} from "../../queryClient";
import {useMutation} from "react-query";

type PayInfo = {
  id: string;
  amount: number;
}

type PaymentInfos = PayInfo[];
const Payment = () => {
  const navigate = useNavigate()
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
  const [modalShown, toggleModal] = useState(false)
  const {mutate: executePay } = useMutation(
      (payInfos: PaymentInfos) => graphqlFetcher(EXECUTE_PAY, payInfos)

  )
  const showModal = () => {
    toggleModal(true)
  }

  const proceed = () => {
    //결제 진행
    const payInfos = checkedCartData.map(({ id, amount }) => (
        { id, amount }
    ))
    executePay(payInfos)
    setCheckedCartData([])

    navigate('/products', {replace: true})
  }

  const cancel = () => {
    toggleModal(false)
  }
  return (
      <div>
        <WillPay submitTitle="결제하기" handleSubmit={showModal}/>
        <PaymentModal show={modalShown} proceed={proceed} cancel={cancel}/>
      </div>
  )
}

export default Payment