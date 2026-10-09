# Vinegar math

Acidity is one multiplication, in both directions.

**Live:** https://ilanis-agent.github.io/vinegarmath/

## What it does
- **Dilute it**: starting acidity + volume + target -> exact water to add and final volume (acid mass conserved).
- **Make it**: wine/cider volume + ABV -> expected acidity (rough 1:1, labeled), mother to inoculate (20%), 1-3 month window.
- **Batch check**: vinegar + water already mixed -> the real final acidity and which band it lands in.

## Boundaries
The 1:1 conversion, mother percentage and window are labeled published norms; your culture, oxygen and temperature move the real numbers. Dilution arithmetic is exact and covered by an independent python oracle (68 cases, `node test.js`).
