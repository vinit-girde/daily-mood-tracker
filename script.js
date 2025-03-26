// selecting calender div id
const calendarEl = document.getElementById("calendar");

// Initialize FullCalendar to show calender
const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  // adding events from local storage
  events: getEventsFromLocalStorage(),
});

// Rendering calender
calendar.render();

// selected mood variable
let selectedMood = null;
// Selecting mood section element
let moodDetails = document.getElementById("moods-section");

// selecting save mood button
const saveBtn = document.getElementById("saveBtn");

// Getting all children of moodsDetails element
const moodsDetailsButton = moodDetails.children;

// looping through moodsDetailsButton to find selected mood
for (let mood of moodsDetailsButton) {
  mood.addEventListener("click", function () {
    // Remove previous style from all mood buttons
    for (let btn of moodsDetailsButton) {
      btn.classList.remove("selected");
    }
    // storing the selected mood
    selectedMood = mood.getAttribute("data-mood");

    // adding the selected mood in save mood button inner text
    saveBtn.innerText = `Save Mood = ${selectedMood}`;

    // adding selected class style for clicked emoji
    mood.classList.add("selected");
  });
}

// Function to save mood and log into calender.
function saveMood() {
  if (selectedMood) {
    let moodEvent = {
      title: `Mood: ${selectedMood}`,
      start: new Date().toISOString(),
      allDay: true,
      backgroundColor: getMoodColor(selectedMood),
      textColor: "#2d3436",
    };
    //adding selected mood for todays date
    calendar.addEvent(moodEvent);

    // saving it to local storage.
    saveEventToLocalStorage(moodEvent);

    // resetting values and removing classes
    selectedMood = null;
    saveBtn.innerText = "Save Mood";

    // looping through moodsButton to remove previous selected mood
    for (let mood of moodsDetailsButton) {
      // remove previous style from all mood buttons
      mood.classList.remove("selected");
    }
  } else {
    alert("Please select your mood for today");
  }
}

// Function to add background color according to selected Mood
function getMoodColor(mood) {
  switch (mood) {
    case "Happy":
      return "#a8e063";
    case "Sad":
      return "#82ccdd";
    case "Angry":
      return "#ff7675";
    case "Neutral":
      return "#dfe6e9";
    case "Excited":
      return "#ffeaa7";
    case "Stressed":
      return "#fab1a0";
    case "Calm":
      return "#b2bec3";
    default:
      return "white";
  }
}

// Function to retrieve stored mood events from local storage
function getEventsFromLocalStorage() {
  // Retrieving previous mood events data and returning the events
  const events = JSON.parse(localStorage.getItem("moodEvents")) || [];
  return events;
}
// Function to save mood events to local storage.
function saveEventToLocalStorage(event) {
  // get all previous mood events and push new event
  const events = getEventsFromLocalStorage();
  events.push(event);
  // saving item to local storage
  localStorage.setItem("moodEvents", JSON.stringify(events));
}
