# Advanced Patterns

This guide covers advanced patterns and techniques for using Postman Collection Runner with pre and post scripts.

## Data Flow Patterns

### 1. Sequential Data Processing

Process data through multiple API calls in sequence, where each call depends on the previous one.

```javascript
// Request 1: Get user list
if (pm.response.code === 200) {
    const users = pm.response.json().users;
    const randomUser = users[Math.floor(Math.random() * users.length)];
    pm.collectionVariables.set("userId", randomUser.id);
}

// Request 2: Get user details
if (pm.response.code === 200) {
    const user = pm.response.json();
    pm.collectionVariables.set("userEmail", user.email);
    pm.collectionVariables.set("userRole", user.role);
}

// Request 3: Get user permissions
if (pm.response.code === 200) {
    const permissions = pm.response.json();
    pm.collectionVariables.set("userPermissions", JSON.stringify(permissions));
}
```

### 2. Parallel Data Collection

Collect data from multiple sources and combine them in a final request.

```javascript
// Request 1: Get user data
if (pm.response.code === 200) {
    const user = pm.response.json();
    pm.collectionVariables.set("userData", JSON.stringify(user));
}

// Request 2: Get company data
if (pm.response.code === 200) {
    const company = pm.response.json();
    pm.collectionVariables.set("companyData", JSON.stringify(company));
}

// Request 3: Combine data
if (pm.response.code === 200) {
    const userData = JSON.parse(pm.collectionVariables.get("userData"));
    const companyData = JSON.parse(pm.collectionVariables.get("companyData"));
    
    const combinedData = {
        user: userData,
        company: companyData,
        timestamp: new Date().toISOString()
    };
    
    pm.collectionVariables.set("combinedData", JSON.stringify(combinedData));
}
```

### 3. Conditional Logic

Use conditional logic to determine which requests to make based on previous responses.

```javascript
// Request 1: Check user status
if (pm.response.code === 200) {
    const user = pm.response.json();
    pm.collectionVariables.set("userStatus", user.status);
    
    if (user.status === "active") {
        pm.collectionVariables.set("shouldGetPermissions", "true");
    } else {
        pm.collectionVariables.set("shouldGetPermissions", "false");
    }
}

// Request 2: Get permissions (only if user is active)
if (pm.collectionVariables.get("shouldGetPermissions") === "true") {
    // This request will only run if the condition is met
}
```

## Data Transformation Patterns

### 1. Data Normalization

Normalize data from different sources into a consistent format.

```javascript
if (pm.response.code === 200) {
    const rawData = pm.response.json();
    
    // Normalize the data structure
    const normalizedData = {
        id: rawData.id || rawData.user_id || rawData.uid,
        name: rawData.name || rawData.full_name || rawData.display_name,
        email: rawData.email || rawData.email_address || rawData.contact_email,
        status: rawData.status || rawData.state || rawData.active ? "active" : "inactive",
        createdAt: rawData.created_at || rawData.created || rawData.date_created,
        updatedAt: rawData.updated_at || rawData.updated || rawData.date_updated
    };
    
    pm.collectionVariables.set("normalizedData", JSON.stringify(normalizedData));
}
```

### 2. Data Aggregation

Aggregate data from multiple requests into summary statistics.

```javascript
// Request 1: Get sales data
if (pm.response.code === 200) {
    const sales = pm.response.json();
    pm.collectionVariables.set("salesData", JSON.stringify(sales));
}

// Request 2: Get customer data
if (pm.response.code === 200) {
    const customers = pm.response.json();
    pm.collectionVariables.set("customerData", JSON.stringify(customers));
}

// Request 3: Generate summary
if (pm.response.code === 200) {
    const sales = JSON.parse(pm.collectionVariables.get("salesData"));
    const customers = JSON.parse(pm.collectionVariables.get("customerData"));
    
    const summary = {
        totalSales: sales.reduce((sum, sale) => sum + sale.amount, 0),
        totalCustomers: customers.length,
        averageOrderValue: sales.reduce((sum, sale) => sum + sale.amount, 0) / sales.length,
        topCustomer: customers.reduce((max, customer) => 
            customer.total_spent > max.total_spent ? customer : max
        )
    };
    
    pm.collectionVariables.set("summary", JSON.stringify(summary));
}
```

### 3. Data Validation

Validate data before processing and handle errors gracefully.

```javascript
if (pm.response.code === 200) {
    try {
        const data = pm.response.json();
        
        // Validate required fields
        const requiredFields = ['id', 'name', 'email'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            console.log("Missing required fields:", missingFields);
            pm.collectionVariables.set("dataValid", "false");
            pm.collectionVariables.set("validationErrors", JSON.stringify(missingFields));
        } else {
            pm.collectionVariables.set("dataValid", "true");
            pm.collectionVariables.set("validatedData", JSON.stringify(data));
        }
    } catch (error) {
        console.log("Data validation error:", error);
        pm.collectionVariables.set("dataValid", "false");
        pm.collectionVariables.set("validationErrors", error.message);
    }
}
```

## Error Handling Patterns

### 1. Retry Logic

Implement retry logic for failed requests.

```javascript
if (pm.response.code !== 200) {
    const retryCount = pm.collectionVariables.get("retryCount") || 0;
    
    if (retryCount < 3) {
        pm.collectionVariables.set("retryCount", retryCount + 1);
        console.log(`Request failed, retrying... (${retryCount + 1}/3)`);
        
        // You would need to implement the retry logic here
        // This is a conceptual example
    } else {
        console.log("Max retries reached, giving up");
        pm.collectionVariables.set("retryCount", 0);
    }
} else {
    // Reset retry count on success
    pm.collectionVariables.set("retryCount", 0);
}
```

### 2. Fallback Data

Provide fallback data when requests fail.

```javascript
if (pm.response.code === 200) {
    const data = pm.response.json();
    pm.collectionVariables.set("userData", JSON.stringify(data));
} else {
    // Use fallback data
    const fallbackData = {
        id: "unknown",
        name: "Unknown User",
        email: "unknown@example.com",
        status: "inactive"
    };
    
    pm.collectionVariables.set("userData", JSON.stringify(fallbackData));
    console.log("Using fallback data due to request failure");
}
```

### 3. Error Logging

Log errors for debugging and monitoring.

```javascript
if (pm.response.code === 200) {
    // Process successful response
    const data = pm.response.json();
    pm.collectionVariables.set("data", JSON.stringify(data));
} else {
    // Log error details
    const errorInfo = {
        timestamp: new Date().toISOString(),
        url: pm.request.url.toString(),
        status: pm.response.code,
        statusText: pm.response.status,
        responseTime: pm.response.responseTime,
        error: pm.response.text()
    };
    
    console.log("Request failed:", errorInfo);
    pm.collectionVariables.set("lastError", JSON.stringify(errorInfo));
}
```

## Performance Optimization

### 1. Data Caching

Cache frequently used data to avoid repeated requests.

```javascript
// Check if data is already cached
const cachedData = pm.collectionVariables.get("cachedUserData");
const cacheTimestamp = pm.collectionVariables.get("cacheTimestamp");
const cacheExpiry = 5 * 60 * 1000; // 5 minutes

if (cachedData && cacheTimestamp && (Date.now() - cacheTimestamp < cacheExpiry)) {
    console.log("Using cached data");
    pm.collectionVariables.set("userData", cachedData);
} else {
    // Make request and cache the result
    if (pm.response.code === 200) {
        const data = pm.response.json();
        pm.collectionVariables.set("cachedUserData", JSON.stringify(data));
        pm.collectionVariables.set("cacheTimestamp", Date.now());
        pm.collectionVariables.set("userData", JSON.stringify(data));
    }
}
```

### 2. Data Filtering

Filter data to only store what you need.

```javascript
if (pm.response.code === 200) {
    const fullData = pm.response.json();
    
    // Only store the fields we need
    const filteredData = {
        id: fullData.id,
        name: fullData.name,
        email: fullData.email
        // Skip other fields to save memory
    };
    
    pm.collectionVariables.set("userData", JSON.stringify(filteredData));
}
```

### 3. Batch Processing

Process multiple items in a single request when possible.

```javascript
if (pm.response.code === 200) {
    const items = pm.response.json();
    
    // Process all items at once
    const processedItems = items.map(item => ({
        id: item.id,
        name: item.name,
        processed: true,
        timestamp: new Date().toISOString()
    }));
    
    pm.collectionVariables.set("processedItems", JSON.stringify(processedItems));
}
```

## Testing and Validation

### 1. Data Integrity Checks

Verify data integrity across requests.

```javascript
// Request 1: Set initial data
if (pm.response.code === 200) {
    const data = pm.response.json();
    pm.collectionVariables.set("initialData", JSON.stringify(data));
    pm.collectionVariables.set("dataHash", btoa(JSON.stringify(data)));
}

// Request 2: Verify data integrity
if (pm.response.code === 200) {
    const currentData = pm.response.json();
    const currentHash = btoa(JSON.stringify(currentData));
    const initialHash = pm.collectionVariables.get("dataHash");
    
    if (currentHash === initialHash) {
        console.log("Data integrity verified");
    } else {
        console.log("Data integrity check failed");
    }
}
```

### 2. Performance Monitoring

Monitor performance metrics across requests.

```javascript
const startTime = pm.collectionVariables.get("startTime") || Date.now();
pm.collectionVariables.set("startTime", startTime);

if (pm.response.code === 200) {
    const responseTime = pm.response.responseTime;
    const totalTime = Date.now() - startTime;
    
    console.log(`Request completed in ${responseTime}ms`);
    console.log(`Total collection time: ${totalTime}ms`);
    
    // Store performance metrics
    const metrics = {
        responseTime: responseTime,
        totalTime: totalTime,
        timestamp: new Date().toISOString()
    };
    
    pm.collectionVariables.set("performanceMetrics", JSON.stringify(metrics));
}
```

These advanced patterns will help you create more sophisticated and robust collection runners that can handle complex data flows, error scenarios, and performance requirements.
