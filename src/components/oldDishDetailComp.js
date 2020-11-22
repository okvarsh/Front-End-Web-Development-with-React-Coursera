import React, { Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    componentDidMount(){
        console.log('DishDetil component componentDidMount is invoked');
    }
    componentDidUpdate(){
        console.log('DishDetail componentDidUpdate is invoked')
    }
    renderDish(dish) {
        return (
        <div className = "col-12 col-md-5 m-1">
            <Card>
            <CardImg src = {this.props.dish.image} alt={this.props.dish.name}/>
            <CardBody>
                <CardTitle>
                    {this.props.dish.name}
                </CardTitle>
                <CardText>
                    {this.props.dish.description}
                </CardText>
            </CardBody>
            </Card>
        </div>
        );
    }
    renderComments(comments) {
        console.log('DishDetail render is invoked')
        if (comments != null)
        {
            const comListItem = comments.map((comment)=>{
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comListItem}
                    </ul>
                </div>
            );
        }
        else{
            return (<div></div>);
        }
    };
    render() {
        if(this.props.dish != null)
        {
            return (
            <div class = "container">
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
            );
        }
        else {
            return (<div></div>)
        }
    }
}

export default DishDetail;
