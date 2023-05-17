import style from "./styles.module.scss"

export default function Mpesa({ total, order_id}) {
   
    
    return (
      <Elements stripe={stripePromise}>
        <Form total={total} order_id={order_id} />
      </Elements>
    );
  }