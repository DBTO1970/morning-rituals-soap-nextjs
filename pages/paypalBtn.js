import { useEffect, useRef } from "react" 
import { postData } from '../utils/fetchData';


const PaypalBtn = ({total, address, phone, state, dispatch}) => {
    const refPaypalBtn = useRef()
    const { cart, auth, orders } = state
    
    useEffect(() => {
        paypal.Buttons({

            // Sets up the transaction when a payment button is clicked
            createOrder: function(data, actions) {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: total,
                  }
                }]
              });
            },
    
            // Finalize the transaction after payer approval
            onApprove: function(data, actions) {

              return actions.order.capture().then(function() {
                postData('order', { address, phone, cart, total }, auth.token)
                .then(res => {
                  if(res.err) return dispatch({type: 'NOTIFY', payload: { error: res.err}})

                  dispatch ({ type: 'ADD_CART', payload: [] })
                  const newOrder = {
                    ...res.newOrder,
                    user: auth.user
                  }

                  dispatch ({ type: 'ADD_ORDERS', payload: [...orders, res.newOrder] })
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