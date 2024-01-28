import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { fetchAllCoupon, getAllCoupon, getCouponError, getCouponStatus } from '../slice/CouponSlice'
import Coupon from '../features/admin/coupon/Coupon'

const AdminCouponPage = () => {
    const allCoupon = useSelector(getAllCoupon)
    const status = useSelector(getCouponStatus)
    const error = useSelector(getCouponError)

  const dispatch = useDispatch()

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchAllCoupon())
    }
  },[dispatch,status])

  let content = ''

  if(status.includes('_success') || status === 'create_failed'){
    content = <Coupon coupon={allCoupon} />
  }

  if(status === 'loading'){
    content = (
    <div className="w-100 mt-5 d-flex justify-content-center">
      <Spinner animation="border" variant="secondary" />
    </div>
    )
  }

  if(status === 'fetch_fail') {
    content = <p>{error}</p>
  }

  return (
    <article>
      {content}
    </article>
  )
}

export default AdminCouponPage