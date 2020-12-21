import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'; 
import { GET_MY_SCHEDULE } from './currentscheduledisplay'
import { Link , withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";



const ADD_SCHEDULE = gql `
mutation($title: String!, $date: date, $startTime: time, $endTime: time, $participants: Int!) {
    insert_Schedule(objects: {title: $title, date: $date, startTime: $startTime, endTime: $endTime, participants: $participants }) {
      affected_rows
      returning {
        id
        title
        date
        startTime
        endTime
        participants
      }
    }
  }

 `;


function NewSchedulePageSecond(props) {
    // console.log(props.location.state);
    const { title, date, participants } = props.location.state;
      const [ stitle, setStitle ] = useState(title);
      const [ sdate, setSdate ] = useState(date);
      const [ sparticipants, setSparticipants ] = useState(participants);
      const [ startTime, setStartTime ] = useState('');
      const [ endTime, setEndTime ] = useState('');
      const [ gc, setGC ] = useState(false);


  // handleChange(event) {
  //   const {name, value} = event.target
  //   this.setState({
  //       [name]: value
  //   })
  // }

  // scheduleInput(event) {
  //   const { value } = event.target;
  //   this.setState({schedule : value});
  // }

  // componentDidMount() {
    
  // }

  var gapi = window.gapi
  var CLIENT_ID = "736510754208-8l07kqt80e1vqntpp3f31mpqr7q9jsfe.apps.googleusercontent.com"
  var API_KEY = "AIzaSyBcly7tEicFpr-MEsBGHvRYyzdUE99oVXc"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"


    const handleClick = () => {
    if(gc){  
      gapi.load('client:auth2', () => {
        console.log('Client has been loaded')

        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })

        gapi.client.load('calendar', 'v3', () => console.log('Calender has been loaded !'))

        gapi.auth2.getAuthInstance().signIn().then(() => {
          console.log("connected")
          var event = {
            'summary': stitle,
            'location': 'New Delhi',
            'description': 'Meeting',
            'start': {
              'dateTime': String(sdate) + "T" + String(startTime) + ":00+05:30" ,
              'timeZone': 'Asia/Kolkata'
            },
            'end': {
              'dateTime': String(sdate) + "T" + String(endTime) + ":00+05:30",
              'timeZone': 'Asia/Kolkata'
            },
            // 'recurrence': [
            //   'RRULE:FREQ=DAILY;COUNT=0'
            // ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })

          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })

        })

  })}

  console.log(String(sdate) + "T" + String(startTime) + ":00-05:30")

  addSchedule(
    {variables: {
                  title: stitle, 
                  date: sdate,
                  participants: sparticipants,
                  startTime: startTime,
                  endTime: endTime
        }})

}

  const resetInput = () => {
      setStitle(title);
      setSdate(date);
      setSparticipants(participants);
      setStartTime('');
      setEndTime('');
    
  }

    const updateCache = (cache, {data}) => {
      // Fetch the todos from the cache
      const existingSchedule = cache.readQuery({
        query: GET_MY_SCHEDULE
      });
      // Add the new todo to the cache
      const newSchedule = data.insert_Schedule.returning[0];
      cache.writeQuery({
        query: GET_MY_SCHEDULE,
        data: {Schedule: [newSchedule, ...existingSchedule.Schedule]}
      });
    };


    const [addSchedule] = useMutation(ADD_SCHEDULE, { update: updateCache, onCompleted: resetInput });

      return (
        <div className="form">
          <div className="form-title">
            <h2>Enter details for new entry </h2>
          </div>
          <div className="form-fields">
            <Form> 
                <div className="form-start-time">
                  Start Time &nbsp;&nbsp;&nbsp;
                  <Form.Control type="time" onChange={(e) => setStartTime(e.target.value)} value={startTime} name="startTime" />
                </div>
                <div className="form-end-time">
                  End Time &nbsp;&nbsp;&nbsp;&nbsp;
                  <Form.Control type="time" onChange={(e) => setEndTime(e.target.value)} value={endTime} name="endTime" />
                </div>
                <div className="form-check-box">
                  <Form.Check type="checkbox" label="Form an Event on Google Calender" onChange={(e) => setGC(e.target.checked)} checked={gc}/>
                </div>
            </ Form>
          </div>

          <Link to='/'>
            <Button variant="outline-primary" onClick={handleClick}> 
                              Create 
            </Button>
          </Link>

        </div>
      );
    
}

export default withRouter(NewSchedulePageSecond);
