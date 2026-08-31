// --- Local variable: track when the request was sent ---
// This needs to survive from this pre-request script to the test script
// below, but nowhere else — it has to be set fresh before every single
// request, since a stale timestamp would make the timing check meaningless.
// That's exactly what pm.variables (local, per-request scope) is for:
// unlike a collection variable, there's nothing to unset() and nothing that
// can leak into the next run.
pm.variables.set("requestStartTime", Date.now());
