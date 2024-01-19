import React, { useState } from 'react'
import classes from './AdminSidebar.module.css'
import { Col } from 'react-bootstrap'
import { Film, HouseGearFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'


const AdminSidebar = () => {

  const [ page, setPage ] = useState(' ');
const navigate = useNavigate()
  
const onChangePage = (name) => {
  setPage(name)
  navigate(name)
}
  return (
    <Col xs='2' className={classes.sidebar_col}>
      <div className={classes.sidebar_title}>
        <span className={classes.icons}><HouseGearFill/></span><h5 className={classes.content}>DASHBOARD</h5>
      </div>
      <div 
        className={`${classes.items} ${page === 'movie' && classes.active}`} 
        onClick={() => {onChangePage('movie')}}>
        <span className={classes.icons}><Film/></span><p className={classes.content}>Movies</p>
      </div>
      <div 
        className={`${classes.items} ${page === 'new-movie' && classes.active}`} 
        onClick={() => {onChangePage('new-movie')}}>
        <span className={classes.icons}><Film/></span><p className={classes.content}>Add Movie</p>
      </div>
      <div 
        className={`${classes.items} ${page === 'crew' && classes.active}`} 
        onClick={() => {onChangePage('crew')}}>
        <span className={classes.icons}><Film/></span><p className={classes.content}>Movie Crew</p>
      </div>
    </Col>
  )
}

export default AdminSidebar