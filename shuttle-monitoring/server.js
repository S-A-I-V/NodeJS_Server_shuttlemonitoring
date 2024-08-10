const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001;

app.use(express.json());

// Function to update shuttle status by running Python script
const updateShuttleStatus = () => {
    exec('python your_script.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
        // Parse stdout and update shuttles array
        // Assuming your Python script returns JSON data
        shuttles = JSON.parse(stdout);
    });
};

// Run updateShuttleStatus every 5 seconds
setInterval(updateShuttleStatus, 5000);

// Placeholder data
let shuttles = [
    { id: 1, name: 'Shuttle_1', ip: '192.168.1.1', state: 'up', timestamp: '2024-07-24T10:00:00Z' },
    { id: 2, name: 'Shuttle_2', ip: '192.168.1.2', state: 'down', timestamp: '2024-07-24T10:05:00Z' },
];

// Endpoint to get shuttle status
app.get('/api/shuttle_status', (req, res) => {
    res.json(shuttles);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
