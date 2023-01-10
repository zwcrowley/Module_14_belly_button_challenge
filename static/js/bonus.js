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

        var trace3 = {
            type: "pie",
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
            text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
                labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
                hoverinfo: "label"
            },
            hoverinfo: "skip"
          };

          // the dot where the needle "originates"
            let dot = {
                type: 'scatter',
                x: [0],
                y: [0],
                marker: {
                size: 14,
                color:'#850000'
                },
                showlegend: false,
                hoverinfo: "skip"
            }
            
          // add weights to the degrees to correct needle
            let weight = 0;
            if (washing_freq == 2 || washing_freq == 3){
                weight = 3;
            } else if (washing_freq == 4){
                weight = 1;
            } else if (washing_freq == 5){
                weight = -.5;
            } else if (washing_freq == 6){
                weight = -2;
            } else if (washing_freq == 7){
                weight = -3;
            }

            let degrees = 180-(20 * washing_freq + weight); // 20 degrees for each of the 9 gauge sections
            let radius = .5;
            let radians = degrees * Math.PI / 180;
            let aX = 0.025 * Math.cos((radians) * Math.PI / 180);
            let aY = 0.025 * Math.sin((radians) * Math.PI / 180);
            let bX = -0.025 * Math.cos((radians) * Math.PI / 180);
            let bY = -0.025 * Math.sin((radians) * Math.PI / 180);
            let cX = radius * Math.cos(radians);
            let cY = radius * Math.sin(radians);

            // draw the triangle
            let path = 'M ' + aX + ' ' + aY +
                        ' L ' + bX + ' ' + bY +
                        ' L ' + cX + ' ' + cY +
                        ' Z';
          
            let gaugeLayout = {
                title: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                shapes:[{
                    type: 'path',
                    path: path,
                    fillcolor: '#850000',
                    line: {
                        color: '#850000'
                    }
                    }],
                xaxis: {zeroline:false, 
                        showticklabels:false,
                        showgrid: false, 
                        range: [-1, 1],
                        fixedrange: true
                        },
                yaxis: {zeroline:false, 
                        showticklabels:false,
                        showgrid: false, 
                        range: [-1, 1],
                        fixedrange: true
                        }
                };
            
        Plotly.newPlot("gauge", [trace3, dot], gaugeLayout);
           


    } 
    
    // On change event int this function will updata once a new id is selected from the dropdown menu and then call getData()
    d3.selectAll("#selDataset").on("change", getData);

    init();

});    
