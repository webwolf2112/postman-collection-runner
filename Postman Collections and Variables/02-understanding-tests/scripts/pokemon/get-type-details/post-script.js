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

// randomPokemonType was chained forward from Get Pokemon Details, two
// requests back, so it has to be collection-scoped — this request never
// picks its own type, it just verifies the one selected earlier.
pm.test("Type name in response matches the chained variable", function () {
    const jsonData = pm.response.json();
    const expectedType = pm.collectionVariables.get("randomPokemonType");
    pm.expect(jsonData.name).to.eql(expectedType);
});

// PokeAPI always returns exactly these 6 damage-relation categories for
// every type. This list never changes and has nothing to do with data
// flowing between scripts, so it's just a plain const here.
const expectedDamageRelationKeys = [
    "no_damage_to",
    "half_damage_to",
    "double_damage_to",
    "no_damage_from",
    "half_damage_from",
    "double_damage_from"
];

pm.test("damage_relations has exactly the expected categories", function () {
    const jsonData = pm.response.json();
    const actualKeys = Object.keys(jsonData.damage_relations).sort();
    pm.expect(actualKeys).to.eql(expectedDamageRelationKeys.sort());
});
