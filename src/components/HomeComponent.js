import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';

function RenderCard({item}) {
  //item designation is there only for leader so we use it when it's not null
  //jsx allows us to do the above in our app
  return(
      <Card>
          <CardImg src={item.image} alt={item.name} />
          <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
          <CardText>{item.description}</CardText>
          </CardBody>
      </Card>
  );
}

function Home(props) {
    return(
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <RenderCard item={props.dish} />
          </div>
          <div className="col-12 col-md m-1">
            <RenderCard item={props.promotion} />
          </div>
          <div className="col-12 col-md m-1">
            <RenderCard item={props.leader} />
          </div>
        </div>
      </div>
    );
}

export default Home;   