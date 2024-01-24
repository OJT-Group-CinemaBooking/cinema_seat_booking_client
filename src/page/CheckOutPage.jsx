import React from 'react'
import PaymentForm from '../features/checkout/PaymentForm'
import OrderSummary from '../features/checkout/OrderSummary'

const CheckOutPage = () => {
  return (
    <>
      <PaymentForm/>
      <OrderSummary/>
    </>
  )
}

export default CheckOutPage