// Script to make bonus Gauge Chart: 
d3.json(url).then(function(data) {
    function init() {
        var firstName = data.names[0];
        getData(firstName); 
        console.log("first name: ", firstName)

        }
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
    
        // Call "makeGaugeChart" function to pass the sampleMatched to it: 
        makeGaugeChart(chosenMeta); 

        }

    // Function to make the Gauge chart:
    function makeGaugeChart(newdata) {
    // Select the wfreq var in the array of chosenMetadata (newdata) and save to an object to build the gauge chart for the chosen id:
    var washing_freq = newdata.wfreq

    console.log("newdata: ", newdata)  
    console.log("washing_freq: ", washing_freq)  


    }
    
    // On change event int this function will updata once a new id is selected from the dropdown menu and then call getData()
    d3.selectAll("#selDataset").on("change", getData);

    init();

});    
