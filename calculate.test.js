const Calc = require('./calculate');
const calc = new Calc();

test('adds 1 + 2 to equal 3', () => {
    calc.init('1+2')
    expect(calc.calculateStep()).toBe(3);
});