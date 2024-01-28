import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CameraReels, FileEarmarkXFill, PencilSquare } from 'react-bootstrap-icons'
import { IMAGE_URL } from '../../config/baseURL'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { deleteCinema } from '../../../slice/CinemaSlice'
import { Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { fetchTheaterByCinemaId } from '../../../slice/TheaterSlice'

const SingleCinema = ({ cinema }) => {

    const [ showModal, setShowModal ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onDelete = () => {
        setShowModal(true)
      }
    
      const onCancel = () => {
        setShowModal(false)
      }
    
      const onConfirm = () => {
        dispatch(deleteCinema(cinema.id))
      }
    
      const onNavigateDetail = () => {
        navigate(`/admin/cinema/${cinema.id}/update`)
      }
      
    const navigateToTheater = () => {
      navigate(`/admin/cinema/${cinema.id}/theater`)
      dispatch(fetchTheaterByCinemaId(cinema.id))
    }
  return (
    <tr key={cinema.id}>
    <td className="ps-3">
      <Image
        src={`${IMAGE_URL}/cinema/${cinema.id}.jpg`}
        alt="cinema"
        style={{
            width: '2rem',
            aspectRatio: '1/1',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '.5rem'
        }}
      />
    </td>
    <td>{cinema.name}</td>
    <td>{cinema.location}</td>
    <td className='text-center'>
      <CameraReels color='#D4AF37' onClick={navigateToTheater} />
    </td>
    <td>
      <div className="d-flex justify-content-evenly pt-2">
        <PencilSquare color="#0079FF" onClick={onNavigateDetail}/>
        <FileEarmarkXFill color="red"  onClick={onDelete}/>
      </div>
    </td>{
      showModal && <ConfirmModal
        onClose={onCancel}
        onAction={onConfirm}
        title='Delete Confirmation'
        body={`Delete ${cinema.name} ??`}
      />
    }
  </tr>
  )
}

export default SingleCinema