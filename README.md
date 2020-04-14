# gw-homework05

## Synopsis

This is a simple app that allows a user to create an hour-by-hour schedule during business hours (9am to 5pm) for the current day. The schedule for the current day will be saved in local storage, but it will overwritten the next day. Each event block is color-coded to indicate where an event is relative to the current time.

[Try it here.](https://bryan3023.github.io/gw-homework05/)

## Implementation

Like the previous project, this organizes JavaScript around an MVC pattern. I found this made it a lot easier to figure out to get started and think about what belongs where.

All date and time calculations are implemented via [Moment.js](https://momentjs.com/).