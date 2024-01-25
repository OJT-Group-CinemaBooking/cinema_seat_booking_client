import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../features/admin/sidebar/AdminSidebar'

const AdminLayout = () => {
  return (
    <Container fluid >
        <Row xs={2}>
            <AdminSidebar/>
            <Col xs='10' style={{backgroundColor:"rgba(2, 20, 33)"}}>
                <Outlet/>
            </Col>
        </Row>
    </Container>
  )
}

export default AdminLayout