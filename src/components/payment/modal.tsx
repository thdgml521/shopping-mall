import {createPortal} from "react-dom";
import {ReactChild} from "react";

const ModalPortal = ({children}: { children: ReactChild }) => {
  return createPortal(children, document.getElementById('modal'))
}
const PaymentModal = ({show, proceed, cancel}: { show: boolean; proceed: () => void; cancel: () => void }) => {
  return show ? (
      <ModalPortal>
        <div className={`modal ${show ? 'show' : ''}`}>
          <div className="modal__inner">
            <p>정말 결제 할까요?</p>
            <div>
              <button onClick={proceed}>예</button>
              <button onClick={cancel}>아니요</button>
            </div>
          </div>
        </div>
      </ModalPortal>
  ) : null;
}

export default PaymentModal