import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCrew, getCrewStatus, getError } from '../slice/CrewSlice';
import { Spinner } from 'react-bootstrap';
import MovieCrew from '../features/admin/crew/MovieCrew';

const AdminMovieCrewPage = () => {
  const status = useSelector(getCrewStatus);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCrew());
    }
  }, [status, dispatch]);

  let content = ''
  if(status === 'loading') {
    content = (
      <div className="w-100 mt-5 d-flex justify-content-center">
        <Spinner animation="border" variant="secondary" />
      </div>
    )
  }

  if(status === ('success')) {
    content = <MovieCrew />
  }

  if(status === 'failed') {
    content = <p>{error}</p>
  }
  
  return (
    <article>
        {content}
    </article>
  )
}

export default AdminMovieCrewPage