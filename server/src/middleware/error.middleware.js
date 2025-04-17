function errorMiddleware(err, req, res, next) {
    console.error("----- Global Error Handler -----");
    console.error("Error Status:", err.statusCode || 500);
    console.error("Error Message:", err.message);
    console.error("Stack:", err.stack); 
    console.error("-------------------------------");

    res.status(err.statusCode || 500).json({
        message: err.message || 'An unexpected internal server error occurred.',
    });
}

export default errorMiddleware;
