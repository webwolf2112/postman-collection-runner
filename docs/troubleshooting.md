# Troubleshooting Guide

This guide covers common issues you might encounter when using Postman Collection Runner with pre and post scripts.

## Common Issues and Solutions

### Variables Not Updating

**Problem:** Variables set in scripts aren't available in subsequent requests.

**Solutions:**
1. **Check variable scope:**
   ```javascript
   // Use collection variables for sharing between requests
   pm.collectionVariables.set("myVariable", "value");
   pm.collectionVariables.get("myVariable");
   ```

2. **Verify variable names:** Ensure you're using the exact same name when setting and getting variables.

3. **Check script placement:** Make sure scripts are in the correct tabs:
   - Pre-request scripts go in "Pre-request Script" tab
   - Post-request scripts go in "Tests" tab

### Scripts Not Running

**Problem:** Scripts appear to not execute at all.

**Solutions:**
1. **Check syntax errors:** Look for JavaScript syntax errors in the console
2. **Verify script placement:** Scripts must be in the correct tabs
3. **Check collection runner settings:** Ensure scripts are enabled in the runner

### Data Not Available in Next Request

**Problem:** Data from one request isn't available in the next request.

**Solutions:**
1. **Check request order:** Ensure dependent requests come after the requests that set the data
2. **Verify successful responses:** Check that the previous request completed successfully
3. **Add debugging logs:**
   ```javascript
   console.log("Setting variable:", value);
   pm.collectionVariables.set("myVariable", value);
   console.log("Variable set:", pm.collectionVariables.get("myVariable"));
   ```

### JSON Parsing Errors

**Problem:** `pm.response.json()` throws an error.

**Solutions:**
1. **Add error handling:**
   ```javascript
   try {
       const data = pm.response.json();
       // Process data
   } catch (error) {
       console.log("JSON parsing error:", error);
   }
   ```

2. **Check response format:** Ensure the response is valid JSON
3. **Check response status:** Only parse JSON for successful responses

### Console Output Not Showing

**Problem:** `console.log()` statements don't appear in the console.

**Solutions:**
1. **Check console tab:** Make sure you're looking at the "Console" tab in Postman
2. **Verify script execution:** Add a simple `console.log("Script running")` to test
3. **Check collection runner:** Ensure you're running the collection, not individual requests

### Variables Showing as Undefined

**Problem:** Variables return `undefined` when accessed.

**Solutions:**
1. **Check variable existence:**
   ```javascript
   const value = pm.collectionVariables.get("myVariable");
   if (value === undefined) {
       console.log("Variable not found");
   }
   ```

2. **Set default values:**
   ```javascript
   const value = pm.collectionVariables.get("myVariable") || "defaultValue";
   ```

3. **Verify variable setting:** Check that the variable was actually set in a previous request

## Debugging Techniques

### 1. Add Console Logging

```javascript
console.log("=== Debug Info ===");
console.log("Response status:", pm.response.code);
console.log("Response body:", pm.response.text());
console.log("Current variables:", pm.collectionVariables.toObject());
```

### 2. Check Response Structure

```javascript
if (pm.response.code === 200) {
    const data = pm.response.json();
    console.log("Response structure:", JSON.stringify(data, null, 2));
}
```

### 3. Validate Data Before Processing

```javascript
if (pm.response.code === 200) {
    const data = pm.response.json();
    
    if (data && data.results && Array.isArray(data.results)) {
        // Process data
        console.log("Data is valid, processing...");
    } else {
        console.log("Invalid data structure:", data);
    }
}
```

### 4. Test Individual Requests

Before running the full collection:
1. Run each request individually
2. Check the console output
3. Verify variables are being set correctly
4. Test the full collection

## Performance Issues

### Slow Collection Execution

**Solutions:**
1. **Add delays between requests:**
   - Set delay in collection runner settings
   - Add `setTimeout()` in scripts if needed

2. **Optimize scripts:**
   - Remove unnecessary console.log statements
   - Simplify data processing logic

3. **Check API rate limits:**
   - Some APIs have rate limits
   - Add appropriate delays between requests

### Memory Issues

**Solutions:**
1. **Clear unused variables:**
   ```javascript
   pm.collectionVariables.unset("unusedVariable");
   ```

2. **Limit data storage:**
   - Only store necessary data
   - Use smaller data structures when possible

## Best Practices for Debugging

1. **Start simple:** Begin with basic scripts and add complexity gradually
2. **Test incrementally:** Test each request individually before running the collection
3. **Use descriptive logging:** Add meaningful console.log statements
4. **Check the console:** Always check the console for error messages
5. **Validate assumptions:** Don't assume data structure - check it first

## Getting Help

If you're still having issues:

1. **Check Postman documentation:** [Postman Learning Center](https://learning.postman.com/)
2. **Search Postman community:** [Postman Community Forum](https://community.postman.com/)
3. **Check API documentation:** Ensure you're using the API correctly
4. **Simplify your scripts:** Break down complex scripts into smaller parts

## Example Debug Script

Here's a comprehensive debug script you can use:

```javascript
console.log("=== Request Debug Info ===");
console.log("Request URL:", pm.request.url.toString());
console.log("Response Status:", pm.response.code);
console.log("Response Time:", pm.response.responseTime + "ms");

if (pm.response.code === 200) {
    try {
        const data = pm.response.json();
        console.log("Response Data Keys:", Object.keys(data));
        
        // Log current collection variables
        const variables = pm.collectionVariables.toObject();
        console.log("Current Variables:", variables);
        
    } catch (error) {
        console.log("JSON Parsing Error:", error);
        console.log("Raw Response:", pm.response.text());
    }
} else {
    console.log("Request Failed:", pm.response.status);
    console.log("Error Response:", pm.response.text());
}
```

This script will help you understand what's happening at each step of your collection execution.
