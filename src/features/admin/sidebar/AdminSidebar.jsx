import React, { useState } from 'react'
import classes from './AdminSidebar.module.css'
import { Col } from 'react-bootstrap'
import { CameraReels, ClipboardPlus, Film, HouseGearFill, PersonVideo, TicketPerforated } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCrewStatusToIdle } from '../../../slice/CrewSlice'
import { setCinemaToIdle } from '../../../slice/CinemaSlice'
import { setCouponToIdle } from '../../../slice/CouponSlice'


const AdminSidebar = () => {

  const [ page, setPage ] = useState(' ');
const navigate = useNavigate()
const dispatch = useDispatch()
  
const onChangePage = (name) => {
  setPage(name)
  navigate(name)
}

const onCrewChangeIdle = () => {
  dispatch(setCrewStatusToIdle())
}

const onCinemaChangeIdle = () => {
  dispatch(setCinemaToIdle())
}
const onCouponChangeIdle = () => {
  dispatch(setCouponToIdle())
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
        className={`${classes.items} ${page === 'movie/new' && classes.active}`} 
        onClick={() => {onChangePage('movie/new')}}>
        <span className={classes.icons}><ClipboardPlus/></span><p className={classes.content}>Add Movie</p>
      </div>
      <div 
        className={`${classes.items} ${page === 'crew' && classes.active}`} 
        onClick={() => {onChangePage('crew');onCrewChangeIdle()}}>
        <span className={classes.icons}><PersonVideo/></span><p className={classes.content}>Movie Crew</p>
      </div>
      <div 
        className={`${classes.items} ${page === 'cinema' && classes.active}`} 
        onClick={() => {onChangePage('cinema');onCinemaChangeIdle()}}>
        <span className={classes.icons}><CameraReels/></span><p className={classes.content}>Cinema</p>
      </div>
      <div 
        className={`${classes.items} ${page === 'coupon' && classes.active}`} 
        onClick={() => {onChangePage('coupon');onCouponChangeIdle()}}>
        <span className={classes.icons}><TicketPerforated/></span><p className={classes.content}>Coupon</p>
      </div>
    </Col>
  )
}

export default AdminSidebar