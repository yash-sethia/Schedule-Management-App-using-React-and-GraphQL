import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'; 
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_MY_SCHEDULE } from './currentscheduledisplay';

function EditSchedule(props) {
    const [ id, setId ] = useState(props.location.state.oldId);
    const [ title, setTitle ] = useState(props.location.state.oldTitle);
    const [ date, setDate ] = useState(props.location.state.oldDate);
    const [ startTime, setStartTime ] = useState(props.location.state.oldStartTime);
    const [ endTime, setEndTime ] = useState(props.location.state.oldEndTime);

    console.log("End Time not working : ", endTime)
    console.log("End Time not working : ", startTime)


    const UPDATE_SCHEDULE = gql`
    mutation editSchedule ($id: Int!, $title: String!, $date: date, $startTime: time, $endTime: time) {
      update_Schedule(where: {id: {_eq: $id}}, _set: {title: $title, date: $date, startTime: $startTime, endTime: $endTime}) {
        affected_rows
      }
    }
  `;
  
  const [updateScheduleMutation] = useMutation(UPDATE_SCHEDULE);

  function editSchedule(scheduleId, newTitle, newStartTime, newEndTime, newDate) {
    updateScheduleMutation({
      variables: {id: scheduleId, title: newTitle, startTime:newStartTime, endTime: newEndTime, date: newDate},
      optimisticResponse: true,
    })
    console.log("Edited data is as follows: ")
    console.log("title : ", title)
  };
  

    function handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    function handleClick() {
            this.props.location.state.EditScheduleFunction(this.state.id, this.state.title, this.state.startTime, this.state.endTime, this.state.date);
            // scheduleId, newTitle, newStartTime, newEndTime, newDate
        }

      console.log("this.props.location.state = : ", props.location)

      return (
        <div className="form">
          <div className="form-title">
            <h2>Edit details </h2>
          </div>
          <div className="form-fields">
            <Form> 
                <div className="form-title">
                  <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} name="title" />
                </div>
                <div className="form-date">
                  <Form.Control type="date" onChange={(e) => setDate(e.target.value)} value={date} name="date" />
                </div>
                <div className="form-start-time">
                  Start Time &nbsp;&nbsp;&nbsp;
                  <Form.Control type="time" onChange={(e) => setStartTime(e.target.value)} value={startTime} name="startTime" />
                </div>
                <div className="form-end-time">
                  End Time &nbsp;&nbsp;&nbsp;
                  <Form.Control type="time" onChange={(e) => setEndTime(e.target.value)} value={endTime} name="endTime" />
                </div>
            </ Form>
          </div>
          <div className="edit-button">
            <Link to={{
              pathname: "/",
              state: {
                hasUpdated: true
              }
            }}>
            <Button variant="outline-primary" onClick={()=> {editSchedule(id, title, startTime, endTime, date)}} style={{width: 'auto'}}> 
              Edit 
            </Button>
            </Link>
          </div>
        </div>
      );
    }

export default withRouter(EditSchedule) ;