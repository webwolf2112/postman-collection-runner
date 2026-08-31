# Postman Collection Runner Tutorial

Postman is usually thought of as a backend API testing tool, but it can also automate frontend data population. For any application that relies on API data, setting up automated data population saves a significant amount of manual setup time. The feature that makes this possible is **Postman Collection Runner** — it runs a series of API calls in a specific order, and combined with pre- and post-request scripts, it's genuinely a game changer.

## The 3-Step Process

### Step 1: Create a Runner Collection

From Postman, create a collection or folder containing the API calls you need to populate your data. These calls will run sequentially, so it's important to order them in the same sequence as your frontend if the calls are dependent on each other.

**Key Points:**
- Order matters - dependent calls should come after their dependencies
- Group related calls in folders for better organization
- Use descriptive names for requests
- Set up proper authentication if required

### Step 2: Set Up Pre/Post Scripts

This is where the magic happens. Pre-scripts run before your request, post-scripts run after receiving the response. Use them to:
- Clear variables before each request (pre-scripts)
- Extract data from responses (post-scripts)
- Store data in collection variables for use in subsequent requests

### Step 3: Run Your Collection

Execute your collection using the Collection Runner, and watch as your variables get populated and passed between requests automatically.

## Pokemon API Example

Let's walk through a practical example using the Pokemon API to demonstrate how variables flow between requests.

### 1. Initial API Call

```
GET https://pokeapi.co/api/v2/pokemon
```

**Pre Script: Clear out Variables**
```javascript
pm.collectionVariables.unset("randomPokemonName");
pm.collectionVariables.unset("randomPokemonAbility");
pm.collectionVariables.unset("randomPokemonType");
```

**Post Script: Set Variables**
```javascript
// Check if the response was successful (HTTP 200)
if (pm.response.code === 200) {
    // Parse the JSON response body
    const responseJson = pm.response.json();

    // Access the array of results
    const resultsArray = responseJson.results;

    // Check if the array is not empty
    if (resultsArray && resultsArray.length > 0) {
        // Generate a random index and get that name from the array
        const randomIndex = Math.floor(Math.random() * resultsArray.length);
        const pokemonName = resultsArray[randomIndex]?.name;

        // Set the collectionVariables variable
        pm.collectionVariables.set("randomPokemonName", pokemonName);
    }
}
```

**Tests**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains a non-empty results array", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.results).to.be.an("array").that.is.not.empty;
});

// Comparing against the local pokemonName variable would be circular —
// that's the exact value we just fed into set(). Checking against the
// response's own results array instead proves the stored value is a real
// Pokémon name from this list, not just any string.
pm.test("randomPokemonName collection variable matches a name in the response", function () {
    const responseJson = pm.response.json();
    const names = responseJson.results.map((entry) => entry.name);
    pm.expect(names).to.include(pm.collectionVariables.get("randomPokemonName"));
});
```

### 2. Use the Results in the Next Call

```
GET https://pokeapi.co/api/v2/pokemon/{{randomPokemonName}}
```

**Post Script: Set the Ability Variable**
```javascript
// Check if the response was successful (HTTP 200)
if (pm.response.code === 200) {
    const responseJson = pm.response.json();

    const resultsArray = responseJson.abilities;

    // Check if the array is not empty
    if (resultsArray && resultsArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * resultsArray.length);
        const pokemonAbility = resultsArray[randomIndex].ability.name;

        // Set the collectionVariables variable
        pm.collectionVariables.set("randomPokemonAbility", pokemonAbility);
    }

    // Some Pokémon have more than one type, so pick one at random the same
    // way we picked an ability above. This is the type the Get Type Details
    // request will use — no need to invent an unrelated random type, since
    // this Pokémon's real type(s) are already sitting in this response.
    const typesArray = responseJson.types;
    if (typesArray && typesArray.length > 0) {
        const randomTypeIndex = Math.floor(Math.random() * typesArray.length);
        const pokemonType = typesArray[randomTypeIndex].type.name;
        pm.collectionVariables.set("randomPokemonType", pokemonType);
    }
}
else {
    console.error(`Get Pokemon Details failed with status ${pm.response.code}`);
    pm.execution.setNextRequest(null);
}
```

**Tests**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains a non-empty abilities array", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.abilities).to.be.an("array").that.is.not.empty;
});

// Comparing against the local pokemonAbility/pokemonType variables would be
// circular — that's the exact value we just fed into set(). Checking
// against the response's own arrays instead proves the stored value is a
// real ability/type this Pokémon actually has, not just any string.
pm.test("randomPokemonAbility collection variable matches an ability in the response", function () {
    const responseJson = pm.response.json();
    const abilityNames = responseJson.abilities.map((entry) => entry.ability.name);
    pm.expect(abilityNames).to.include(pm.collectionVariables.get("randomPokemonAbility"));
});

pm.test("randomPokemonType collection variable matches a type in the response", function () {
    const responseJson = pm.response.json();
    const typeNames = responseJson.types.map((entry) => entry.type.name);
    pm.expect(typeNames).to.include(pm.collectionVariables.get("randomPokemonType"));
});
```

### 3. Final Call Using Both Variables

```
GET https://pokeapi.co/api/v2/ability/{{randomPokemonAbility}}
```

**Post Script: Display Results (Optional)**
```javascript
// --- 1. Gather Data ---
const responseJson = pm.response.json();

// 1a. Get data from Postman Variables (using the 'or' operator for a safe default)
const pokemonName = pm.collectionVariables.get("randomPokemonName") || "Bulbasaur";

// 1b. Read Ability Name and ID from the response
const abilityName = responseJson.name;
const abilityId = responseJson.id;

// 1c. Filter for the English effect entry (the main short description)
const englishEffectEntry = responseJson.effect_entries.find(entry => entry.language.name === "en");

// 1d. Filter for the latest English flavor text (the long description)
// We reverse the array and find the first English entry, which is usually the newest/latest
const latestFlavorTextEntry = responseJson.flavor_text_entries
    .reverse()
    .find(entry => entry.language.name === "en");

// 1e. Clean and combine the required data into a single object
const standardizedOutput = {
    "Pokemon Name": pokemonName,
    "Ability": abilityName,
    "Effect": englishEffectEntry ? englishEffectEntry.short_effect : "N/A",
    "Additional Info": latestFlavorTextEntry ? latestFlavorTextEntry.flavor_text.replace(/\n/g, ' ').trim() : "N/A"
};

// --- 2. Log to Console for Runner Output ---
console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");

for (const [key, value] of Object.entries(standardizedOutput)) {
    console.log(`${key}: ${value}`);
}
console.log("⭐⭐⭐⭐⭐⭐⭐");
```

**Tests: Local vs Collection Variables**
```javascript
// --- Collection variable (set by the previous request's Post Script) ---
// Real shared state — the ability name was picked randomly, so this is
// the only reliable way to know which one we actually got back.
const actualAbilityName = pm.collectionVariables.get("randomPokemonAbility");

// --- Local variable (scoped to THIS script only) ---
// Only exists for this one test — never saved to the collection, never
// passed to another request. A checklist of fields we always expect to
// see, regardless of which ability was randomly picked.
const requiredFields = ["name", "id", "effect_entries", "flavor_text_entries", "pokemon"];

pm.test("Ability name matches the ability that was actually requested", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.name).to.eql(actualAbilityName);
});

pm.test("Response includes all required fields", function () {
    const responseJson = pm.response.json();
    requiredFields.forEach((field) => {
        pm.expect(responseJson).to.have.property(field);
    });
});

// --- The finale: cross-check data integrity across the whole chain ---
// By this point in the run, both collection variables already had to exist
// just to make this request — {{randomPokemonAbility}} is in the URL. So
// checking they're "not empty" proves nothing new. What's actually worth
// asserting: does the API agree the Pokemon from request 2 really has the
// ability from request 3? That's a real correctness check, not a formality.
pm.test("The original Pokemon is listed as having this ability", function () {
    const responseJson = pm.response.json();
    const pokemonName = pm.collectionVariables.get("randomPokemonName");
    const pokemonNamesWithThisAbility = responseJson.pokemon.map((entry) => entry.pokemon.name);
    pm.expect(pokemonNamesWithThisAbility).to.include(pokemonName);
});
```

### 4. Bonus Call: Get Type Details

```
GET https://pokeapi.co/api/v2/type/{{randomPokemonType}}
```

**Pre Script: A Second Kind of Local Variable**
```javascript
// --- Local variable: track when the request was sent ---
// This needs to survive from this pre-request script to the test script
// below, but nowhere else — it has to be set fresh before every single
// request, since a stale timestamp would make the timing check meaningless.
// That's exactly what pm.variables (local, per-request scope) is for:
// unlike a collection variable, there's nothing to unset() and nothing that
// can leak into the next run.
pm.variables.set("requestStartTime", Date.now());
```

**Tests: Two Kinds of Local Variable**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Read back the local variable the pre-request script set before sending
// the request. Since it's local (not a collection variable), it's
// guaranteed to be from THIS request — nothing stale, nothing left over
// from a previous run.
pm.test("Response arrived within a reasonable time", function () {
    const requestStartTime = Number(pm.variables.get("requestStartTime"));
    const elapsed = Date.now() - requestStartTime;

    pm.expect(elapsed, "round trip should complete quickly").to.be.below(5000);
});

// --- Collection variable (set by request 2's Post Script) ---
// randomPokemonType was chained forward from Get Pokemon Details, two
// requests back, so it has to be collection-scoped — this request never
// picks its own type, it just verifies the one selected earlier.
pm.test("Type name in response matches the chained variable", function () {
    const responseJson = pm.response.json();
    const actualTypeName = pm.collectionVariables.get("randomPokemonType");
    pm.expect(responseJson.name).to.eql(actualTypeName);
});

// --- Local variable (plain const, scoped to THIS script only) ---
// PokeAPI always returns exactly these 6 damage-relation categories for
// every type. This list never changes, has nothing to do with data
// flowing between requests, and every other request in this collection
// has zero use for it — so it has no business being a collection
// variable. It's a fixed reference value this one test needs, nothing more.
const expectedDamageRelationKeys = [
    "no_damage_to",
    "half_damage_to",
    "double_damage_to",
    "no_damage_from",
    "half_damage_from",
    "double_damage_from"
];

pm.test("damage_relations has exactly the expected categories", function () {
    const responseJson = pm.response.json();
    const actualKeys = Object.keys(responseJson.damage_relations).sort();
    pm.expect(actualKeys).to.eql(expectedDamageRelationKeys.sort());
});
```

## Next Steps

- [View Script Examples](../scripts/README.md)
- [Set Up Your Collection](collection-setup.md)
- [Troubleshooting Common Issues](troubleshooting.md)
