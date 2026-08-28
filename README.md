# Postman Collection Runner

A comprehensive guide and collection for using Postman Collection Runner with pre and post script variables to automate data population for frontend applications.

## 🚀 Quick Start

This project demonstrates how to use Postman's Collection Runner combined with pre and post script variables to create and populate frontend data in mere seconds with no manual steps.

### The 3-Step Process

1. **Create a runner collection** of API endpoints
2. **Set up Pre/Post scripts** to populate single and shared data  
3. **Run your collection** to execute the automation

## 📁 Project Structure

```
postman-collection-runner/
├── README.md                           # This file
├── docs/                              # Documentation
│   ├── README.md                      # Documentation overview
│   ├── tutorial.md                    # Step-by-step tutorial
│   ├── collection-setup.md            # Collection setup guide
│   ├── troubleshooting.md             # Common issues and solutions
│   └── advanced-patterns.md           # Advanced techniques
├── scripts/                           # Copy-paste ready scripts
│   ├── README.md                      # Script usage guide
│   └── pokemon/                       # Pokemon API scripts
│       ├── get-pokemon-list/          # List Pokemon request
│       │   ├── pre-script.js          # Clear variables
│       │   └── post-script.js         # Extract random Pokemon
│       ├── get-pokemon-details/       # Get Pokemon request
│       │   └── post-script.js         # Extract random ability + type
│       ├── get-ability-details/       # Get Ability request
│       │   └── post-script.js         # Format and display results
│       └── get-type-details/          # Bonus: Get Type request
│           ├── pre-script.js          # Read local variable
│           └── post-script.js         # Verify damage relations
└── collections/                       # Postman collections
    └── pokemon-collection.json        # Pokemon API example collection
```

## 🎯 What You'll Learn

- How to structure API calls in the correct sequence
- Setting up pre-scripts to clear variables
- Using post-scripts to extract and store data
- Passing variables between requests
- Creating reusable data population workflows
- Advanced patterns for complex data flows
- Error handling and debugging techniques

## 🏃‍♂️ Getting Started

1. **Import the collection:**
   - Open Postman
   - Click "Import" and select `collections/pokemon-collection.json`

2. **Follow the tutorial:**
   - Start with [Documentation Overview](docs/README.md)
   - Follow the [Step-by-Step Tutorial](docs/tutorial.md)

3. **Run the example:**
   - Open the imported collection
   - Click "Run collection"
   - Watch the console for formatted results

## 📚 Documentation

- **[Documentation Overview](docs/README.md)** - Start here for a complete overview
- **[Tutorial](docs/tutorial.md)** - Step-by-step walkthrough
- **[Collection Setup](docs/collection-setup.md)** - Detailed setup instructions
- **[Script Examples](scripts/)** - Copy-paste ready JavaScript files
- **[Troubleshooting](docs/troubleshooting.md)** - Common issues and solutions
- **[Advanced Patterns](docs/advanced-patterns.md)** - Advanced techniques

## 🎮 Example: Pokemon API

The included Pokemon collection demonstrates:
- Random Pokemon selection
- Ability extraction
- Data formatting and display
- Variable passing between requests

## 🛠️ Prerequisites

- Postman application installed
- Basic understanding of APIs and JSON
- Familiarity with JavaScript (for scripts)

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this guide.

## 📄 License

This project is open source and available under the [MIT License](LICENSE). 
