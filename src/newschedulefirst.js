import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'; 
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'

class NewSchedulePageFirst extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      title: "",
      date: "",
      participants: ""
    }

    this.handleChange=this.handleChange.bind(this);

  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
        [name]: value
    })
  }

  render() {
    
      return (
        <div className="form">
          <div className="form-title">
            <h2>Enter details for new entry </h2>
          </div>
          <div className="form-fields">
            <Form> 
                <div className="form-title">
                  <Form.Control type="text" placeholder="Title" onChange={this.handleChange} value={this.state.title} name="title" />
                </div>
                <div className="form-date">
                  <Form.Control type="date" onChange={this.handleChange} value={this.state.date} name="date" />
                </div>
                <div className="form-participants">
                  <Form.Control type="number" placeholder="No. of participants" onChange={this.handleChange} value={this.state.participants} name="participants" />
                </div>
            </ Form>
          </div>
          <Link to={{
                pathname: "/NewSchedulePageTwo",
                state : {
                    title: this.state.title,
                    date: this.state.date,
                    participants: this.state.participants
                }
              }}>
            <Button variant="outline-primary"> Next </Button>
          </Link>

           {/* <p>
            Date: {dataArray[0]}
          </p> */}
         {/* <p>
            Title: {this.state.title}
          </p>
          <p>
            Participants: {this.state.participants}
          </p> */}

        </div>
      );
    }
}

export default withRouter(NewSchedulePageFirst) ;