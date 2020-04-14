"use strict";

let DaySchedulerController = {
  model: null,
  view: null,

  start() {
    this.model = DaySchedulerModel;
    this.view = DaySchedulerView;

    this.model.start();
    this.view.currentDayText.show(this.model.getTodayText());
  }
}

DaySchedulerController.start();