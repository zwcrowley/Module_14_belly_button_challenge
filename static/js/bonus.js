// Script to make bonus Gauge Chart: 

// Read in the json from app.js:
d3.json(url).then(function(data) {

    // Same inialization function as app.js:
    function init() {
        let firstName = data.names[0];
        getData(firstName); 

        }

    // Same getData function as app.js, only retrieves the data from the metadata since the gauge only needs the value from the wfreq key in the metadata:
    function getData() {
        // Assign the value of the dropdown menu option to a variable:
        let dataValue = d3.select("#selDataset").property("value");
        // First, the metadata for the panel demo table:
        // Set metadata to a var:
        let metadata = data.metadata;
        // Filter the metadata to find the id that was selected in the dropdownMenu (dataValue)):
        let chosenMetadata = metadata.filter(meta => meta.id == dataValue);  
        console.log("Result Array: ",chosenMetadata) 
        let chosenMeta = chosenMetadata[0]  
    
        // Call "makeGaugeChart" function to pass the sampleMatched to it: 
        makeGaugeChart(chosenMeta); 

        }

    // Function to make the Gauge chart:
    function makeGaugeChart(newdata) {
        // Select the wfreq var in the array of chosenMetadata (newdata) and save to an object to build the gauge chart for the chosen id:
        let washing_freq = newdata.wfreq

        console.log("newdata: ", newdata)  
        console.log("washing_freq: ", washing_freq)  


    }
    
    // On change event int this function will updata once a new id is selected from the dropdown menu and then call getData()
    d3.selectAll("#selDataset").on("change", getData);

    init();

});    
