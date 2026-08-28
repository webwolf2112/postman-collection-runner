// Check if the response was successful (HTTP 200)
if (pm.response.code === 200) {
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
        // 1. Pokémon Name (from previous request)
        "Pokemon Name": pokemonName, 
        // 2. Ability Name (from current request)
        "Ability": abilityName,
        // 4. Short Effect Text (from effect_entries)
        "Effect": englishEffectEntry ? englishEffectEntry.short_effect : "N/A",
        // 5. Flavor Text (long description)
        "Additional Info": latestFlavorTextEntry ? latestFlavorTextEntry.flavor_text.replace(/\n/g, ' ').trim() : "N/A"
    };

    // --- 2. Log to Console for Runner Output ---
    // Log a separator for easy finding
    console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");

    for (const [key, value] of Object.entries(standardizedOutput)) {
        // Log the key and the value separated by a colon
        console.log(`${key}: ${value}`);
    }
    console.log("⭐⭐⭐⭐⭐⭐⭐");
}

// --- Tests ---
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("English effect entry was found", function () {
    const jsonData = pm.response.json();
    const englishEffectEntry = jsonData.effect_entries.find(entry => entry.language.name === "en");
    pm.expect(englishEffectEntry, "No English effect_entries found").to.exist;
});
