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
    var names = data.names;
    // Select the id for the drop down menu and set as a var:
    var select = d3.select("#selDataset");
    // Set up the dropdown menu by pulling the individual id and passing it to the select tag and creating an "option" child using forEach to iterate through the individual ids:
    names.forEach((name) => {
      select.append("option").text(name).property("value", name);  
      });
  }

  // Function to initialize all the first id for the charts and panel with the first Id = 940, passes that name to getData(), the on event in the next function will updata once a new id is selected from the dropdown menu:
  function init() {
    var firstName = data.names[0];
    getData(firstName); 
    // makeBarChart(firstName);

  }
  
  // On change event int this function will updata once a new id is selected from the dropdown menu and then call getData()
  d3.selectAll("#selDataset").on("change", getData);

  // Function called by onchange in the drop down Menu, this gets the data from the chosen ID for the metadata for the panel demo table and the sample data for the charts:
  function getData() {
    // Assign the value of the dropdown menu option to a variable:
    var dataValue = d3.select("#selDataset").property("value");
    // First, the metadata for the panel demo table:
    // Set metadata to a var:
    var metadata = data.metadata;
    // Filter the metadata to find the id that was selected in the dropdownMenu (dataValue)):
    var chosenMetadata = metadata.filter(meta => meta.id == dataValue);  
    console.log("Result Array: ",chosenMetadata) 
    var chosenMeta = chosenMetadata[0]  

    // Call "updatePanel" function to update the panel with the new metadata:
    updatePanel(chosenMeta);

    // Next, get data for the bar chart and the bubble chart:
    // Set samples to a var:
    var samples = data.samples;
    // Filter the samples to match the chosen value in the dropdown menu= dataValue, add [0] to the end to pull out that sample key:
    var sampleMatched = samples.filter(s => s.id.toString() === dataValue)[0];

    // Call "makeBarChart" function to pass the sampleMatched to it: 
    makeBarChart(sampleMatched); 
    // Call "makeBubbleChart" function to pass the sampleMatched to it: 
    makeBubbleChart(sampleMatched); 
  }

  // Function to make the horz bar chart:
  function makeBarChart(newdata) {
    // Set all the vars in the array of sampleMatched (newdata) to object vars to build the charts, slice the top 10 and reverse them:
    var otu_ids = newdata.otu_ids.slice(0, 10).reverse();
    var otu_labels = newdata.otu_labels.slice(0, 10).reverse();
    var sample_values = newdata.sample_values.slice(0, 10).reverse();

    // Re-format the otu_ids as labels for the y-axis:
    var y_labels = otu_ids.map(otu_id => `OTU ${otu_id}`);   

    // Trace1 for the top 10 belly button data: 
    var trace1 = {
      x: sample_values,
      y: y_labels, 
      text: otu_ids,
      hovertext: otu_labels,
      name: "beboBar",
      type: "bar",
      orientation: "h"
    };

    // add the trace1 to a barData array:
    var barData = [trace1];

    // Apply a title to the layout and margins, pull the ID for the title:
    let layout = {
      title: `Top Ten OTUs in ID: ${newdata.id}`, 
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "bar", and pass barData and layout:
    Plotly.newPlot("bar", barData, layout); 
  }

  // Function to make the bubble chart:
  function makeBubbleChart(newdata) {
    // Set all the vars in the array of sampleMatched (newdata) to object vars to build the charts:
    var otu_ids = newdata.otu_ids;
    var otu_labels = newdata.otu_labels;
    var sample_values = newdata.sample_values;

    // Set up trace2 with as the data for the bubble chart:
    var trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels, 
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: 'Earth',
        size: sample_values,
        sizeref: 1.6, 
      }
    };

    // Add the trace2 to bubbleData array:
    var bubbleData = [trace2];

    // Apply a title to the layout and turn off legend, pull the ID for the title:
    var layout = {
      title: `Bubble Chart of OTUs in ID: ${newdata.id}`, 
      showlegend: false,
    };
    
    // Render the plot to the div tag with id "bubble", and pass bubbleData and layout, Plot the new plot in the bubble div: 
    Plotly.newPlot('bubble', bubbleData, layout); 

  }
  

  // Function to update the demographic panel with the chosen metadata's new info:
  function updatePanel(newdata) {
    // Set the div of id="sample-metadata" to panel
    var panel = d3.select("#sample-metadata");

    // Clear previous selection in the panel:
    panel.html("");

    // function to capitalize first letter in panel key-value pairs:
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    // Add each key and value pair in the chonen metadata to a new header- h5 - seperated by a colon:
    Object.entries(newdata).forEach(([key, value]) => {
      var key = capitalizeFirstLetter(key);
      panel.append("h5").text(`${key}: ${value}`);    
    });    
  } 

  // // Update the all of the plots using restyled plot's values
  // function updatePlotly(newdata) {
  //   Plotly.restyle("pie", "values", [newdata]);
  // }

  // Run the functions to create the dropdown menu and initilize the charts:
  createDropDown(data);  
  init();
  console.log("Original Data: ",data);

});    
