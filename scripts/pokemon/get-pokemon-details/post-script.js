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
}
else {
    console.error(`Get Pokemon Details failed with status ${pm.response.code}`);
    pm.execution.setNextRequest(null);
}

// --- Tests ---
// randomPokemonName had to be collection-scoped to survive the trip from the
// previous request. It doesn't need that lifespan here — it's only read once,
// by this request's own tests — so pull it into a local variable instead of
// reaching for pm.collectionVariables again. Local scope is discarded once
// this script finishes, so there's nothing to unset() and nothing that can
// leak into the next run.
pm.variables.set("expectedPokemonName", pm.collectionVariables.get("randomPokemonName"));

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Pokémon name matches the chained variable", function () {
    const jsonData = pm.response.json();
    const expectedName = pm.variables.get("expectedPokemonName");
    pm.expect(jsonData.name).to.eql(expectedName);
});

pm.test("Response contains a non-empty abilities array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.abilities).to.be.an("array").that.is.not.empty;
});
