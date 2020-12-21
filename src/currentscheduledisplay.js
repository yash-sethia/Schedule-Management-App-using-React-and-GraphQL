import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Schedule from './scheduletile';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import DaysAtTop from './daysAtTop';
import { makeStyles } from '@material-ui/core/styles';
import { propTypes } from 'react-bootstrap/esm/Image';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const GET_MY_SCHEDULE = gql`
    query getMySchedules {
        Schedule(order_by: {date: asc, startTime: asc}) {
          id
          title
          participants
          date
          startTime
          endTime
        }
      }`;


const CLEAR_COMPLETED = gql`
    mutation ScheduleDone ($today: date) {
      delete_Schedule(where: {date: {_lt: $today}}) {
        affected_rows
      }
    }
    `;



    const useStyles = makeStyles((theme) => ({
      root: {
      //   width: 'fit-content',
        width: '90vw',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.grayDark,
        marginLeft: '5vw',
        '& hr': {
          margin: theme.spacing(0, 0.5),
        },
      },
    }));
  
  const useStylesItem = makeStyles((theme) => ({
  root: {
      border: '2px solid rgba(0, 0, 0, 0.12)',
      // borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
      // color: theme.palette.text.grayDark,
  }
  }));
    


function CurrentScheduleDisplay(props) {
        const [ update, changeUpdate ] = useState(false);

        const { loading, error, data } = useQuery(GET_MY_SCHEDULE);

        const [clearCompletedSchedule] = useMutation(CLEAR_COMPLETED);

        const theme = useTheme();

        const matchesUp = useMediaQuery(theme.breakpoints.up('md'));
        const matchesDown = useMediaQuery(theme.breakpoints.up('lg'));
        const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));

        Date.prototype.timeNow = function () {
          return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
        }

        useEffect(() => {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          var currDate = yyyy + '-' + mm + '-' + dd;
          var currTime = today.timeNow()
      }, []);

      const classes = useStyles();
      const classesItem = useStylesItem();

      
        if (loading) {
          return <div className="loader">< CircularProgress /></div>;
        }
        if (error) {
          console.error(error);
          return <div>Error!</div>;
        }


    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bgcolors = ["#ffff99", "#80ff80", "#99b3ff", "#ff99e6"]


    var d = new Date()
    var dateNum = d.getDate()
    var dayNum = d.getDay()

    var d1 = new Date()
    d1.setDate(dateNum + 1)

    var d2 = new Date()
    d2.setDate(dateNum + 2)

    var d3 = new Date()
    d3.setDate(dateNum + 3)

    var d4 = new Date()
    d4.setDate(dateNum + 4)


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    

    var currDate = yyyy + '-' + mm + '-' + dd;
    var currDate1 = yyyy + '-' + mm + '-' + d1.getDate();
    var currDate2 = yyyy + '-' + mm + '-' + d2.getDate();
    var currDate3 = yyyy + '-' + mm + '-' + d3.getDate();
    var currDate4 = yyyy + '-' + mm + '-' + d4.getDate();
    var currTime = today.timeNow()

    var temp = -1
    const displaySchedule0 = data.Schedule.map(item => {
      var meetDate = item.date[8] + item.date[9]
      if(item.date == currDate && item.endTime > currTime){
        temp = temp + 1;
        return(<Schedule id={item.id} today={true} date={item.date} title={item.title} startTime={item.startTime} endTime={item.endTime} participants={item.participants} bgcolor={bgcolors[temp % 4]} />);
      }
    } )
    const displayScheduleOne = data.Schedule.map(item => {
      var meetDate = item.date[8] + item.date[9]
      if(item.date === currDate1 ){
        temp = temp + 1;
        return(<Schedule id={item.id} today={false} date={item.date} title={item.title} startTime={item.startTime} endTime={item.endTime} participants={item.participants} bgcolor={bgcolors[temp % 4]} />);
      }
    } )
    // console.log(displaySchedule0)
    const displaySchedule2 = data.Schedule.map(item => {
      var meetDate = item.date[8] + item.date[9]
      if(item.date === currDate2 ){
        temp = temp + 1;
        return(<Schedule id={item.id} today={false} date={item.date} title={item.title} startTime={item.startTime} endTime={item.endTime} participants={item.participants} bgcolor={bgcolors[temp % 4]} />);
      }
    } )
    const displaySchedule3 = data.Schedule.map(item => {
      var meetDate = item.date[8] + item.date[9]
      if(item.date === currDate3 ){
        temp = temp + 1;
        return(<Schedule id={item.id} today={false} date={item.date} title={item.title} startTime={item.startTime} endTime={item.endTime} participants={item.participants} bgcolor={bgcolors[temp % 4]} />);
      }
    } )
    const displaySchedule4 = data.Schedule.map(item => {
      var meetDate = item.date[8] + item.date[9]
      if(item.date === currDate4 ){
        temp = temp + 1;
        return(<Schedule id={item.id} today={false} date={item.date} title={item.title} startTime={item.startTime} endTime={item.endTime} participants={item.participants} bgcolor={bgcolors[temp % 4]} />);
      }
    } )


    if(props.location !== undefined && props.location.state.hasUpdates === true) {
        window.location.reload()
        changeUpdate(!update)
    }

    return (
        <div className="display-schedule">
            <Grid container className={classes.root}>
                <Grid item xs={12} lg={4} md={matchesUp && !matchesDown ? 3 : 4} sm={matchesSmall && !matchesUp ? 4 : 3}>
                    <Grid item xs={12} className={classesItem.root}>
                      <div className="date-day-content">
                          <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                              {dateNum}
                          </div>
                          <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                              {days[dayNum]}
                          </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      {displaySchedule0}
                    </Grid>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item xs={12} lg={2} md={matchesUp && !matchesDown ? 3 : 2} sm={matchesSmall && !matchesUp ? 4 : 3} alignItems="center">
                  <Grid item xs={12} className={classesItem.root}>
                      <div className="date-day-content">
                          <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                              {d1.getDate()}
                          </div>
                          <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                              {days[(dayNum + 1) % 7]}
                          </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      {displayScheduleOne}
                    </Grid>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item lg={2} xs={12} md={matchesUp && !matchesDown ? 3 : 2} sm={matchesSmall && !matchesUp ? 4 : 3} alignItems="center">
                  <Grid item xs={12} className={classesItem.root}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {d2.getDate()}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[(dayNum + 2) % 7]}
                        </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    {displaySchedule2}
                  </Grid>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item lg={2} xs={12} md={matchesUp && !matchesDown ? 3 : 2} alignItems="center" style={{display: matchesSmall && !matchesUp ? "none" : "initial"}}>
                  <Grid item xs={12} className={classesItem.root}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {d3.getDate()}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[(dayNum + 3) % 7]}
                        </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    {displaySchedule3}
                  </Grid>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item xs={12} lg={2} md={matchesUp && !matchesDown ? 3 : 2} style={{display: (matchesUp && !matchesDown) || (matchesSmall && !matchesUp) ? "none" : "initial"}}>
                  <Grid item xs={12} className={classesItem.root}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {d4.getDate()}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[(dayNum + 4) % 7]}
                        </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    {displaySchedule4}
                  </Grid>
                </Grid>
            </Grid>
            {/* {displaySchedule} */}
            {/* <Grid container className={classes.root}>
              
              
              
              
              
            </Grid> */}
        </div>
        );
    // return (
    //   <div>
    //       <Schedule date="6" month="Nov" title="Meeting with Bill Gates" startTime="9am" endTime="5pm" participants="10" />
    //       <Schedule date="6" month="Nov" title="Meeting with Bill Gates" startTime="9am" endTime="5pm" participants="10" />
    //       <Schedule date="6" month="Nov" title="Meeting with Bill Gates" startTime="9am" endTime="5pm" participants="10" />
    //       <Schedule date="6" month="Nov" title="Meeting with Bill Gates" startTime="9am" endTime="5pm" participants="10" />
    //       <Schedule date="6" month="Nov" title="Meeting with Bill Gates" startTime="9am" endTime="5pm" participants="10" />
    //   </div>
    
}

export default CurrentScheduleDisplay;
export {GET_MY_SCHEDULE};


