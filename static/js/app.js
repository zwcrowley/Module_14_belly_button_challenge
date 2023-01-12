// Module 14- Belly Button Challenge
// By: Zack Crowley

// Save url for belly button JSON data:
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending for the belly button JSON data:
var dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and start to run the following functions to complete all of the dashboard requirements:
d3.json(url).then(function(data) {
  
  // Function to create the drop down menu using "names" from the belly button JSON data:
  function createDropDown(data) {
    // Get names as a var:
    let names = data.names;
    // Select the id for the drop down menu and set as a var:
    let select = d3.select("#selDataset");
    // Set up the dropdown menu by pulling the individual id and passing it to the select tag and creating an "option" child using forEach to iterate through the individual ids:
    names.forEach((name) => {
      select.append("option").text(name).property("value", name);  
      });
  }

  // Function to initialize the first id for the charts and panel with the first Id = 940, passes that name to getData(), the on event in the next function will updata once a new id is selected from the dropdown menu:
  function init() {
    var firstName = data.names[0];
    getData(firstName); 
  }
  
  // On change event: This function will updata once a new id is selected from the dropdown menu and then call getData()
  d3.select("#selDataset").on("change", getData); 

  // Function called by onchange in the drop down Menu, this gets the data from the chosen ID for the metadata for the panel demo table and the sample data for the charts:
  function getData() {
    // Assign the value of the dropdown menu option to a variable:
    let dataValue = d3.select("#selDataset").property("value");
    // First, the metadata for the panel demo table:
    // Set metadata to a var:
    let metadata = data.metadata;
    // Filter the metadata to find the id that was selected in the dropdownMenu (dataValue)):
    let chosenMetadata = metadata.filter(meta => meta.id == dataValue);  
    let chosenMeta = chosenMetadata[0]  

    // Call "updatePanel" function to update the panel with the new metadata:
    updatePanel(chosenMeta);

    // Next, get data for the bar chart and the bubble chart:
    // Set samples to a var:
    let samples = data.samples;
    // Filter the samples to match the chosen value in the dropdown menu= dataValue, add [0] to the end to pull out that sample key:
    let sampleMatched = samples.filter(s => s.id === dataValue)[0]; 

    // Pass sampleMatched to all of the charts:
    // Call "makeBarChart" function to pass the sampleMatched to it: 
    makeBarChart(sampleMatched); 
    // Call "makeBubbleChart" function to pass the sampleMatched to it: 
    makeBubbleChart(sampleMatched); 
    // Call "makeGaugeChart" function to pass the sampleMatched to it: 
    makeGaugeChart(chosenMeta); 

  }

  // Function to make the horizontal bar chart for top ten OTU IDS for the chosen subject ID:
  function makeBarChart(newdata) {
    // Set all the vars in the array of sampleMatched (newdata) to object vars to build the charts, slice the top 10 and reverse them:
    let otu_ids = newdata.otu_ids.slice(0, 10).reverse();
    let otu_labels = newdata.otu_labels.slice(0, 10).reverse();
    let sample_values = newdata.sample_values.slice(0, 10).reverse();

    // Re-format the otu_ids as labels for the y-axis:
    let y_labels = otu_ids.map(otu_id => `OTU ${otu_id}`);   

    // Trace1 for the top 10 belly button data: 
    let trace1 = {
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
    let layout_bar = {
      title: `<b>Top Ten OTUs in ID: ${newdata.id}</b>`, 
      margin: {
        l: 75,
        r: 0,
        t: 50,
        b: 50
      }
    };

    // Render the plot to the div tag with id "bar", and pass barData and layout:
    Plotly.newPlot("bar", barData, layout_bar); 
  }

  // Function to make the bubble chart of all OTU IDs found in the chosen sample:
  function makeBubbleChart(newdata) {
    // Set all the vars in the array of sampleMatched (newdata) to object vars to build the charts:
    let otu_ids = newdata.otu_ids;
    let otu_labels = newdata.otu_labels;
    let sample_values = newdata.sample_values;

    // Set up trace2 with as the data for the bubble chart:
    let trace2 = {
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
    let bubbleData = [trace2];

    // Apply a title to the layout and turn off legend, pull the ID for the title:
    let layout_bubble = {
      title: `<b>Bubble Chart of OTUs in ID: ${newdata.id}</b>`,
      xaxis: {
        title: {
          text: 'OTU ID'}
        }, 
      showlegend: false,
      margin: {
        t: 50,
        r: 50,
        b: 100,
        l: 50
      },
    };
    
    // Render the plot to the div tag with id "bubble", and pass bubbleData and layout, Plot the new plot in the bubble div: 
    Plotly.newPlot('bubble', bubbleData, layout_bubble); 

  }
  

  // Function to make the Gauge chart:
  function makeGaugeChart(newdata) {
    // Select the wfreq var in the array of chosenMetadata (newdata) and save to an object to build the gauge chart for the chosen id:
    let washing_freq = newdata.wfreq

    // Set up the indicator gauge using the washing_freq as the value that is displayed for each chosen subject ID: 
    var gaugeData = [
        {
          type: "indicator",
          mode: "gauge+number",
          domain: { x: [0, 1], y: [0, 1] },
          value: washing_freq,
          title: { text: `<b>Belly Button Washing Frequency of ID: ${newdata.id}</b> <br> Scrubs per Week`, font: { size: 18 } },
          gauge: {
            axis: { range: [null, 9], tickmode: "array", ticktext: ["Very<br>Dirty","1","2","3","4","5","6","7","8","Very<br>Clean"],tickvals: [0,1,2,3,4,5,6,7,8,9], ticks: "inside", tickwidth: 4, ticklen: 50, tickcolor: "lightslategrey",
            tickfont: {size: 22} }, 
            // Set the color of the gauge marker:
            bar: { thickness:0.6, color: "black" },  
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "lightslategrey",
            // Set the colors for the thresholds:
            steps: [
              { range: [0, 1], color: "#f7fcf0" },
              { range: [1, 2], color: "#e0f3db" },
              { range: [2,3], color: "#ccebc5" },
              { range: [3, 4], color: "#a8ddb5" },
              { range: [4, 5], color: "#7bccc4" },
              { range: [5, 6], color: "#4eb3d3" },
              { range: [6, 7], color: "#2b8cbe" },
              { range: [7, 8], color: "#0868ac" },
              { range: [8, 9], color: "#084081" }
            ]
          }
        }
      ];

      // Set up the indicator gauge layout size and margins: 
      var layout_gauge = {
        width: 500,
        height: 450,
        margin: { t: 25, r: 75, l: 65, b: 50 },
        annotations: 
        {
            x: 0,
            y: 0, 
            // xref: 'x',
            // yref: 'y',
            text: 'HERE',
            showarrow: true,
            font: {
              family: 'Courier New, monospace',
              size: 16,
              color: '#ffffff'
            }
      }
    }
      
      Plotly.newPlot("gauge", gaugeData, layout_gauge);

  } 

  // Function to update the demographic panel with the chosen metadata's new info:
  function updatePanel(newdata) {
    // Set the div of id="sample-metadata" to panel
    let panel = d3.select("#sample-metadata");

    // Clear previous selection in the panel:
    panel.html("");

    // // function to capitalize first letter in panel key-value pairs:
    // function capitalizeFirstLetter(string) {
    //   return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    // Function to reformat the keys for the metadata so that the panel text is easier to read and interpret:
    function reformKeys(key) {
      if (key === "id") return key = "Subject ID" 
      else if (key === "ethnicity") return key = "Ethnicity"
      else if (key === "gender") return key = "Gender"
      else if (key === "age") return key = "Age"
      else if (key === "location") return key = "Location"
      else if (key === "bbtype") return key = "Belly Button Type"
      else if (key === "wfreq") return key = "Washing Frequency"; 
        }

    // Function to reformat the values for the metadata so that null values read as missing in the panel:
    function reformValues(value) {
      if (value === null) return value = "Missing" 
      else return value
    }

    // Add each key and value pair in the chonen metadata to a new header- h5 - seperated by a colon:
    Object.entries(newdata).forEach(([key, value]) => { 
      // Use var to set key to reformat the keys in panel using the function reformKeys(string): 
      var key = reformKeys(key);
      // Use var to set key to reformat the keys in panel using the function reformKeys(string): 
      var value = reformValues(value);
      panel.append("h5").text(`${key}: ${value}`);     
    });    
  } 

  // Run the functions to create the dropdown menu and initilize the charts:
  createDropDown(data);  
  init();

});    
