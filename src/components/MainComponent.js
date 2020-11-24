import React, { Component } from 'react';
import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComp';
import Contact from './ContactComp';
import About from './AboutusComp';
import DishDetail from './DishDetailComp';
import Header from './HeaderComp';
import Footer from './FooterComp';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
//to connect main comp - which had state earlier, should now take state from redux store
//also see return part
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
// above func will map redux store state to props, "state" is returned from reducer.js
class Main extends Component {

  constructor(props) {
    super(props);

  }

  /*onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});

    below this was there
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        <Footer />
        exact path -> exactly match with nothing else beyond menu
        path -> anything with home
        redirect to home -> if url doesnt match to any defined path then takes to home default
  }*/

  render() {

      const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
      }

      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
      };

      
    return (
      <div>
        <Header />
        <div>
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />} />
              <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
//connect this main component to redux store by putting Main in connect
export default withRouter(connect(mapStateToProps)(Main));