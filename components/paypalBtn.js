import { useEffect, useRef, useContext } from "react" 
import { patchData } from '../utils/fetchData';
import { DataContext } from "../store/GlobalState";
import { updateItem } from "../store/Actions";

const PaypalBtn = ({order}) => {
    const refPaypalBtn = useRef()
    const {state, dispatch} = useContext(DataContext)
    const { auth, orders } = state
    
    useEffect(() => {
        paypal.Buttons({

            // Sets up the transaction when a payment button is clicked
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: order.total,
                  }
                }]
              });
            },
    
            // Finalize the transaction after payer approval
            onApprove: function(data, actions) {

              return actions.order.capture().then(function(details) {
                
                patchData(`order/payment/${order._id}`, {
                  paymentId: details.payer.payer_id
                }, auth.token)
                .then(res => {
                  if(res.err) return dispatch({type: 'NOTIFY', payload: { error: res.err}})

                  dispatch (updateItem(orders, order._id, {
                    ...order, 
                    paid: true, 
                    dateOfPayment: details.create_time,
                    paymentId: details.payer.payer_id, 
                    method: 'Paypal'
                  }, 'ADD_ORDERS'))

                  return dispatch({type: 'NOTIFY', payload: { success: res.msg}})
                })
                
              
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // var element = document.getElementById('paypal-button-container');
                // element.innerHTML = '';
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
            }
          }).render(refPaypalBtn.current);
    }, [])

    
    return(
        <div ref={refPaypalBtn}>

        </div>
    )
}

export default PaypalBtn