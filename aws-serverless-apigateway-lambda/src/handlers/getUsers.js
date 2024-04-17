const { dbConnection } = require('../database/db'); // Import the dbConnection function
const User = require('../models/user'); // Import the User model

module.exports.handler = async (event, context) => {
    // Set context.callbackWaitsForEmptyEventLoop to false to re-use `conn` between function calls
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await dbConnection(); // Ensure that the database connection is established


        // Save the user object using the User model
        const users = await User.find();

        // Return a successful response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `User created successfully`,
                data: users // Return the newly created user data
            })
        };
    } catch (error) {
        // Log any errors
        console.error("Error:", error);

        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error",
                error: error.message
            })
        };
    }
};
