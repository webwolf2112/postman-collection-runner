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

/* Uncomment the else block to stop the Collection Runner if this call fails — without
    * it, the runner keeps going to the next requests with missing data, and
    * you get confusing failures downstream instead of a clear one here.
*/

// else {
//     console.error(`Get Pokemon List failed with status ${pm.response.code}`);
//     pm.execution.setNextRequest(null);
// }