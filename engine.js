/* Vinegar math - exact arithmetic on labeled published norms. */
const MOTHER_PCT = 0.20; // labeled inoculation norm
const MONTHS_LO = 1, MONTHS_HI = 3; // labeled acetification window
const r1 = x => Math.round(x * 10) / 10;
const r2 = x => Math.round(x * 100) / 100;
const bad = m => { throw new Error(m); };

function dilute(havePct, haveMl, wantPct) {
  for (const [v, m] of [[havePct, 'starting acidity must be positive'], [haveMl, 'starting volume must be positive'], [wantPct, 'target acidity must be positive']])
    if (!Number.isFinite(v) || v <= 0) bad(m);
  if (wantPct >= havePct) bad('target must be weaker than what you have');
  const finalMl = (havePct * haveMl) / wantPct;
  const waterMl = finalMl - haveMl;
  let verdict;
  if (waterMl < 100) verdict = 'a splash of water (labeled)';
  else if (waterMl < 1000) verdict = 'a jug job (labeled)';
  else verdict = 'a bucket job - find a bigger vessel (labeled)';
  return { finalMl: r1(finalMl), waterMl: r1(waterMl), verdict };
}

function make(wineMl, abvPct) {
  if (!Number.isFinite(wineMl) || wineMl <= 0) bad('wine volume must be positive');
  if (!Number.isFinite(abvPct) || abvPct <= 0) bad('alcohol must be positive');
  if (abvPct > 20) bad('over 20% ABV will not acetify well - dilute first (labeled)');
  const acidityPct = abvPct; // labeled rough 1:1 conversion
  const motherMl = wineMl * MOTHER_PCT;
  let verdict;
  if (acidityPct < 4) verdict = 'a light table vinegar - labeled estimate, unmeasured';
  else if (acidityPct <= 7) verdict = 'around table strength - labeled estimate, unmeasured';
  else verdict = 'a strong vinegar, usually diluted - labeled estimate, unmeasured';
  return { acidityPct: r1(acidityPct), motherMl: r1(motherMl), monthsLo: MONTHS_LO, monthsHi: MONTHS_HI, verdict };
}

function check(vinegarMl, vinegarPct, waterMl) {
  if (!Number.isFinite(vinegarMl) || vinegarMl <= 0) bad('vinegar volume must be positive');
  if (!Number.isFinite(vinegarPct) || vinegarPct <= 0) bad('vinegar acidity must be positive');
  if (!Number.isFinite(waterMl) || waterMl < 0) bad('water cannot be negative');
  const pct = (vinegarMl * vinegarPct) / (vinegarMl + waterMl);
  let band;
  if (pct < 4) band = 'mild table acidity - arithmetic only, not a preservation check';
  else if (pct <= 6) band = 'standard table-strength range - arithmetic only, not a preservation check';
  else band = 'strong, usually diluted for the kitchen - arithmetic only, not a preservation check';
  return { pct: r2(pct), band };
}

const api = { MOTHER_PCT, MONTHS_LO, MONTHS_HI, dilute, make, check };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') window.Vinegarmath = api;
