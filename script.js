document.addEventListener('DOMContentLoaded', function() {
    var dataFileInput = document.getElementById('dataFile');

    if (dataFileInput) {
        dataFileInput.addEventListener('change', handleFileSelect);
    } else {
        console.error("Element with ID 'dataFile' not found.");
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                processData(e.target.result);
            };
            reader.readAsText(file);
        }
    }

    function updateAllCharts(labels, values) {
        createChart('barChart', 'bar', labels, values);
        createChart('lineChart', 'line', labels, values);
        createChart('radarChart', 'radar', labels, values);
        createChart('doughnutChart', 'doughnut', labels, values);
        createChart('pieChart', 'pie', labels, values);
        createChart('polarAreaChart', 'polarArea', labels, values);
        createChart('bubbleChart', 'bubble', labels, values);
        createChart('scatterChart', 'scatter', labels, values);
    }

    function createChart(canvasId, chartType, labels, values) {
        var ctx = document.getElementById(canvasId).getContext('2d');
        var myChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Sales',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
                // Additional chart options can be added here
            }
        });
    }

    function processData(csvData) {
        const rows = csvData.split('\n');
        const labels = [];
        const values = [];

        rows.forEach((row, index) => {
            const [label, value] = row.split(',');

            // Check if the row has the expected format
            if (label !== undefined && value !== undefined) {
                labels.push(label.trim());
                values.push(parseFloat(value.trim()));
            } else {
                console.error(`Invalid data in row ${index + 1}: ${row}`);
            }
        });

        // Update all charts
        updateAllCharts(labels, values);
    }
});

