# Postman Collection Runner Tutorial

This tutorial will guide you through creating an automated data population system using Postman Collection Runner with pre and post script variables.

## The 3-Step Process

### Step 1: Create a Runner Collection

From Postman, create a collection or folder containing the API calls you need to populate your data. These calls will run sequentially, so it's important to order them in the same sequence as your frontend if the calls are dependent on each other.

**Key Points:**
- Order matters - dependent calls should come after their dependencies
- Group related calls in folders for better organization
- Use descriptive names for requests
- Set up proper authentication if required

### Step 2: Set Up Pre/Post Scripts

This is where the magic happens! You'll use JavaScript to:
- Clear variables before each request (pre-scripts)
- Extract data from responses (post-scripts)
- Store data in collection variables for use in subsequent requests

### Step 3: Run Your Collection

Execute your collection using the Collection Runner to see your automated data population in action.

## Pokemon API Example

Let's walk through a practical example using the Pokemon API to demonstrate the concepts.

### API Endpoints We'll Use

1. `https://pokeapi.co/api/v2/pokemon` - Get list of Pokemon
2. `https://pokeapi.co/api/v2/pokemon/{{randomPokemonName}}` - Get specific Pokemon details
3. `https://pokeapi.co/api/v2/ability/{{randomPokemonAbility}}` - Get ability details

### Request Flow

```
Pokemon List → Random Pokemon Details → Random Ability Details
     ↓              ↓                        ↓
  Set name      Set ability              Display results
```

## Next Steps

- [View Script Examples](../scripts/README.md)
- [Set Up Your Collection](collection-setup.md)
- [Troubleshooting Common Issues](troubleshooting.md)
