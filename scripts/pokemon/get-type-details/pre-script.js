// Pick a random Pokémon type, entirely within this one request.
// This value has to travel from THIS pre-request script to THIS request's
// test script — two separate script executions that don't share JS scope,
// so a plain const won't survive the trip. That's exactly what pm.variables
// (a local variable) is for: pass data between the pre-request and test
// script of a single request. It never needs to leave this request, so
// there's nothing to unset and nothing that can leak into requests 1-3 or
// the next collection run — unlike pm.collectionVariables, which is built
// to persist across requests.

const pokemonTypes = ["electric", "water", "fire", "grass", "psychic", "dragon"];
const randomIndex = Math.floor(Math.random() * pokemonTypes.length);
const randomType = pokemonTypes[randomIndex];

pm.variables.set("randomType", randomType);
