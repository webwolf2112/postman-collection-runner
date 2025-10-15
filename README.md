# postman-collection-runner
Simple postman scripts to showcase collection runners with variable sharing examples

## Overview

This repository contains a Postman collection that demonstrates:
- Creating a collection with multiple endpoints
- Using pre-request scripts to set up data before requests
- Using post-request scripts (tests) to validate responses and extract data
- Sharing variables between different endpoints in a collection

## Files in this Repository

- **example-collection.json** - A complete Postman collection with 3 endpoints demonstrating variable sharing
- **COLLECTION_GUIDE.md** - Comprehensive documentation on how the collection works and how to use variables

## Quick Start

### Import into Postman

1. Open Postman
2. Click "Import" in the top-left corner
3. Select the `example-collection.json` file from this repository
4. The collection will be imported and ready to use

### Run the Collection

#### Option 1: Run Individual Requests
1. Click on each request in order (Create User → Get User Details → Get User Posts)
2. Click "Send" for each request
3. Open Postman Console (View → Show Postman Console) to see variable sharing logs

#### Option 2: Use Collection Runner
1. Click the three dots (...) next to the collection name
2. Click "Run collection"
3. Click "Run Variable Sharing Example Collection"
4. View the results showing all tests passing

#### Option 3: Use Newman (Command Line)
```bash
# Install Newman globally
npm install -g newman

# Run the collection
newman run example-collection.json
```

## What the Collection Demonstrates

### Three Endpoints

1. **Create User** - POST request with pre/post scripts
   - Pre-request script generates random user ID and timestamp
   - Post-request script validates response and stores user data
   
2. **Get User Details** - GET request with pre/post scripts
   - Pre-request script retrieves userId from first request
   - Post-request script stores additional user information
   - Verifies variables from previous requests are accessible
   
3. **Get User Posts** - GET request without scripts
   - Uses the shared userId variable from first request
   - Shows that all requests can access collection variables

### Variable Sharing Between Endpoints

The collection demonstrates three types of variable sharing:

- **Collection Variables**: Shared across all requests in the collection
- **Environment Variables**: Specific to the selected environment
- **Variable Flow**: How data flows from one request to another

## Learn More

For detailed documentation on how the collection works and how to use variables in Postman, see [COLLECTION_GUIDE.md](COLLECTION_GUIDE.md).

## Key Concepts Covered

- Setting collection variables with `pm.collectionVariables.set()`
- Getting collection variables with `pm.collectionVariables.get()`
- Setting environment variables with `pm.environment.set()`
- Writing pre-request scripts to prepare data
- Writing post-request scripts (tests) to validate and extract data
- Using variables in URLs, headers, and request bodies
- Logging for debugging with `console.log()`

## API Used

This collection uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) free API for demonstration purposes.

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improving this collection!
