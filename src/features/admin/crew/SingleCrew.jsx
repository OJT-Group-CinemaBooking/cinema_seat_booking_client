import React, { useEffect, useState } from 'react'
import { FileEarmarkXFill, PencilSquare } from 'react-bootstrap-icons'
import ConfirmModal from '../../../components/ui/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { IMAGE_URL } from "../../config/baseURL";
import { deleteCrew, getCrewUpdateStatus, setCrewUpdateStatusToIdle } from '../../../slice/CrewSlice';
import { Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const SingleCrew = ({ crew, newCrew }) => {

  const status = useSelector(getCrewUpdateStatus)
  const [showImg, setShowImg] = useState(crew.id !== Number(newCrew?.id))
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
  
  const onNavigateUpdate = () => {
    if(status === 'success') {
      dispatch(setCrewUpdateStatusToIdle())
    }
    navigate(`/admin/crew/${crew.id}/update`)
  }

  const onDelete = () => {
    setShowModal(true)
  }

  const onCancel = () => {
    setShowModal(false)
  }

  const onConfirm = () => {
    dispatch(deleteCrew(crew.id))
  }


  return (
    <tr key={crew.id}>
        <td className="ps-3">
            { showImg?
              <Image
              src={`${IMAGE_URL}/crew/${crew.id}.jpg`}
              alt="movie_crew"
              style={{
                  width: '2rem',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '.5rem'
              }}
              /> : 
              <Spinner animation="border" variant="secondary" />
            }
        </td>
        <td>{crew.name}</td>
        <td>{crew.role}</td>
        <td>
            <div className="d-flex justify-content-evenly pt-2">
            <PencilSquare color="#0079FF" onClick={onNavigateUpdate}/>
            <FileEarmarkXFill color="red"  onClick={onDelete}/>
            </div>
        </td>{
            showModal && <ConfirmModal
            onClose={onCancel}
            onAction={onConfirm}
            title='Delete Confirmation'
            body={`Delete ${crew.name} ??`}
            />
        }
    </tr>
  )
}

export default SingleCrew