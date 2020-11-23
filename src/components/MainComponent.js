import React, { Component } from 'react';
import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComp';
import Contact from './ContactComp';
import About from './AboutusComp';
import DishDetail from './DishDetailComp';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComp';
import Footer from './FooterComp';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS,
    };
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
          return (
              <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]} 
               promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
               leader={this.state.leaders.filter((lead)=> lead.featured)[0]}
              />
          );
      }
      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
      };
      
    return (
      <div>        
        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />
              <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;