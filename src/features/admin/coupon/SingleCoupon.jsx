import React from 'react'

const SingleCoupon = ({ coupon }) => {

  return (
    <tr key={coupon.id}>
        <td className='text-center'>{coupon.couponCode}</td>
        <td className='text-center'>{coupon.expiryDate}</td>
        <td className='text-center'>{coupon.userCount}</td>
        <td className='text-center'>{coupon.discount}</td>
    </tr>
  )
}

export default SingleCoupon