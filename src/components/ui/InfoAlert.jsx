import React from 'react'
import { Alert } from 'react-bootstrap'

const InfoAlert = ({ information, variant, onHide }) => {

  const onClose = () => {
      onHide()
  }

  return (
    <Alert variant={variant} onClose={onClose} dismissible className='w-100'>
      <Alert.Heading>{information}</Alert.Heading>
    </Alert>
  )
}

export default InfoAlert