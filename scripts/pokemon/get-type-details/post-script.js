pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Read back the local variable the pre-request script set above. It only
// had to survive the trip from that script to this one, so pm.variables is
// the right scope for it — this is the whole reason pm.variables.set()
// exists: pre-request and test scripts don't share JS scope, but they do
// share this request's local variables.
pm.test("Type name in response matches the type that was requested", function () {
    const jsonData = pm.response.json();
    const expectedType = pm.variables.get("randomType");
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
