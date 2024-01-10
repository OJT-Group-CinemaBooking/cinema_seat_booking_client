import React from 'react'
import PaymentForm from '../feature/checkout/PaymentForm'
import OrderSummary from '../feature/checkout/OrderSummary'

const CheckOutPage = () => {
  return (
    <>
        <PaymentForm/>
        <OrderSummary/>
    </>
  )
}

export default CheckOutPage