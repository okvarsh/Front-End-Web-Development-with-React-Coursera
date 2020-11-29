import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,Modal, ModalHeader, ModalBody,Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors, Field } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';
//import CommentForm from './CommentForm';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
        this.props.postComment(this.props.dishId, values.rating, values.firstname, values.message);

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
                                    minLength: 'Must be atleast 3 characters; ',
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
}
    function RenderDish({dish}) {
        return (
        <div className = "col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
                </Card>
            </FadeTransform>
        </div>
        );
    }

    function RenderComments({comments, postComment, dishId}) {
        console.log('DishDetail render is invoked')
        if (comments != null)
        {
            const comListItem = comments.map((comment)=>{
                return (
                    <Fade in>
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                    </Fade>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                        {comListItem}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            );
        }
        else{
            return (<div></div>);
        }
    };
    //props is coming in as the parameter
    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        {
            return (
            <div class = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish= {props.dish} />
                    <RenderComments comments = {props.comments}  postComment={props.postComment} dishId={props.dish.id}/>
                </div>
            </div>
            );
        }
        else {
            return (<div></div>)
        }
    }

export default DishDetail;