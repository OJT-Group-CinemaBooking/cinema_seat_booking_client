import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import classes from './ComingSoonMovies.module.css'
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons'
import MonthlyMovies from './MonthlyMovies'

const ComingSoonMovies = ({ comingSoonMoiveList }) => {
  const monthNames = [
    'January',
    'Fabruary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const releaseYears = new Set(comingSoonMoiveList.map(movie => new Date(movie.releaseDate).getFullYear()))
  
  const releaseDates = comingSoonMoiveList.map(movie => movie.releaseDate)

  const [ selectedMonth, setSelectedMonth ] = useState(' ')
  
  const scrollRef = useRef()

  const onScrollLeft = () => {
      scrollRef.current.scrollLeft -= 100;
  }

  const onScrollRight = () => {
      scrollRef.current.scrollLeft += 100;
  }

  const onMonthBtnClick = (releaseDate) => {
    setSelectedMonth(releaseDate)
  }
  
  return (
    <>
    {/* slide */}
    <div className={classes.slide_container}>
      <div className={classes.slide_wapper}>
        <div className={classes.slide_btn+' '+classes.slide_btn_left}>
            <ArrowLeftCircle onClick={onScrollLeft}/>
        </div>
        <div className={classes.slide_list} ref={scrollRef}>
          {
            Array.from(releaseYears)
            .sort((y1,y2) => y1 - y2)
            .map(year => 
                {
                  const releaseDatesOfYear = releaseDates
                  .filter(date => new Date(date).getFullYear() === year)
                  const uniqueMonths = new Set(releaseDatesOfYear.map(date => new Date(date).getMonth()))
                  return Array.from(uniqueMonths)
                  .sort((m1,m2) => m1 - m2)
                  .map(uniqueMonth => {
                    const month = monthNames[uniqueMonth]
                    return <div key={`${month} ${year}`}>
                    <span className={classes.year}>{year}</span>
                    <div 
                    className={
                      `${classes.slide_item} 
                      ${(selectedMonth === `${month},${year}`) 
                      && classes.active}`
                    } 
                      onClick={() => {onMonthBtnClick(`${month},${year}`)}} >
                      {
                      month.substring(0,3)
                      }
                    </div>
                  </div>
                  })
                }  
            )
          }
        </div>
        <div className={classes.slide_btn+' '+classes.slide_btn_right}>
            <ArrowRightCircle onClick={onScrollRight}/>
        </div>
      </div>
    </div>  
    {/* slide */}
    <Container fluid>
      {
        Array.from(releaseYears)
        .sort((y1,y2) => y1 - y2)
        .map( 
          year => {
          const dates = releaseDates.filter(date => new Date(date).getFullYear() === year)
          const months = new Set(dates.sort((d1,d2) => new Date(d1) - new Date(d2)).map(date => new Date(date).getMonth()))
          return Array.from(months).map(
            monthIndex => 
            {
              const movies = comingSoonMoiveList
              .filter(
                movie => 
                new Date(movie.releaseDate).getFullYear() === year && 
                new Date(movie.releaseDate).getMonth() === monthIndex
              )
              const month = monthNames[monthIndex]
              return <MonthlyMovies 
              key={`${month},${year}`} 
              movies={movies}
              year={year}
              month={month} 
              selected={selectedMonth}/>
            }
          )
        })
      }
    </Container>
    </>
  )
}

export default ComingSoonMovies