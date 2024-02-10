import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CameraReels, FileEarmarkXFill, PencilSquare } from 'react-bootstrap-icons'
import { IMAGE_URL } from '../../config/baseURL'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { deleteCinema, getCinemaStatus, setCinemaStatusToIdle } from '../../../slice/CinemaSlice'
import { Image, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const SingleCinema = ({ cinema , newCinema }) => {

  const status = useSelector(getCinemaStatus)

    const [showImg, setShowImg] = useState(cinema.id !== Number(newCinema?.id))
    const [ showModal, setShowModal ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      if(!showImg) {
        const timeout = setTimeout(() => {
          setShowImg(true)
        }, 3500)
  
        return () => clearTimeout(timeout)
      }
    }, [showImg]);

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
        if(status === 'update_success') {
          dispatch(setCinemaStatusToIdle())
        }
        navigate(`/admin/cinema/${cinema.id}/update`)
      }
      
    const navigateToTheater = () => {
      navigate(`/admin/cinema/${cinema.id}/theater`)
    }
  return (
    <tr key={cinema.id}>
    <td className="ps-3">
    { showImg?
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
      />: 
      <Spinner animation="border" variant="secondary" />
    }
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