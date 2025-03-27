// Selecting calendar div
const calendarEl = document.getElementById("calendar");

// Initialize FullCalendar to show calendar
const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  // Loads events from local storage and refectesEvents data in UI.
  events: function (_fetchInfo, successCallback) {
    // fetches stored events from local storage
    successCallback(getEventsFromLocalStorage());
  },
});

// Render calendar
calendar.render();

// Selected mood variable
let selectedMood = null;
// Selecting mood section element
let moodDetails = document.getElementById("moods-section");

// Selecting save mood button
const saveBtn = document.getElementById("saveBtn");

// Getting all children of moodsDetails element
const moodsDetailsButton = moodDetails.children;

// Looping through moodsDetailsButton to find selected mood
for (let mood of moodsDetailsButton) {
  mood.addEventListener("click", function () {
    // Remove previous style from all mood buttons
    for (let btn of moodsDetailsButton) {
      btn.classList.remove("selected");
    }
    // Storing the selected mood
    selectedMood = mood.getAttribute("data-mood");

    // Updating the save mood button text
    saveBtn.innerText = `Save Mood = ${selectedMood}`;

    // Adding selected class style for clicked emoji
    mood.classList.add("selected");
  });
}

// Function to save mood and add into calendar
function saveMood() {
  if (selectedMood) {
    let today = new Date().toISOString().split("T")[0];

    // Remove only today's events, not past ones
    calendar.getEvents().forEach((event) => {
      if (event.start.toISOString().split("T")[0] === today) {
        event.remove();
      }
    });

    let moodEvent = {
      title: `Mood: ${selectedMood}`,
      start: today,
      end: today,
      allDay: true,
      backgroundColor: getMoodColor(selectedMood),
      textColor: "#2d3436",
    };

    // Saving it to local storage
    saveEventToLocalStorage(moodEvent);

    // Re-fetch events from local storage and render them
    calendar.refetchEvents();

    // Resetting values and removing classes
    selectedMood = null;
    saveBtn.innerText = "Save Mood";

    // Looping through moodsButton to remove previous selected mood
    for (let mood of moodsDetailsButton) {
      mood.classList.remove("selected");
    }
  } else {
    alert("Please select your mood for today");
  }
}

// Function to add background color according to selected mood
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
  let events = JSON.parse(localStorage.getItem("moodEvents")) || [];
  return events;
}

// Function to save mood events to local storage
function saveEventToLocalStorage(event) {
  let events = getEventsFromLocalStorage();

  // Remove any existing event for the same date
  events = events.filter((e) => e.start !== event.start);

  // Push the new event
  events.push(event);

  // Save to local storage
  localStorage.setItem("moodEvents", JSON.stringify(events));
}
