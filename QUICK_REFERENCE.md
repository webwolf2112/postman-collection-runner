# Quick Reference Card

## 🚀 Getting Started in 3 Steps

1. **Import** the `example-collection.json` file into Postman
2. **Open** Postman Console (View → Show Postman Console)
3. **Run** the collection and watch variables flow between requests!

## 📋 What's Inside

| Endpoint | Method | Scripts | Purpose |
|----------|--------|---------|---------|
| 1. Create User | POST | ✅ Pre + Post | Generates userId, creates user, stores response data |
| 2. Get User Details | GET | ✅ Pre + Post | Uses userId from #1, validates, stores more data |
| 3. Get User Posts | GET | ⚪ None | Uses userId from #1 without needing scripts |

## 🔄 Variable Flow at a Glance

```
Request 1           Request 2           Request 3
   ↓                   ↓                   ↓
Set: userId    →   Use: userId     →   Use: userId
Set: timestamp      Get: timestamp
Set: createdId      Set: userEmail
Set: userName       Set: userPhone
```

## 💡 Key Code Snippets

### Setting a Collection Variable
```javascript
pm.collectionVariables.set('userId', 123);
```

### Getting a Collection Variable
```javascript
const userId = pm.collectionVariables.get('userId');
```

### Using Variables in Requests
```
URL: https://api.example.com/users/{{userId}}
Body: {"username": "user{{userId}}"}
```

### Validating Responses
```javascript
pm.test('Status code is 200', function () {
    pm.response.to.have.status(200);
});
```

### Extracting Response Data
```javascript
const responseJson = pm.response.json();
pm.collectionVariables.set('userName', responseJson.name);
```

## 📚 Documentation Files

- **README.md** - Overview and quick start guide
- **COLLECTION_GUIDE.md** - Complete guide with examples
- **VARIABLE_FLOW.md** - Visual diagrams and flow charts
- **QUICK_REFERENCE.md** - This file!

## ✅ Requirements Checklist

- [x] Three different endpoints
- [x] Pre-request scripts on 2 endpoints
- [x] Post-request scripts on 2 endpoints  
- [x] Shared variables between endpoints
- [x] Collection variables demonstrated
- [x] Environment variables demonstrated
- [x] Complete documentation

## 🎯 Variable Types Used

| Type | Scope | Example |
|------|-------|---------|
| Collection | All requests in collection | `pm.collectionVariables.set('userId', 1)` |
| Environment | All collections in environment | `pm.environment.set('currentEndpoint', 'Create User')` |
| Global | All collections everywhere | `pm.globals.set('authToken', 'abc123')` |

## 🧪 Testing the Collection

### Method 1: Collection Runner
1. Click "..." next to collection name
2. Click "Run collection"
3. Click "Run Variable Sharing Example Collection"
4. View results with all tests passing

### Method 2: Newman CLI
```bash
npm install -g newman
newman run example-collection.json
```

### Method 3: Individual Requests
Run each request one by one in order and watch the console

## 🎓 What You'll Learn

1. ✅ How to generate dynamic data before requests
2. ✅ How to validate API responses
3. ✅ How to extract data from responses
4. ✅ How to share data between requests
5. ✅ How to use variables in URLs and bodies
6. ✅ How to debug with console logs
7. ✅ How to write effective pre/post scripts

## 🔍 Common Variable Operations

### Check if Variable Exists
```javascript
if (pm.collectionVariables.has('userId')) {
    console.log('Variable exists!');
}
```

### Clear a Variable
```javascript
pm.collectionVariables.unset('userId');
```

### Get All Variables
```javascript
pm.collectionVariables.toObject();
```

## 💻 Console Output Example

When you run the collection, you'll see output like:
```
Pre-request: User ID generated: 7342
Pre-request: Request timestamp: 2025-10-15T22:40:00.000Z
Post-request: Created user ID: 11
Post-request: User name: John Doe
Pre-request: Using userId from collection variables: 7342
Post-request: User email stored: john.doe7342@example.com
Verified: Variables from Create User request are still available
```

## 🎪 Next Steps

1. Import and run the collection
2. Examine the scripts in each request
3. Modify the scripts to experiment
4. Read the full documentation in COLLECTION_GUIDE.md
5. Create your own collection with variable sharing!

---

**Happy Testing! 🚀**
