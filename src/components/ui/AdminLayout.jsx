import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdminSidebar from '../../features/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <Container fluid >
        <Row xs={2}>
            <AdminSidebar/>
            <Col xs='10'>
                <Outlet/>
            </Col>
        </Row>
    </Container>
  )
}

export default AdminLayout