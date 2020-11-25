/*Not using this, copy pasted in dishdetailcomp.js*/

import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Row, Label, Col } from 'reactstrap';
import { Control, LocalForm, Errors, Field } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component {
    constructor(props) {
        super(props);   
     
        this.state = {
          
          isModalOpen: false
        };
     
        this.toggleModal=this.toggleModal.bind(this);

      }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
        
    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col md={{size:12}}>
                            <Label htmlFor="rating">Rating</Label> 
                            <Control.select model=".rating" id="rating" name="Rating" className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select> 
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:12}}>
                            <Label htmlFor="firstname">Your Name</Label> 
                            <Control.text model=".firstname" id="firstname" name="firstname"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                    />
                            <Errors
                                className="text-danger"
                                model=".firstname"
                                show="touched" //shows only if text-box is touched
                                messages={{
                                    required: 'Required; ',
                                    minLength: 'Must be greater than 2 characters; ',
                                    maxLength: 'Must be 15 characters or less; '
                                }}
                                />
                            </Col>    
                        </Row>
                        <Row className="form-group">
                        <Col md={{size:12}}>
                            <Label htmlFor="message">Comment</Label>
                                <Control.textarea model=".message" id="message" name="message"
                                    rows="6"
                                    className="form-control" />  
                        </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10}}>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </div>)
    }
    /*render() {
      return (
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>

                        <FormGroup>
                            <Label htmlFor="username">Your name</Label>
                            <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input} />
                        </FormGroup>
                        
                        <FormGroup>
                                <Label htmlFor="message">Your Comment</Label>
                                
                                    <Input type="textarea" id="message" name="message"
                                        rows="6"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}></Input>
                                
                            </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
        
      );
    }*/
  }
  export default CommentForm;