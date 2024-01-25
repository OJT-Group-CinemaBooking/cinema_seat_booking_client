import React, { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import classes from './ComingSoonMovies.module.css'
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons'
import MonthlyMovies from './MonthlyMovies'

const ComingSoonMovies = () => {
  const months = [
    {
      id: 1,
      name: 'January'
    },
    {
      id: 2,
      name: 'Fabruary'
    },
    {
      id: 3,
      name: 'March'
    },
    {
      id: 4,
      name: 'April'
    },
    {
      id: 5,
      name: 'May'
    },
    {
      id: 6,
      name: 'June'
    },
    {
      id: 7,
      name: 'July'
    },
    {
      id: 8,
      name: 'August'
    },
    {
      id: 9,
      name: 'September'
    },
    {
      id: 10,
      name: 'October'
    },
    {
      id: 11,
      name: 'November'
    },
    {
      id: 12,
      name: 'December'
    },
  ]

  const [ selectedMonth, setSelectedMonth ] = useState(' ')
  
  const scrollRef = useRef()

  const onScrollLeft = () => {
      scrollRef.current.scrollLeft -= 100;
  }

  const onScrollRight = () => {
      scrollRef.current.scrollLeft += 100;
  }

  const onMonthBtnClick = (name) => {
    setSelectedMonth(name)
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
            months.map(month => 
            <div key={month.id} className={`${classes.slide_item} ${(selectedMonth === month.name) && classes.active}`} 
              onClick={() => {onMonthBtnClick(month.name)}} >
              {(month.name).substring(0,3)}
            </div>)
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
        months.map( month => <MonthlyMovies key={month.id} month={month.name} selected={selectedMonth}/>)
      }
    </Container>
    </>
  )
}

export default ComingSoonMovies