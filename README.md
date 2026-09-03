# Postman Collection Runner

This repo is the demo code for [Vanessa's Dev Lab](https://www.youtube.com/@VanessasDevLab) on YouTube — every video in the **Postman Collections and Variables** series has its own self-contained folder here with the exact collection, scripts, and tutorial doc used on screen, so you can follow along or import it directly.

## 🚀 Quick Start

This project demonstrates how to use Postman's Collection Runner combined with pre and post script variables to create and populate frontend data in mere seconds with no manual steps.

### The 3-Step Process

1. **Create a runner collection** of API endpoints
2. **Set up Pre/Post scripts** to populate single and shared data
3. **Run your collection** to execute the automation

## 📺 Video Series: Postman Collections and Variables

Each episode below is a folder under [`Postman Collections and Variables/`](Postman%20Collections%20and%20Variables/) containing its own `collections/`, `docs/tutorial.md`, and `scripts/` — untouched snapshots of what's shown in that video, so later episodes never break earlier ones.

| # | Video | Folder |
|---|-------|--------|
| 1 | How To Use Postman Collections With Dynamic Collection Variables | [`01-dynamic-collection-variables/`](Postman%20Collections%20and%20Variables/01-dynamic-collection-variables/) |
| 2 | Understanding Tests | [`02-understanding-tests/`](Postman%20Collections%20and%20Variables/02-understanding-tests/) |

More episodes get added here as the series continues — check the [channel](https://www.youtube.com/@VanessasDevLab) for the full playlist.

## 📁 Project Structure

```
VanessasDevLab/
├── README.md                           # This file
├── docs/                              # General reference (not tied to one video)
│   ├── README.md                      # Documentation overview
│   ├── collection-setup.md            # Collection setup guide
│   ├── troubleshooting.md             # Common issues and solutions
│   └── advanced-patterns.md           # Advanced techniques
├── scripts/
│   └── README.md                      # How to use the scripts in each video folder
└── Postman Collections and Variables/ # One folder per video
    ├── 01-dynamic-collection-variables/
    │   ├── collections/pokemon-collection.json
    │   ├── docs/tutorial.md
    │   └── scripts/pokemon/...
    └── 02-understanding-tests/
        ├── collections/pokemon-collection.json
        ├── docs/tutorial.md
        └── scripts/pokemon/...
```

## 🎯 What You'll Learn

- How to structure API calls in the correct sequence
- Setting up pre-scripts to clear variables
- Using post-scripts to extract and store data
- Passing variables between requests
- Local (`pm.variables`) vs. collection (`pm.collectionVariables`) scope, and when each one is the right call
- Writing tests that verify real values, not just response shape
- Advanced patterns for complex data flows
- Error handling and debugging techniques

## 🏃‍♂️ Getting Started

1. **Pick a video folder** from the table above (or just use the latest one for the most complete example).

2. **Import the collection:**
   - Open Postman
   - Click "Import" and select that folder's `collections/pokemon-collection.json`

3. **Follow the tutorial:**
   - Start with [Documentation Overview](docs/README.md) for general concepts
   - Follow that video folder's `docs/tutorial.md` for the step-by-step walkthrough

4. **Run the example:**
   - Open the imported collection
   - Click "Run collection"
   - Watch the console for formatted results

## 📚 Documentation

- **[Documentation Overview](docs/README.md)** - Start here for a complete overview
- **[Collection Setup](docs/collection-setup.md)** - Detailed setup instructions
- **[Script Usage Guide](scripts/README.md)** - How the scripts in each video folder are organized
- **[Troubleshooting](docs/troubleshooting.md)** - Common issues and solutions
- **[Advanced Patterns](docs/advanced-patterns.md)** - Advanced techniques

## 🎮 Example: Pokemon API

Every video in this series builds on the same Pokemon API example, demonstrating:
- Random Pokemon selection
- Ability and type extraction
- Data formatting and display
- Variable passing between requests
- Tests that confirm the data flowing through actually matches the response

## 🛠️ Prerequisites

- Postman application installed
- Basic understanding of APIs and JSON
- Familiarity with JavaScript (for scripts)

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this guide.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
