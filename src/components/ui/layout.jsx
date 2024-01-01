import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
     <Container fluid className='p-0'>
        <main>
            <Outlet />
        </main>
     </Container>
  )
}

export default Layout