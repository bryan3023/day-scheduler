"use strict";

let DaySchedulerView = {

  /*
    The current date notice in the jumbotron.
   */
  currentDayText: {

    /*

     */
    show(formattedDate) {
      $("#currentDay").text(formattedDate);
    }
  },


  eventBlocks: {
    schedule: null,

    updateScheduleCallback: null,
    saveEventCallback: null,

  //   <div class="form-row my-0">
  // </div>

    show() {
      this.updateScheduleCallback();
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
    },

    setCallbacks(updateScheduleCallback, saveEventCallback) {
      this.updateScheduleCallback = updateScheduleCallback;
      this.saveEventCallback = saveEventCallback;
    },

    setSchedule(schedule) {
      this.schedule = schedule;
    },

  //   <div class="col my-auto py-auto text-center">
  //     <label class="col-form-label" for="event-9am">9am</label>
  //   </div>

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


  //   <div class="col-10 mr-0 pr-0 my-0">
  //     <textarea class="form-control bg-success" id="exampleFormControlTextarea1" rows="3"></textarea>
  //   </div>

    getInput(eventItem) {
      let
        hourDisplay = eventItem.hourBlockDisplay,
        colorTheme = this.colorTheme[eventItem.relativeTime],

        div = $("<div>").addClass("col-10 mr-0 pr-0 my-0"),
        textarea = $("<textarea>")
          .addClass(`form-control bg-${colorTheme}`)
          .attr("id", `input-${hourDisplay}`)
          .attr("name", eventItem.hourBlock)
          .attr("rows", 3)
          .text(eventItem.event);

      return div.append(textarea);
    },


  //   <div class="col ml-0 pl-0 py-auto my-0">
  //     <button class="btn btn-outline-success h-100" type="submit">Save</button>
  //   </div>

    getButton(eventItem) {
      let
        hourDisplay = eventItem.hourBlockDisplay,
        colorTheme = this.colorTheme[eventItem.relativeTime],

        div = $("<div>").addClass("col ml-0 pl-0 py-auto my-0"),
        button = $("<button>")
          .addClass(`btn btn-outline-${colorTheme} h-100`)
          .attr("id", `submit-${hourDisplay}`)
          .attr("type", "submit")
          .text("Save")
          .on("click", event => {
            event.preventDefault();

            let
              textID = '#' + event.target.id.replace("submit", "input"),
              textValue = $(textID).val(),
              textName = parseInt($(textID).attr("name"));

            alert(textName)

            this.saveEventCallback(textName, textValue);
            this.show();
              
          });

      return div.append(button);
    },


    colorTheme: {
      before: "secondary",
      now: "danger",
      after: "success"
    }
  }
} 