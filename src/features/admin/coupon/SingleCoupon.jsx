import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCoupon } from '../../../slice/CouponSlice'
import { FileEarmarkXFill } from 'react-bootstrap-icons'
import ConfirmModal from '../../../components/ui/ConfirmModal'

const SingleCoupon = ({ coupon }) => {

  const [ showModal, setShowModal ] = useState(false)

  const dispatch = useDispatch()

    const onDelete = () => {
    setShowModal(true)
    }

    const onCancel = () => {
    setShowModal(false)
    }

    const onConfirm = () => {
    dispatch(deleteCoupon(coupon.id))
    }

  return (
    <tr key={coupon.id}>
        <td className='text-center'>{coupon.couponCode}</td>
        <td className='text-center'>{coupon.expiryDate}</td>
        <td className='text-center'>{coupon.userCount}</td>
        <td className='text-center'>{coupon.discount}</td>
        <td>
            <div className="d-flex justify-content-evenly pt-2">
            <FileEarmarkXFill color="red"  onClick={onDelete}/>
            </div>
        </td>{
            showModal && <ConfirmModal
            onClose={onCancel}
            onAction={onConfirm}
            title='Delete Confirmation'
            body={`Delete ${coupon.couponCode} ??`}
            />
        }
    </tr>
  )
}

export default SingleCoupon