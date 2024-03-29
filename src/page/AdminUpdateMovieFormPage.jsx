import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCrew, getAllDirectors, getAllStarrings, getCrewStatus } from '../slice/CrewSlice'
import UpdateMovieForm from '../features/admin/movie/UpdateMovieForm'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../slice/MovieSlice'

const AdminUpdateMovieFormPage = () => {
    const { movieId } = useParams()
    const movie = useSelector((state) => getMovieById(state, movieId))
    
    const crewStatus = useSelector(getCrewStatus)
    const starrings = useSelector(getAllStarrings)
    const directors = useSelector(getAllDirectors)
    const dispatch = useDispatch()
    
    useEffect( () => {
        if(crewStatus === 'idle') {
            dispatch(fetchAllCrew())
        }
    },[crewStatus,dispatch])
    const generes =[
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Animation' },
    { id: 4, name: 'Biography' },
    { id: 5, name: 'Comedy' },
    { id: 6, name: 'Crime' },
    { id: 7, name: 'Coming of Age' },
    { id: 8, name: 'Documentary' },
    { id: 9, name: 'Drama' },
    { id: 10, name: 'Espionage' },
    { id: 11, name: 'Family' },
    { id: 12, name: 'Fantasy' },
    { id: 13, name: 'Film Noir' },
    { id: 14, name: 'History' },
    { id: 15, name: 'Horror' },
    { id: 16, name: 'Music' },
    { id: 17, name: 'Musical' },
    { id: 18, name: 'Mystery' },
    { id: 19, name: 'Mockumentary' },
    { id: 20, name: 'Parody' },
    { id: 21, name: 'Period Drama' },
    { id: 22, name: 'Psychological Thriller' },
    { id: 23, name: 'Romance' },
    { id: 24, name: 'Sport' },
    { id: 25, name: 'Superhero' },
    { id: 26, name: 'Supernatural' },
    { id: 27, name: 'Science Fiction' },
    { id: 28, name: 'Satire' },
    { id: 29, name: 'Silent Film' },
    { id: 30, name: 'Surreal' },
    { id: 31, name: 'Thriller' },
    { id: 32, name: 'Teen' },
    { id: 33, name: 'True Crime' },
    { id: 34, name: 'Techno Thriller' },
    { id: 35, name: 'Tragedy' },
    { id: 36, name: 'Urban' },
    { id: 37, name: 'War' },
    { id: 38, name: 'Western' },
    { id: 39, name: 'Zombie' },
    ]

    let existedGeneres = [];
    if(movie) {
        for(const movieGenere of movie.movieGenere) {
            existedGeneres.push(movieGenere.genere)
        }
    }

    let existedCrews = [];
    if(movie) {
        for(const movieCrew of movie.movieCrew) {
            existedCrews.push(movieCrew.crew)
        }
    }
    
    let content = ''
    if(crewStatus === 'loading') {
        content = (
            <div className="w-100 mt-5 d-flex justify-content-center">
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }
    if(crewStatus === 'success') {
        content = <UpdateMovieForm movie={movie} existedGeneres={existedGeneres} existedCrews={existedCrews} generes={generes} starrings={starrings} directors={directors}/>
    }
  return (
    <article>
        {content}
    </article>
  )
}

export default AdminUpdateMovieFormPage