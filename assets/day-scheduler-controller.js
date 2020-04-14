"use strict";

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

  updateSchedule() {
    this.view.eventBlocks.setSchedule(this.model.getSchedule());
  },

  addEvent(hourBlock, event) {
    this.model.setEvent(hourBlock, event);
  }
}

DaySchedulerController.start();