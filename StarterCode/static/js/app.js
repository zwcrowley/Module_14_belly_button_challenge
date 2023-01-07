// Module 14- Belly Button Challenge
// By: Zack Crowley

// Save url for belly button JSON data:
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending for the belly button JSON data:
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and start to run the following functions to complete all of the dashboard requirements:
d3.json(url).then(function(data) {
  

  // Function to create the drop down menu using "names" from the belly button JSON data:
  function createDropDown(data) {
    // Get names as a var:
    let names = data.names;
    console.log("Names Data: ",names) 
    // Select the id for the drop down menu and set as a var:
    let select = d3.select("#selDataset");
    // Set up the dropdown menu by pulling the individual id and passing it to the select tag and creating an "option" child using forEach to iterate through the individual ids:
    names.forEach((name) => {
      select.append("option").text(name).property("value", name);  
      });
  }

  // 
  function init() {
    var firstName = data.names[0];
    getmetaData(firstName); 
    // buildBarChart(firstName);

  }
  
  
  // On change to the DOM, call getmetaData()
  d3.selectAll("#selDataset").on("change", getmetaData);

  // 
  function optionChanged(selectObject) {
    getmetaData(selectObject)
    console.log("selected: ", selectObject)
  } 

  // Function called by DOM changes:
  function getmetaData() {
    // let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable:
    let dataValue = d3.select("#selDataset").property("value");
    console.log("Chosen value: ", dataValue)  

    // Set metadata to a var:
    let metadata = data.metadata;
    // Filter the metadata to find the id that was selected in the dropdownMenu (dataValue)):
    let chosenMetadata = metadata.filter(sample => sample.id == dataValue);  
    console.log("Result Array: ",chosenMetadata) 
    let chosenMeta = chosenMetadata[0] 
    
    // Call function to update the panel:
    updatePanel(chosenMeta);
  }

  // Update the restyled plot's values
  function updatePanel(newdata) {
    // Set the div of id="sample-metadata" to panel
    let panel = d3.select("#sample-metadata");

    // Clear previous selection:
    panel.html("");

    // function to capitalize first letter in panel key-value pairs:
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    // Add each key and value to a new header seperated by a colon:
    Object.entries(newdata).forEach(([key, value]) => {
      var key = capitalizeFirstLetter(key) 
      panel.append("h5").text(`${key}: ${value}`);    
    });    
  } 

  // // Update the all of the plots using restyled plot's values
  // function updatePlotly(newdata) {
  //   Plotly.restyle("pie", "values", [newdata]);
  // }

  createDropDown(data);  
  init();
  console.log("Original Data: ",data);

});    
