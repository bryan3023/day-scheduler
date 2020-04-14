"use strict";

/*
  Initialize the scheduler and respond to events.
 */
let DaySchedulerController = {

  model: null,
  view: null,


  /*
    Entry point. Initialize the model and set the initial view state.
   */
  start() {
    this.model = DaySchedulerModel;
    this.view = DaySchedulerView;

    this.model.start();

    this.view.currentDayText.show(this.model.getTodayText());

    this.view.eventBlocks.setCallbacks(
      () => DaySchedulerController.updateSchedule(),
      (hourBlock, event) => DaySchedulerController.addEvent(hourBlock, event)
    );
    this.view.eventBlocks.show();
  },


  /*
    Update the view with the current schuduled events.
   */
  updateSchedule() {
    this.view.eventBlocks.setSchedule(this.model.getSchedule());
  },


  /*
    Add an event to the schedule.
   */
  addEvent(hourBlock, event) {
    this.model.setEvent(hourBlock, event);
  }
}

DaySchedulerController.start();