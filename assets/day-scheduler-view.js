"use strict";

/*
  Manage the rendering of components on the page.
 */
let DaySchedulerView = {

  /*
    The current date notice in the jumbotron.
   */
  currentDayText: {

    /*
      Show today's date on the top of the page. Expects a formatted date string.
     */
    show(formattedDate) {
      $(document).ready(() => {
        $("#currentDay").text(formattedDate);
      });
    }
  },


  /*
    This list of events in the main content area.
   */
  eventBlocks: {
    schedule: null,

    
    /*
      Callback to update the schedule view.
     */
    updateScheduleCallback: null,
    
    
    /*
      Callback to save an event to the schedule.
     */
    saveEventCallback: null,


    /*
      Show the schedule of events.
     */
    show() {
      this.updateScheduleCallback();

      $(document).ready(() => {
        $("#timeblock").empty();

        for (let eventItem of this.schedule.events) {
          let
            row = $("<div>")
              .addClass("form-row my-0")
              .append(this.getLabel(eventItem))
              .append(this.getInput(eventItem))
              .append(this.getButton(eventItem));

          $("#timeblock").append(row);
        }
      });
    },

    setCallbacks(updateScheduleCallback, saveEventCallback) {
      this.updateScheduleCallback = updateScheduleCallback;
      this.saveEventCallback = saveEventCallback;
    },

    
    /*
      Set the schedule view to newer information.
     */
    setSchedule(schedule) {
      this.schedule = schedule;
    },


    /*
      Return a label for a specified event.
     */
    getLabel(eventItem) {
      let
        hourDisplay = eventItem.hourBlockDisplay,
        
        div = $("<div>").addClass("col my-auto py-auto text-center"),
        label = $("<label>")
          .addClass("col-form-label")
          .attr("for", `input-${hourDisplay}`)
          .text(hourDisplay);

      return div.append(label);
    },


    /*
      Return a text input area for a specified event.
     */
    getInput(eventItem) {
      let
        hourDisplay = eventItem.hourBlockDisplay,
        bgTheme = this.bgTheme[eventItem.relativeTime],
        fontTheme = this.fontTheme[eventItem.relativeTime],

        div = $("<div>").addClass("col-10 mr-0 pr-0 my-0"),
        textarea = $("<textarea>")
          .addClass(`form-control bg-${bgTheme} text-${fontTheme}`)
          .attr("id", `input-${hourDisplay}`)
          .attr("data-value", eventItem.hourBlock)
          .attr("rows", 3)
          .text(eventItem.event);

      return div.append(textarea);
    },


    /*
      Return a save button for a specified event.
     */
    getButton(eventItem) {
      let
        hourDisplay = eventItem.hourBlockDisplay,
        bgTheme = this.bgTheme[eventItem.relativeTime],

        div = $("<div>").addClass("col ml-0 pl-0 py-auto my-0"),
        button = $("<button>")
          .addClass(`btn btn-outline-${bgTheme} h-100`)
          .attr("id", `submit-${hourDisplay}`)
          .attr("type", "submit")
          .text("Save")
          .on("click", event => {
            event.preventDefault();

            let
              textID = '#' + event.target.id.replace("submit", "input"),
              eventText = $(textID).val(),
              eventHour = parseInt($(textID).attr("data-value"));

            this.saveEventCallback(eventHour, eventText);
            this.show();              
          });

      return div.append(button);
    },


    /*
      Lookup table to match background color with relative time.
     */
    bgTheme: {
      before: "secondary",
      now: "danger",
      after: "success"
    },


    /*
      Lookup table to match font color with relative time.
     */
    fontTheme: {
      before: "light",
      now: "light",
      after: "light"
    },
  }
} 