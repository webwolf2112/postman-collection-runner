# Collection Setup Guide

This guide will walk you through setting up your Postman collection for the Pokemon API example and provide general setup instructions for other use cases.

## Pokemon API Collection Setup

### Step 1: Create the Collection

1. Open Postman
2. Click "New" → "Collection"
3. Name it "Pokemon Data Population"
4. Add a description: "Automated Pokemon data population using Collection Runner"

### Step 2: Create the Requests

#### Request 1: Get Pokemon List
- **Method:** GET
- **URL:** `https://pokeapi.co/api/v2/pokemon`
- **Name:** "1. Get Pokemon List"
- **Pre-request Script:** [See scripts/pokemon/get-pokemon-list/pre-script.js](../scripts/pokemon/get-pokemon-list/pre-script.js)
- **Tests:** [See scripts/pokemon/get-pokemon-list/post-script.js](../scripts/pokemon/get-pokemon-list/post-script.js)

#### Request 2: Get Pokemon Details
- **Method:** GET
- **URL:** `https://pokeapi.co/api/v2/pokemon/{{randomPokemonName}}`
- **Name:** "2. Get Pokemon Details"
- **Tests:** [See scripts/pokemon/get-pokemon-details/post-script.js](../scripts/pokemon/get-pokemon-details/post-script.js)

#### Request 3: Get Ability Details
- **Method:** GET
- **URL:** `https://pokeapi.co/api/v2/ability/{{randomPokemonAbility}}`
- **Name:** "3. Get Ability Details"
- **Tests:** [See scripts/pokemon/get-ability-details/post-script.js](../scripts/pokemon/get-ability-details/post-script.js)

### Step 3: Configure Collection Runner

1. Click on your collection
2. Click "Run collection"
3. Configure the following settings:
   - **Iterations:** 1 (or more if you want to test multiple times)
   - **Delay:** 1000ms (1 second between requests)
   - **Data:** None (we're using scripts, not CSV data)
   - **Environment:** None (or create one if needed)

### Step 4: Run the Collection

1. Click "Run Pokemon Data Population"
2. Watch the console output for the formatted results
3. Check the collection variables to see the stored data

## General Collection Setup Guidelines

### Request Organization

1. **Use descriptive names** that indicate the purpose and order
2. **Number your requests** if they have dependencies
3. **Group related requests** in folders
4. **Add descriptions** to explain the purpose of each request

### Variable Management

1. **Use collection variables** for data that needs to be shared between requests
2. **Use environment variables** for configuration that might change between environments
3. **Use global variables** sparingly, only for truly global data

### Script Placement

1. **Pre-request scripts** go in the "Pre-request Script" tab
2. **Post-request scripts** go in the "Tests" tab (despite the name, this is where post-scripts go)
3. **Collection-level scripts** can be added in the collection settings

### Error Handling

1. **Always check response codes** before processing data
2. **Add try-catch blocks** for JSON parsing
3. **Log errors** to the console for debugging
4. **Set fallback values** for critical variables

## Collection Export

To share your collection with others:

1. Click on your collection
2. Click the "..." menu
3. Select "Export"
4. Choose "Collection v2.1" format
5. Save the JSON file

## Importing Collections

To import a collection:

1. Click "Import" in Postman
2. Select the collection JSON file
3. Click "Import"

## Environment Setup (Optional)

If you need different configurations for different environments:

1. Click the gear icon in the top right
2. Click "Manage Environments"
3. Click "Add"
4. Create environments for:
   - Development
   - Staging
   - Production

Set up environment variables for:
- Base URLs
- API keys
- Timeouts
- Other configuration values

## Troubleshooting

### Common Issues

1. **Variables not updating:** Check that you're using `pm.collectionVariables.set()` and `pm.collectionVariables.get()`
2. **Scripts not running:** Ensure scripts are in the correct tabs (Pre-request Script vs Tests)
3. **Data not available:** Check that previous requests completed successfully
4. **Console not showing output:** Make sure you're using `console.log()` and checking the console tab

### Debugging Tips

1. **Add console.log()** statements to track variable values
2. **Check the console** for error messages
3. **Verify response structure** by logging the full response
4. **Test requests individually** before running the collection

## Next Steps

- [View Script Examples](../scripts/README.md)
- [Troubleshooting Guide](troubleshooting.md)
- [Advanced Patterns](advanced-patterns.md)
