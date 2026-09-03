# Postman Collections and Variables

Demo code for the **Postman Collections and Variables** series on [Vanessa's Dev Lab](https://www.youtube.com/@VanessasDevLab). Every video has its own self-contained folder here with the exact collection, scripts, and tutorial doc used on screen, so you can follow along or import it directly.

## 🚀 Quick Start

This project demonstrates how to use Postman's Collection Runner combined with pre and post script variables to create and populate frontend data in mere seconds with no manual steps.

### The 3-Step Process

1. **Create a runner collection** of API endpoints
2. **Set up Pre/Post scripts** to populate single and shared data
3. **Run your collection** to execute the automation

## 📺 Video Series

Each episode below is a folder here containing its own `collections/`, `docs/tutorial.md`, and `scripts/` — untouched snapshots of what's shown in that video, so later episodes never break earlier ones.

| # | Video | Folder |
|---|-------|--------|
| 1 | How To Use Postman Collections With Dynamic Collection Variables | [`01-dynamic-collection-variables/`](01-dynamic-collection-variables/) |
| 2 | Understanding Tests | [`02-understanding-tests/`](02-understanding-tests/) |

More episodes get added here as the series continues — check the [channel](https://www.youtube.com/@VanessasDevLab) for the full playlist.

## 📁 Folder Structure

```
Postman Collections and Variables/
├── README.md                           # This file
├── 01-dynamic-collection-variables/
│   ├── collections/pokemon-collection.json
│   ├── docs/tutorial.md
│   └── scripts/pokemon/...
└── 02-understanding-tests/
    ├── collections/pokemon-collection.json
    ├── docs/tutorial.md
    └── scripts/pokemon/...
```

General reference docs for this series (not tied to one video) live at [`../docs/`](../docs/README.md), and shared script usage notes at [`../scripts/`](../scripts/README.md).

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
   - Start with [Documentation Overview](../docs/README.md) for general concepts
   - Follow that video folder's `docs/tutorial.md` for the step-by-step walkthrough

4. **Run the example:**
   - Open the imported collection
   - Click "Run collection"
   - Watch the console for formatted results

## 📚 Documentation

- **[Documentation Overview](../docs/README.md)** - Start here for a complete overview
- **[Collection Setup](../docs/collection-setup.md)** - Detailed setup instructions
- **[Script Usage Guide](../scripts/README.md)** - How the scripts in each video folder are organized
- **[Troubleshooting](../docs/troubleshooting.md)** - Common issues and solutions
- **[Advanced Patterns](../docs/advanced-patterns.md)** - Advanced techniques

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
