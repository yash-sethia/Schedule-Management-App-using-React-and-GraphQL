import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_MY_SCHEDULE } from './currentscheduledisplay';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Icon } from 'semantic-ui-react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    root: {
      margin: theme.spacing(1)
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));




function Schedule(props) {

    const [ hover, setHover ] = useState(false);

    const REMOVE_TODO = gql`
    mutation removeSchedule ($id: Int!) {
      delete_Schedule(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
  `;

  const UPDATE_SCHEDULE = gql`
    mutation editSchedule ($id: Int!, $title: String!, $date: date, $startTime: time, $endTime: time) {
      update_todos(where: {id: {_eq: $id}}, _set: {title: $title, date: $date, startTime: $startTime, endTime: $endTime}) {
        affected_rows
      }
    }
  `;
  
  const [removeTodoMutation] = useMutation(REMOVE_TODO);
  const [updateScheduleMutation] = useMutation(UPDATE_SCHEDULE);

  function editSchedule(scheduleId, newTitle, newStartTime, newEndTime, newDate) {
    updateScheduleMutation({
      variables: {id: scheduleId, title: newTitle, startTime:newStartTime, endTime: newEndTime, date: newDate},
      optimisticResponse: true,
    });
  };
  
  function deleteSchedule(scheduleId)
  {
      removeTodoMutation({
          variables: {id: scheduleId},
          optimisticResponse: true,
          update: (cache) => {
            const existingSchedule = cache.readQuery({ query: GET_MY_SCHEDULE });
            const newSchedule = existingSchedule.Schedule.filter(t => (t.id !== scheduleId));
            cache.writeQuery({
              query: GET_MY_SCHEDULE,
              data: {Schedule: newSchedule}
            });
          }
        });
  }

  function editButtonClick(){
    return <Link to={{pathname: "/editschedule", state: {oldId: props.id, oldTitle: props.title, oldDate: props.date, oldStartTime: props.startTime, oldEndTime: props.endTime, editScheduleFunction: editSchedule}}} />
  }
  





    var monthNum = props.date[5] + props.date[6];
    var dateWords = props.date[8] + props.date[9];
    var month = "";

    switch(monthNum) {
        case "1": 
             month = "Jan";
             break;
        case "2": 
            month = "Feb"
            break;
            case "2": 
            month = "Feb"
            break;
        case "3": 
            month = "Mar"
            break;
        case "4": 
            month = "Apr"
            break;        
        case "5": 
            month = "May"
            break;        
        case "6": 
            month = "Jun"
            break;        
        case "7": 
            month = "Jul"
            break;        
        case "8": 
            month = "Aug"
            break;        
        case "9": 
            month = "Sept"
            break;        
        case "10": 
            month = "Oct"
            break;        
        case "11": 
            month = "Nov"
            break;
        case "12": 
            month = "Dec"
            break;
    }
    dateWords = month + " " + dateWords;


    const actualStartTime = props.startTime.substring(0, 5);
    const actualEndTime = props.endTime.substring(0, 5);
    console.log("Time  = ", props.startTime)
    const classes = useStyles();

    Date.prototype.timeNow = function () {
      return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }

    var currentTime = new Date()
    currentTime = currentTime.timeNow();
    
    return (
      <div className="schedule" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
          <Card raised className={classes.root} style={{backgroundColor: props.bgcolor}}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom style={{display: (props.startTime <= currentTime && props.endTime >= currentTime && props.today) ? "block" : "none", color: "red" }} >
                CURRENTLY HAPPENING
              </Typography>
              <Typography variant={props.today ? "h4" : "h5"} component="h2">
                {props.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Participants : {props.participants}
              </Typography>
              <Typography variant="body1" component="p">
                {(props.startTime <= currentTime && props.endTime >= currentTime) ? "Started at : " : "Starts at : " } {actualStartTime} <br />
                Ends at : {actualEndTime}
              </Typography>
            </CardContent>
            <CardActions>
              <div className="delete-button">
                <Link to={{
                    pathname: "/editschedule", 
                    state: {
                      oldId: props.id, 
                      oldTitle: props.title, 
                      oldDate: props.date, 
                      oldStartTime: props.startTime, 
                      oldEndTime: props.endTime, 
                      }
                  }}>
                    <IconButton aria-label="edit" className={classes.margin} style={{color: "#007bff", display: 'inline'}} >
                        <EditRoundedIcon />
                    </IconButton>
                </Link>

                <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteSchedule(props.id)} style={{color: "#007bff", display: 'inline'}} >
                    <DeleteIcon />
                </IconButton>
              </div>
            </CardActions>
          </Card>
        
      </div>
    );
}
export default Schedule;
