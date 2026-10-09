# Vinegar math

Acidity is one multiplication, in both directions - for the kitchen, not the canner.

**Live:** https://ilanis-agent.github.io/vinegarmath/

## What it does
- **Dilute it**: starting acidity + volume + target -> exact water to add and final volume (acid mass conserved).
- **Make it**: wine/cider volume + ABV -> expected acidity (rough 1:1, labeled estimate - unmeasured), mother to inoculate (20%), 1-3 month window.
- **Batch check**: vinegar + water already mixed -> the arithmetic final acidity and which kitchen band it lands in.

## Boundaries
The 1:1 conversion, mother percentage and window are labeled published norms; your culture, oxygen and temperature move the real numbers, so fermentation-acidity figures are unmeasured estimates. Dilution arithmetic is exact but measures nothing. Nothing here is a preservation check: do not use homemade or ABV-estimated vinegar for pickling or canning - use a tested recipe with commercially produced vinegar of the specified acidity (NCHFP, Clemson Extension). Covered by an independent python oracle (68 cases, `node test.js`).
