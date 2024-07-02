# Real-time Lecturing API

This repository contains the server-side implementation for the **Real-time Lecturing** project.

## Local Setup

To run the server locally, follow these steps:

1. Clone this repository.

2. Create a `.env` file in the root directory with the following variables:

   ```Bash
   API_PORT=""
   MONGO_URL=""
   TOKEN_KEY=""
   EMAIL=""
   PASSWORD=""
   ```
   The **EMAIL** and **PASSWORD** variables are used for organization verification code delivery to the user's Gmail account.

3. Install dependencies using the following command:
   
   ```Bash
   npm install
   ```
4. Start the server with the following command:
   
   ```Bash
   npm start
   ```
## Testing
You can use Postman or any API testing tool to interact with the API and observe the results.