import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Schedule from './scheduletile';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

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
    borderRight: '2px solid rgba(0, 0, 0, 0.12)',
    // color: theme.palette.text.grayDark,
}
}));




function DaysAtTop() {

    const classes = useStyles();
    const classesItem = useStylesItem();
    // const displaySchedule = data.Schedule.map(item => (<Schedule id={item.id} date={item.date} title={item.title} startTime={item.startTime} endTime={item.endTime} participants={item.participants} />) )

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


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

    return (
        <div>
            <Grid container className={classes.root}>
                <Grid item lg={4} className={classesItem.root}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {dateNum}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[dayNum]}
                        </div>
                    </div>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item lg={2} alignItems="center" className={classesItem.root}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {d1.getDate()}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[(dayNum + 1) % 7]}
                        </div>
                    </div>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item lg={2} alignItems="center" className={classesItem.root}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {d2.getDate()}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[(dayNum + 2) % 7]}
                        </div>
                    </div>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item lg={2} alignItems="center" className={classesItem.root}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {d3.getDate()}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[(dayNum + 3) % 7]}
                        </div>
                    </div>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item lg={2}>
                    <div className="date-day-content">
                        <div className="date-display" style={{fontSize: '30px', color: 'grey'}}>
                            {d4.getDate()}
                        </div>
                        <div className="day-display" style={{fontSize: '20px', color: 'grey'}}>
                            {days[(dayNum + 4) % 7]}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
        );
    
}

export default DaysAtTop;


