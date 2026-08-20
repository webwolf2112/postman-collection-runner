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
// else {
//     console.error(`Get Pokemon Details failed with status ${pm.response.code}`);
//     pm.execution.setNextRequest(null);
// }
