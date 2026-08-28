// Check if the response was successful (HTTP 200)

if (pm.response.code === 200) {
    // Parse the JSON response body
    const responseJson = pm.response.json();
    // Access the array of results
    const resultsArray = responseJson.results; 

    // Proceed if a results array exists and is not empty
    if (resultsArray && resultsArray.length > 0) {
        // Generate a random index and get that name from the array 
        const randomIndex = Math.floor(Math.random() * resultsArray.length);
        const pokemonName = resultsArray[randomIndex]?.name;

        // Set the collectionVariables variable
        pm.collectionVariables.set("randomPokemonName", pokemonName);
    }

}
else {
    console.error(`Get Pokemon List failed with status ${pm.response.code}`);
    pm.execution.setNextRequest(null);
}

// --- Tests ---
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains a non-empty results array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.results).to.be.an("array").that.is.not.empty;
});