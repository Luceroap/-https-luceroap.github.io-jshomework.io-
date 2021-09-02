const samples_data = "https://raw.githubusercontent.com/Luceroap/jshomework.io/main/samples.json";

let samples = ['a'];
let metadata = [];

d3.json(samples_data).then(function(data) {
  samples = data.samples;
  metadata = data.metadata;
  console.log(data)
  init();
});

function init() {
    plotGraphsAndMetadata(samples[0], metadata[0])
    dropdown = d3.select('#selDataset')
    samples.forEach((value, i) =>
        dropdown.append('option').attr('value',`${i}`).text(`${value.id}`)
    )
  }

d3.selectAll("#selDataset").on("change", getData);

function plotGraphsAndMetadata(sample, meta_sample) {

    let bar_data = [{
        x: sample.sample_values.slice(0,10),
        y: sample.otu_ids.slice(0,10).map(x => 'OTU '+x),
        text: sample.otu_labels.slice(0,10),
        type: 'bar',
        orientation: 'h'
    }];
    
    let bar_layout = {
    };

    Plotly.newPlot('bar', bar_data, bar_layout);
  
    let bubble_data = [{
          y: sample.sample_values,
          x: sample.otu_ids,
          text: sample.otu_labels,
          mode: 'markers',
          marker: {
              color: [...sample.otu_ids].map(x => `rgb(${x%254}, ${x%213}, ${x%149})` ),
              opacity: 0.9,
              size: sample.sample_values
          }
    }];

    let bubble_layout = {
    };

    Plotly.newPlot('bubble', bubble_data, bubble_layout);
  
    sample_metadata = d3.select('#sample-metadata');
    sample_metadata.selectAll('p').remove()
    for(key in meta_sample)
          sample_metadata.append('p').text(`${key}:${meta_sample[key]}`);
}

function getData() {
    let dropdownMenu = d3.select("#selDataset");
    let i = dropdownMenu.property("value");
    
    plotGraphsAndMetadata(samples[i], metadata[i])
}