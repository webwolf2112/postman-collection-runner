# Postman Collection Variable Sharing Guide

## Overview

This guide demonstrates how to create a Postman collection with multiple endpoints that share variables using pre-request and post-request scripts.

## Collection Structure

The example collection (`example-collection.json`) includes:

1. **Three Endpoints**:
   - **Create User** - POST request with pre/post scripts
   - **Get User Details** - GET request with pre/post scripts
   - **Get User Posts** - GET request without scripts (demonstrates variable access)

2. **Pre-Request Scripts** (on two endpoints):
   - Generate and set variables before the request executes
   - Access variables from previous requests
   - Log information for debugging

3. **Post-Request Scripts (Tests)** (on two endpoints):
   - Validate response data
   - Extract data from responses
   - Store data in variables for subsequent requests
   - Verify variable sharing between requests

## Variable Types and Sharing

### Collection Variables
Collection variables are shared across all requests in the collection:

```javascript
// Set a collection variable
pm.collectionVariables.set('variableName', value);

// Get a collection variable
const value = pm.collectionVariables.get('variableName');
```

**Variables used in this collection:**
- `userId` - Generated in first request, used by all requests
- `requestTimestamp` - Timestamp of the first request
- `createdUserId` - ID returned from the Create User endpoint
- `userName` - User name from the response
- `userEmail` - User email stored for later use
- `userPhone` - User phone stored for later use
- `getUserRequestTime` - Timestamp of the Get User Details request

### Environment Variables
Environment variables are specific to the selected environment:

```javascript
// Set an environment variable
pm.environment.set('variableName', value);

// Get an environment variable
const value = pm.environment.get('variableName');
```

**Variables used in this collection:**
- `currentEndpoint` - Tracks which endpoint is currently executing

### Global Variables
Global variables are shared across all collections:

```javascript
// Set a global variable
pm.globals.set('variableName', value);

// Get a global variable
const value = pm.globals.get('variableName');
```

## How Variables Are Shared

### Flow Example:

1. **Request 1: Create User**
   - **Pre-request script**:
     - Generates `userId` = random number
     - Sets `requestTimestamp` = current time
     - Sets `currentEndpoint` = "Create User"
   - **Request executes**: Creates user with generated userId
   - **Post-request script**:
     - Validates response
     - Stores `createdUserId` from response
     - Stores `userName` from response

2. **Request 2: Get User Details**
   - **Pre-request script**:
     - Retrieves `userId` set by Request 1
     - Logs `requestTimestamp` from Request 1
     - Sets `currentEndpoint` = "Get User Details"
     - Sets `getUserRequestTime` = current time
   - **Request executes**: Gets user details using `{{userId}}`
   - **Post-request script**:
     - Validates response
     - Stores `userEmail` and `userPhone`
     - Verifies that variables from Request 1 are still accessible

3. **Request 3: Get User Posts**
   - No scripts
   - **Request executes**: Uses `{{userId}}` from Request 1
   - Demonstrates that shared variables are accessible to all requests

## Pre-Request Script Examples

### Example 1: Generate Random Data
```javascript
// Generate a random ID
const randomId = Math.floor(Math.random() * 10000);
pm.collectionVariables.set('userId', randomId);
```

### Example 2: Set Timestamps
```javascript
// Set current timestamp
pm.collectionVariables.set('requestTimestamp', new Date().toISOString());
```

### Example 3: Access Previous Variables
```javascript
// Get a variable from a previous request
const userId = pm.collectionVariables.get('userId') || 1;
console.log('Using userId:', userId);
```

## Post-Request Script Examples

### Example 1: Validate Response
```javascript
pm.test('Status code is 200', function () {
    pm.response.to.have.status(200);
});
```

### Example 2: Extract and Store Response Data
```javascript
const responseJson = pm.response.json();
pm.collectionVariables.set('userName', responseJson.name);
pm.collectionVariables.set('userEmail', responseJson.email);
```

### Example 3: Verify Variable Sharing
```javascript
pm.test('Variables from previous requests are accessible', function () {
    pm.expect(pm.collectionVariables.get('requestTimestamp')).to.not.be.undefined;
    pm.expect(pm.collectionVariables.get('userId')).to.not.be.undefined;
});
```

## Using Variables in Requests

Variables can be used in:

1. **URL**: `https://api.example.com/users/{{userId}}`
2. **Headers**: `Authorization: Bearer {{authToken}}`
3. **Body**: 
   ```json
   {
     "username": "user{{userId}}",
     "email": "user{{userId}}@example.com"
   }
   ```

## Running the Collection

### Option 1: Run Individual Requests
1. Import the collection into Postman
2. Run each request one by one in order
3. Check the console to see variable sharing in action

### Option 2: Run with Collection Runner
1. Import the collection into Postman
2. Click "Run" to open Collection Runner
3. Select the collection
4. Click "Run Variable Sharing Example Collection"
5. View results showing all tests passing and variables being shared

### Option 3: Run with Newman (CLI)
```bash
# Install Newman
npm install -g newman

# Run the collection
newman run example-collection.json
```

## Best Practices

1. **Initialize Variables**: Always define default values in the collection variables section
2. **Use Descriptive Names**: Make variable names clear and self-documenting
3. **Clean Up**: Clear temporary variables when no longer needed
4. **Log for Debugging**: Use `console.log()` to track variable values
5. **Test Variable Existence**: Always check if a variable exists before using it
6. **Choose the Right Scope**:
   - Use collection variables for data shared within one collection
   - Use environment variables for configuration that changes between environments
   - Use global variables sparingly for truly global data

## Troubleshooting

### Variables Not Updating
- Ensure scripts are in the correct section (pre-request vs test)
- Check that variable names match exactly (case-sensitive)
- Verify the request order if using Collection Runner

### Variables Not Available
- Check the variable scope (collection, environment, or global)
- Ensure the setting script executed before the getting script
- Look for typos in variable names

### Console Not Showing Logs
- Open Postman Console (View → Show Postman Console)
- Check for JavaScript errors in scripts

## Additional Resources

- [Postman Learning Center - Variables](https://learning.postman.com/docs/sending-requests/variables/)
- [Postman Learning Center - Scripts](https://learning.postman.com/docs/writing-scripts/intro-to-scripts/)
- [Postman Learning Center - Test Scripts](https://learning.postman.com/docs/writing-scripts/test-scripts/)
