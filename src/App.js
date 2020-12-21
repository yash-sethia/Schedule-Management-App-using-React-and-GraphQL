import React from 'react';
import Header from './Header';
import Button from 'react-bootstrap/Button'; 
import CurrentScheduleDisplay from './currentscheduledisplay'
import NewSchedulePageFirst from './newschedulefirst';
import NewSchedulePageSecond from './newschedulesecond'
import EditSchedule from './editschedule';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://direct-zebra-73.hasura.app/v1/graphql'
      // headers: {
      //   Authorization: `Bearer ${authToken}`
      // }
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Agenda: {
          fields: {
            Schedule: {
              merge(existing = [], incoming = []) {
                console.log("Inside merge function : ", existing)
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
  });
 };


class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }



  render() {


    const client = createApolloClient();

    const CurrentSchedule = () => {
      return(
        <div>
          <CurrentScheduleDisplay />
        </div>
      );
    }

    const NewSchedulePageOne = () => {
      return(
        <NewSchedulePageFirst location={this.props.location} />
      );
    }

    const NewSchedulePageTwo = () => {
      return(
        <NewSchedulePageSecond location={this.props.location} />
      );
    }
    const EditSchedulePage = () => {
      return(
        <EditSchedule location={this.props.location} />
      );
    }

    return (
      <ApolloProvider client={client}>
        <div className="App">
          
          <Header />
          <Router>
            <Switch>

              <Route exact path="/" component={CurrentSchedule} />
              <Route path="/NewSchedulePageOne" component={NewSchedulePageOne} />
              <Route path="/NewSchedulePageTwo" component={NewSchedulePageTwo} />
              <Route path="/editschedule" component={EditSchedulePage} />

            </Switch>
          </Router>
        </div>
      </ApolloProvider>
    );
}
}

export default App;


// Client ID: 289335272894-0jh7vfkce1ctfvv5ebjjjkll0tq42b52.apps.googleusercontent.com

// API Key: AIzaSyApXQpcYHX6wuzBEZ9rUu7ieUZsvilqJ3A