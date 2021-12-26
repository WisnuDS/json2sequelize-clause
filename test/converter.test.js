const User = require('./config')
const convert = require('../index')
const clauses = require('./clauses.json')

test('contains', async () => {
  const users = await User.findAll({
    where: convert(clauses.contains)
  })
  expect(users.length).toBe(clauses.contains.expect)
})

test('does not contains', async () => {
  const users = await User.findAll({
    where: convert(clauses.does_not_contains)
  })
  expect(users.length).toBe(clauses.does_not_contains.expect)
})

test('is', async () => {
  const users = await User.findAll({
    where: convert(clauses.is)
  })
  expect(users.length).toBe(clauses.is.expect)
})

test('is not', async () => {
  const users = await User.findAll({
    where: convert(clauses.is_not)
  })
  expect(users.length).toBe(clauses.is_not.expect)
})

test('star with', async () => {
  const users = await User.findAll({
    where: convert(clauses.start_with)
  })
  expect(users.length).toBe(clauses.start_with.expect)
})

test('end with', async () => {
  const users = await User.findAll({
    where: convert(clauses.end_with)
  })
  expect(users.length).toBe(clauses.end_with.expect)
})

test('equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.equal)
  })
  expect(users.length).toBe(clauses.equal.expect)
})

test('less than', async () => {
  const users = await User.findAll({
    where: convert(clauses.less_than)
  })
  expect(users.length).toBe(clauses.less_than.expect)
})

test('more than', async () => {
  const users = await User.findAll({
    where: convert(clauses.more_than)
  })
  expect(users.length).toBe(clauses.more_than.expect)
})

test('less than equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.less_than_equal)
  })
  expect(users.length).toBe(clauses.less_than_equal.expect)
})

test('more than equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.more_than_equal)
  })
  expect(users.length).toBe(clauses.more_than_equal.expect)
})

test('not equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.not_equal)
  })
  expect(users.length).toBe(clauses.not_equal.expect)
})

test('at', async () => {
  const users = await User.findAll({
    where: convert(clauses.at)
  })
  expect(users.length).toBe(clauses.at.expect)
})

test('at between', async () => {
  const users = await User.findAll({
    where: convert(clauses.at_between)
  })
  expect(users.length).toBe(clauses.at_between.expect)
})

test('before', async () => {
  const users = await User.findAll({
    where: convert(clauses.before)
  })
  expect(users.length).toBe(clauses.before.expect)
})

test('after', async () => {
  const users = await User.findAll({
    where: convert(clauses.after)
  })
  expect(users.length).toBe(clauses.after.expect)
})
