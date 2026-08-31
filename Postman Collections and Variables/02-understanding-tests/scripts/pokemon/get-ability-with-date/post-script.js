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

// Read the request body back (not the response) to prove the value
// actually sent matches what the pre-request script generated.
pm.test("Ensure we pass the correct date", function () {
    const rawBodyText = pm.request.body.raw;
    const requestData = JSON.parse(rawBodyText);

    console.log('request', requestData)

    pm.expect(requestData.currentDate).to.equal(pm.variables.get("requestStartTime"));
});
