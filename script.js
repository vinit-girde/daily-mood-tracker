// variables
let selectedMood = null;

// Inititalization code for displaying calender
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();
});

// Function to save mood and log into calender.
function saveMood() {
  console.log("Mood saved");
}
