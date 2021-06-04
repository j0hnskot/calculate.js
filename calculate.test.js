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

test('adds 1 + 2 + 3 + 4 to equal 3, then 6', () => {
    calc.init('1+2+3')
    expect(calc.calculateStep()).toBe(3);
    expect(calc.calculateStep()).toBe(4);
});