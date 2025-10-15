# Variable Flow Diagram

This document shows how variables flow between the three endpoints in the collection.

## Visual Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              REQUEST 1: Create User (POST)                       │
├─────────────────────────────────────────────────────────────────┤
│ PRE-REQUEST SCRIPT:                                             │
│   ├─ Generate: userId = random number                           │
│   ├─ Set: requestTimestamp = current time                       │
│   └─ Set: currentEndpoint = "Create User"                       │
│                                                                  │
│ REQUEST BODY:                                                    │
│   └─ Uses: {{userId}} in username and email fields              │
│                                                                  │
│ POST-REQUEST SCRIPT (Tests):                                    │
│   ├─ Validate: Response status = 201                            │
│   ├─ Extract & Set: createdUserId from response                 │
│   └─ Extract & Set: userName from response                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
           Variables Available to Next Requests:
           • userId
           • requestTimestamp
           • createdUserId
           • userName
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│           REQUEST 2: Get User Details (GET)                      │
├─────────────────────────────────────────────────────────────────┤
│ PRE-REQUEST SCRIPT:                                             │
│   ├─ Retrieve: userId (from Request 1)                          │
│   ├─ Log: requestTimestamp (from Request 1)                     │
│   ├─ Set: currentEndpoint = "Get User Details"                  │
│   └─ Set: getUserRequestTime = current time                     │
│                                                                  │
│ REQUEST URL:                                                     │
│   └─ Uses: {{userId}} in path parameter                         │
│                                                                  │
│ POST-REQUEST SCRIPT (Tests):                                    │
│   ├─ Validate: Response status = 200                            │
│   ├─ Validate: Response has user data                           │
│   ├─ Extract & Set: userEmail from response                     │
│   ├─ Extract & Set: userPhone from response                     │
│   └─ Verify: Variables from Request 1 are still accessible      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
           Variables Available to Next Requests:
           • userId
           • requestTimestamp
           • createdUserId
           • userName
           • userEmail
           • userPhone
           • getUserRequestTime
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            REQUEST 3: Get User Posts (GET)                       │
├─────────────────────────────────────────────────────────────────┤
│ NO PRE-REQUEST SCRIPT                                           │
│                                                                  │
│ REQUEST URL:                                                     │
│   └─ Uses: {{userId}} in path parameter                         │
│                                                                  │
│ NO POST-REQUEST SCRIPT                                          │
│                                                                  │
│ Note: This request demonstrates that variables are accessible   │
│       even without scripts. It uses the userId set by Request 1.│
└─────────────────────────────────────────────────────────────────┘
```

## Variable Lifecycle

### Phase 1: Initialization
All variables are declared in the collection with initial default values:
- `userId`: "1" (default)
- `requestTimestamp`: "" (empty)
- `createdUserId`: "" (empty)
- `userName`: "" (empty)
- `userEmail`: "" (empty)
- `userPhone`: "" (empty)
- `getUserRequestTime`: "" (empty)

### Phase 2: Request 1 Execution
**Before Request:**
- Pre-request script generates and sets variables

**During Request:**
- Variables are interpolated into the request body

**After Request:**
- Post-request script extracts data and updates variables

### Phase 3: Request 2 Execution
**Before Request:**
- Pre-request script retrieves variables from Request 1
- Adds new variables for this request

**During Request:**
- Variables are interpolated into the URL

**After Request:**
- Post-request script validates and stores additional data

### Phase 4: Request 3 Execution
**During Request:**
- Uses variables set by previous requests
- No scripts needed - demonstrates variable persistence

## Variable Scopes

### Collection Variables (Used in this example)
- **Scope**: Available to all requests within this collection
- **Lifetime**: Persist for the duration of the collection run
- **Use Case**: Sharing data between requests in the same collection

Example:
```javascript
pm.collectionVariables.set('userId', 123);
const userId = pm.collectionVariables.get('userId');
```

### Environment Variables (Demonstrated)
- **Scope**: Available to all collections using the same environment
- **Lifetime**: Persist until the environment is changed or cleared
- **Use Case**: Configuration that changes between environments (dev, staging, prod)

Example:
```javascript
pm.environment.set('currentEndpoint', 'Create User');
const endpoint = pm.environment.get('currentEndpoint');
```

### Global Variables (Not used but available)
- **Scope**: Available to all collections and environments
- **Lifetime**: Persist across all Postman sessions
- **Use Case**: Truly global data like authentication tokens

Example:
```javascript
pm.globals.set('authToken', 'abc123');
const token = pm.globals.get('authToken');
```

## Variable Priority Order

When a variable with the same name exists in multiple scopes, Postman uses this priority:

1. **Local** (within a script)
2. **Data** (from CSV/JSON file in Collection Runner)
3. **Environment**
4. **Collection**
5. **Global**

## Best Practices Demonstrated

1. ✅ **Initialize with defaults**: All variables declared in collection scope
2. ✅ **Descriptive naming**: Clear variable names like `requestTimestamp`, `getUserRequestTime`
3. ✅ **Logging for debugging**: Console logs in scripts show variable values
4. ✅ **Validation**: Tests verify variables exist before using them
5. ✅ **Clean data flow**: Each request builds upon the previous one
6. ✅ **Documentation**: Comments in scripts explain what each variable does

## Testing Variable Sharing

When you run the collection, you can verify variable sharing by:

1. **Opening Postman Console** (View → Show Postman Console)
2. **Running the collection** in order
3. **Observing the console logs** showing:
   - Pre-request: Variable values being set
   - Post-request: Variable values being retrieved and used
   - Verification that variables from previous requests are accessible

Example console output:
```
Pre-request: User ID generated: 7342
Pre-request: Request timestamp: 2025-10-15T22:40:00.000Z
Post-request: Created user ID: 11
Post-request: User name: John Doe
Pre-request: Using userId from collection variables: 7342
Pre-request: Request timestamp from previous request: 2025-10-15T22:40:00.000Z
Post-request: User email stored: john.doe7342@example.com
Post-request: User phone stored: 123-456-7890
Verified: Variables from Create User request are still available
```
