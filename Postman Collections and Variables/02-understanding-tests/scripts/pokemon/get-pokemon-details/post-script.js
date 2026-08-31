// Check if the response was successful (HTTP 200)
if (pm.response.code === 200) {
    const responseJson = pm.response.json();

    const resultsArray = responseJson.abilities; 
    
    // Check if the array is not empty
    if (resultsArray && resultsArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * resultsArray.length);
        const pokemonAbility = resultsArray[randomIndex].ability.name;
        // Set the collectionVariables variable (persists until unset or overridden)
        pm.collectionVariables.set("randomPokemonAbility", pokemonAbility);
    }

    const typesArray = responseJson.types;
    // Check if the array is not empty
    if (typesArray && typesArray.length > 0) {
        const randomTypeIndex = Math.floor(Math.random() * typesArray.length);
        const pokemonType = typesArray[randomTypeIndex].type.name;
        // Set the collectionVariables variable (persists until unset or overridden)
        pm.collectionVariables.set("randomPokemonType", pokemonType);
    }
}
else {
    console.error(`Get Pokemon Details failed with status ${pm.response.code}`);
    pm.execution.setNextRequest(null);
}

// --- Tests ---
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains a non-empty abilities array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.abilities).to.be.an("array").that.is.not.empty;
});

// Comparing against the local pokemonAbility/pokemonType variables would be
// circular — that's the exact value we just fed into set(). Checking
// against the response's own arrays instead proves the stored value is a
// real ability/type this Pokémon actually has, not just any string.
pm.test("randomPokemonAbility collection variable matches an ability in the response", function () {
    const jsonData = pm.response.json();
    const abilityNames = jsonData.abilities.map((entry) => entry.ability.name);
    pm.expect(abilityNames).to.include(pm.collectionVariables.get("randomPokemonAbility"));
});

pm.test("randomPokemonType collection variable matches a type in the response", function () {
    const jsonData = pm.response.json();
    const typeNames = jsonData.types.map((entry) => entry.type.name);
    pm.expect(typeNames).to.include(pm.collectionVariables.get("randomPokemonType"));
});
