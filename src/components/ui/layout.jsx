import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from '../layout/Header'

const Layout = () => {
  return (
     <Container fluid className='p-0'>
      <Header/>
        <main>
            <Outlet />
        </main>
     </Container>
  )
}

export default Layout