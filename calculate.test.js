const Calc = require('./calculate');
const calc = new Calc();

test('adds 1 + 2 to equal 3', () => {
    calc.init('1+2')
    expect(calc.calculateStep()).toBe(3);
});

test('adds 1 + 2 + 3 to equal 3, then 6', () => {
    calc.init('1+2+3')
    expect(calc.calculateStep()).toBe(3);
    expect(calc.calculateStep()).toBe(6);
});

test('adds 1 + 2 + 3 to equal 6', () => {
    calc.init('1+2+3')
    expect(calc.solve()).toBe(6);
});

test('4 * (5 + 3) to equal 32', () => {
    calc.init('4 * (5 + 3)')
    expect(calc.solve()).toBe(32);
});

test('30/5 * 3 to step to 6 × 3', () => {
    calc.init('30/5 * 3')
    calc.calculateStep();
    expect(calc.expression).toBe("6*3");
});

test('30/5 * 3 = 18', () => {
    calc.init('30/5 * 3')
    expect(calc.solve()).toBe(18);
});

test('3 * (4 * (5*5)) / 6 + 7 – 8 = 49', () => {
    calc.init('3 * (4 * (5*5)) / 6 + 7 - 8')
    expect(calc.calculateStep()).toBe(25);
    expect(calc.calculateStep()).toBe(100);
    expect(calc.solve()).toBe(49);
});