"use strict";

/*
  Manage the internal state of the scheduler.
 */
let DaySchedulerModel = {

  /*
    Format:
      {
        date: "2020-04-13",
        events: [
          {
            hourBlock: 9,
            hourBlockDisplay: "9am",
            event: "My event",
            relativeTime: "before"
          },
          ...
        ]
      }
   */
  schedule: null,

  
  /*
    Initialize the model.
   */
  start() {
    this.loadTodaysSchedule();
  },

  
  /*
    Get today's date, formatted for the page.
   */
  getTodayText() {
    return moment().format("dddd, MMMM Do");
  },


  /*
    Get the saved schedule from local storage. If the schedule does not
    exist, or if the day is for a previous day, create a new one.
   */
  loadTodaysSchedule() {
    let savedSchedule = localStorage.getItem("SavedSchedule");
    
    if (savedSchedule) {
      savedSchedule = JSON.parse(savedSchedule);

      if (this.hasTodaysSchedule(savedSchedule)) {
        this.schedule = savedSchedule;
      }
    }
    
    if (!this.schedule) {
        this.schedule = this.newSchedule();
        this.saveTodaysSchedule(this.schedule);
    }
  },

  
  /*
    Save the current schedule to local storage.
   */
  saveTodaysSchedule() {
    localStorage.setItem("SavedSchedule", JSON.stringify(this.schedule));
  },


  /*
    Return a new schedule for creating events during business hours today.
   */
  newSchedule() {
    const
      startHour = 9,
      endHour = 17;
  
    let
      currentHour = startHour,
      schedule = {
        date: moment().format("YYYY-MM-DD"),
        events: []
      };
    
    while (currentHour <= endHour) {
      let currentMoment = moment({hour: currentHour});

      schedule.events.push({
        hourBlock: parseInt(currentMoment.format("H")),
        hourBlockDisplay: currentMoment.format("ha"),
        event: null
      });

      currentHour++;
    }

    return schedule;
  },


  /*
    Does the saved schedule match today's date?
   */
  hasTodaysSchedule(savedSchedule) {
    return moment().format("YYYY-MM-DD") === savedSchedule.date;
  },


  /*
    Return the current schedule with added relative time context.
   */
  getSchedule() {
    this.setRelativeTime();
    return this.schedule;
  },

  
  /*
    Set the fields for each event to describe where it falls in relation
    to the current time.
   */
  setRelativeTime() {
    for (let event of this.schedule.events) {
      let
        eventMoment = moment({hour: event.hourBlock}),
        now = moment();

      if (eventMoment.isBefore(now, "hour")) {
        event.relativeTime = "before";
      }

      if (eventMoment.isSame(now, "hour")) {
        event.relativeTime = "now";
      }

      if (eventMoment.isAfter(now, "hour")) {
        event.relativeTime = "after";
      }
    }
  },


  /*
    Add a new event to the specified hour block and save changes.
   */
  setEvent(hourBlock, event) {
    this.schedule.events
      .filter(e => e.hourBlock === hourBlock)
      .forEach(e => e.event = event);

    this.saveTodaysSchedule();
  }
}