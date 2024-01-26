import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from '../layout/Header'
import Footer from './Footer'

const Layout = () => {
  return (
     <Container fluid className='p-0'>
      <Header/>
        <main>
            <Outlet />
        </main>
      <Footer />
     </Container>
  )
}

export default Layout