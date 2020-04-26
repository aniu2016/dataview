test('test common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

test('test Object', () => {
  var a = {name: 'Pino'}
  var b = a
  var c = {name: 'Pino'}
  expect(a).toEqual(c)
  expect(a).toBe(b)
})
