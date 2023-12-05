// script.js

document.getElementById('dataFile').addEventListener('change', handleFileSelect);

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

    // Update the chart
    updateChart(labels, values);
}

function updateChart(labels, values) {
    var ctx = document.getElementById('salesChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
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
        }
    });
}
