const { dbConnection } = require('../database/db'); // Import the dbConnection function
const User = require('../models/user'); // Import the User model

module.exports.handler = async (event, context) => {
    // Set context.callbackWaitsForEmptyEventLoop to false to re-use `conn` between function calls
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await dbConnection(); // Ensure that the database connection is established

        // Extract the user ID from the URL
        const userId = event.pathParameters.id;
   
        // Parse the JSON string in event.body to a JavaScript object
        const body = JSON.parse(event.body);
 
         // Update the user document with the fields provided in the request body
         const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            { $set: body },
            { new: true },
          )

 

        // Return a successful response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `User updated successfully`,
                data: updatedUser // Return the updated user data
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
