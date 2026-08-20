# Postman Scripts

This folder contains ready-to-use JavaScript scripts for Postman Collection Runner. These scripts are organized by functionality and can be copied directly into Postman's Pre-request Script or Tests (Post-script) tabs.

## 📁 Folder Structure

```
scripts/
├── README.md                           # This file
└── pokemon/                           # Pokemon API example scripts
    ├── get-pokemon-list/              # First request scripts
    │   ├── pre-script.js              # Clear variables
    │   └── post-script.js             # Extract random Pokemon name
    ├── get-pokemon-details/           # Second request scripts
    │   └── post-script.js             # Extract random ability
    └── get-ability-details/           # Third request scripts
        └── post-script.js             # Format and display results
```

## 🚀 How to Use

1. **Open the script file** you need
2. **Copy the entire contents** of the file
3. **Paste into Postman:**
   - Pre-scripts go in the "Pre-request Script" tab
   - Post-scripts go in the "Tests" tab (despite the name, this is where post-scripts go)

## 📝 Script Types

### Pre-scripts
- Run **before** each request
- Used for clearing variables, setting initial values
- File naming: `pre-script.js`

### Post-scripts  
- Run **after** each request
- Used for extracting data, setting variables for next requests
- File naming: `post-script.js`

## 🎯 Pokemon API Example

The Pokemon example demonstrates a complete data flow:

1. **Get Pokemon List** → Extract random Pokemon name
2. **Get Pokemon Details** → Extract random ability name  
3. **Get Ability Details** → Format and display results

## 💡 Tips

- Always check response status before processing data
- Use `console.log()` for debugging
- Variables are shared using `pm.collectionVariables`
- Test scripts individually before running the full collection

## 🔧 Customization

These scripts can be easily adapted for other APIs by:
- Changing the data extraction logic
- Modifying variable names
- Adjusting the response structure handling
- Updating the output formatting
