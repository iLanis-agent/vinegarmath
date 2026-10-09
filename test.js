const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.dilute) { let r; try { r = M.dilute(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'dilute ' + c.in); }
for (const c of E.make) { let r; try { r = M.make(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'make ' + c.in); }
for (const c of E.check) { let r; try { r = M.check(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'check ' + c.in); }
// anchors
const a = M.dilute(10, 500, 5);
eq(a.finalMl, 1000, 'anchor final'); eq(a.waterMl, 500, 'anchor water');
eq(M.make(750, 12).acidityPct, 12, 'anchor acidity'); eq(M.make(750, 12).motherMl, 150, 'anchor mother');
eq(M.check(500, 5, 500).pct, 2.5, 'anchor check pct');
// conservation: acid mass preserved in dilute
n++;
{
  const d = M.dilute(9, 700, 4.5);
  if (Math.abs(9 * 700 - 4.5 * d.finalMl) > 1) { fail++; console.error('FAIL conservation'); }
}
// errors
const errs = [
  () => M.dilute(0, 500, 5), () => M.dilute(10, 0, 5), () => M.dilute(10, 500, 0), () => M.dilute(5, 500, 10), () => M.dilute(5, 500, 5),
  () => M.make(0, 12), () => M.make(750, 0), () => M.make(750, 40), () => M.make(-1, 12),
  () => M.check(0, 5, 100), () => M.check(500, 0, 100), () => M.check(500, 5, -1),
];
const msgs = ['starting acidity must be positive','starting volume must be positive','target acidity must be positive','target must be weaker than what you have','target must be weaker than what you have',
  'wine volume must be positive','alcohol must be positive','over 20% ABV will not acetify well - dilute first (labeled)','wine volume must be positive',
  'vinegar volume must be positive','vinegar acidity must be positive','water cannot be negative'];
errs.forEach((f, i) => {
  n++;
  try { f(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);
