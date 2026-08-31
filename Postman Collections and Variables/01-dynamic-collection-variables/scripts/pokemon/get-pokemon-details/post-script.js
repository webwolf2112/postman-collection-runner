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
/* Uncomment the else block to stop the Collection Runner if this call fails — without
    * it, the runner keeps going to the next requests with missing data, and
    * you get confusing failures downstream instead of a clear one here.
*/

// else {
//     console.error(`Get Pokemon Details failed with status ${pm.response.code}`);
//     pm.execution.setNextRequest(null);
// }
