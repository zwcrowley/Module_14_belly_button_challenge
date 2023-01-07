
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// function to create the drop down menu
function createDropDown(data) {
  // Get names as a var:
  names = data.names;
  // Select the id for the drop down menu and set as a var:
  select = d3.select("#selDataset")
  // Set up the dropdown menu by pulling the individual id and passing it to the select tag and creating an "option" child
  // using forEach to iterate through the individual ids:
  names.forEach((name) => {
    select.append("option").text(name).property("value", name);
  });
}

// Fetch the JSON data and run the following functions:
//  createDropDown = for creating the dropDownMenu
d3.json(url).then(function(data) {
  createDropDown(data)
});  
