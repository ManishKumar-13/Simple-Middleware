const express = require('express');
const morgan = require('morgan');
const app = express();

// Custom Middleware for logging requests and time taken
const requestLogger = (req, res, next) => {
    const start = Date.now(); // Capture the start time
    
    // Listen for when the response is finished
    res.on('finish', () => {
        const method = req.method;
        const url = req.url;
        const ip = req.ip;
        const timestamp = new Date().toISOString();
        const duration = Date.now() - start; // Calculate duration of request processing
        const name = 'Manish Kumar';

        console.log(`[${timestamp}] ${method} request to ${url} from ${ip} logged by ${name} - Took ${duration}ms`);
    });
    
    next();
};

// Use the custom logger middleware
app.use(requestLogger);

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Request Logger App with Time Tracking!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
