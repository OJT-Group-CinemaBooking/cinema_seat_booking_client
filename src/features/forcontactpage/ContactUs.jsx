import React from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap'
import classes from "./ContactUs.module.css"

const ContactUs = () => {
  return (
    <Col md={6} sm={10} xs={10} className='mx-auto mt-5'>
    <Card className={classes.contact} style={{borderRadius:'20px',boxShadow:'5px 5px 10px rgba(131, 133, 134,1)'}}>
    <Card.Body className='text-white'>
            <h3 style={{textAlign:'center'}}>Contact Us</h3>
            <p>Please use this form to contact us and we will get back to you as soon as possible!</p>
            <Form >
                
                <Form.Group>
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control 
                        type='text'

                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='text'
                       
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control 
                        type='text'
                        
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        type='text'
                       
                        required
                    />
                </Form.Group>
                
                <Form.Group className='mt-2'>
                    <Button variant="outline-info" type='submit' >Send Message</Button>
                </Form.Group>
            </Form>
        </Card.Body>
    </Card>
</Col>
  )
}

export default ContactUs