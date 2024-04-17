const { dbConnection } = require('../database/db'); // Import the dbConnection function
const User = require('../models/user'); // Import the User model
const { v4: uuidv4 } = require('uuid');


module.exports.handler = async (event, context) => {
    // Set context.callbackWaitsForEmptyEventLoop to false to re-use `conn` between function calls
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await dbConnection(); // Ensure that the database connection is established

        // Parse the JSON string in event.body to a JavaScript object
        const body = JSON.parse(event.body);

        // Destructure properties from the parsed object
        const { name, email, password } = body;
        const userId = uuidv4();
        // Create a user object
        const userObj = {
            userId: userId,
            name: name,
            email: email,
            password: password
        };

        // Save the user object using the User model
        const newUser = await User.create(userObj);

        // Return a successful response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `User created successfully`,
                data: newUser // Return the newly created user data
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
