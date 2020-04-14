"use strict";

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

  start() {
    this.loadTodaysSchedule();
  },

  getTodayText() {
    return moment().format("dddd, MMMM Do");
  },

  loadTodaysSchedule() {
    let savedSchedule = localStorage.getItem("SavedSchedule");
    
    if (savedSchedule) {
      savedSchedule = JSON.parse(savedSchedule);
    }

    if (this.hasTodaysSchedule(savedSchedule)) {
        this.schedule = savedSchedule;
    } else {
        this.schedule = this.newSchedule();
        this.saveTodaysSchedule(this.schedule);
    }
  },

  saveTodaysSchedule() {
    localStorage.setItem("SavedSchedule", JSON.stringify(this.schedule));
  },

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

  hasTodaysSchedule(savedSchedule) {
    return moment().format("YYYY-MM-DD") === savedSchedule.date;
  },

  getSchedule() {
    for (let event of this.schedule.events) {
      let hourMoment = moment({hour: event.hourBlock});

      if (hourMoment.isBefore(moment())) {
        event.relativeTime = "before";
      }

      if (hourMoment.isSame(moment())) {
        event.relativeTime = "now";
      }

      if (hourMoment.isAfter(moment())) {
        event.relativeTime = "after";
      }
    }
    return this.schedule;
  },

  setSchudule(hourBlock, event) {
    this.schedule.events
      .filter(e => e.hourBlock === hourBlock)
      .forEach(e => e.event = event);

    this.saveTodaysSchedule();

    return this.schedule;
  }
}