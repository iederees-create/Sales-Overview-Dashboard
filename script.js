document.addEventListener('DOMContentLoaded', function() {
    var dataFileInput = document.getElementById('dataFile');

    if (!dataFileInput) {
        console.error("Element with ID 'dataFile' not found.");
        return;
    }

    dataFileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => processData(e.target.result);
        reader.readAsText(file);
    }

    function updateAllCharts(labels, values) {
        ['bar', 'line', 'radar', 'doughnut', 'pie', 'polarArea', 'bubble', 'scatter'].forEach((type, index) => {
            createChart(`chart${index + 1}`, type, labels, values);
        });
    }

    function createChart(canvasId, chartType, labels, values) {
        var canvas = document.getElementById(canvasId);
        if (!canvas) return;

        var ctx = canvas.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
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
            options: { scales: { y: { beginAtZero: true } } }
        });
    }

    function processData(csvData) {
        const rows = csvData.split('\n');
        const labels = [];
        const values = [];

        rows.forEach((row, index) => {
            if (row.trim() === '') return;

            const [label, value] = row.split(',');

            if (label !== undefined && value !== undefined) {
                labels.push(label.trim());
                values.push(parseFloat(value.trim()));
            } else {
                console.error(`Invalid data in row ${index + 1}: ${row}`);
            }
        });

        updateAllCharts(labels, values);
    }
});
