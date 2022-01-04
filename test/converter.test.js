const User = require('./config')
const convert = require('../index')
const clauses = require('./clauses.json')

test('contains', async () => {
  const users = await User.findAll({
    where: convert(clauses.contains)
  })
  expect(users.length).toBe(clauses.contains[0].expect)
})

test('does not contains', async () => {
  const users = await User.findAll({
    where: convert(clauses.does_not_contains)
  })
  expect(users.length).toBe(clauses.does_not_contains[0].expect)
})

test('is', async () => {
  const users = await User.findAll({
    where: convert(clauses.is)
  })
  expect(users.length).toBe(clauses.is[0].expect)
})

test('is not', async () => {
  const users = await User.findAll({
    where: convert(clauses.is_not)
  })
  expect(users.length).toBe(clauses.is_not[0].expect)
})

test('star with', async () => {
  const users = await User.findAll({
    where: convert(clauses.start_with)
  })
  expect(users.length).toBe(clauses.start_with[0].expect)
})

test('end with', async () => {
  const users = await User.findAll({
    where: convert(clauses.end_with)
  })
  expect(users.length).toBe(clauses.end_with[0].expect)
})

test('equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.equal)
  })
  expect(users.length).toBe(clauses.equal[0].expect)
})

test('less than', async () => {
  const users = await User.findAll({
    where: convert(clauses.less_than)
  })
  expect(users.length).toBe(clauses.less_than[0].expect)
})

test('more than', async () => {
  const users = await User.findAll({
    where: convert(clauses.more_than)
  })
  expect(users.length).toBe(clauses.more_than[0].expect)
})

test('less than equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.less_than_equal)
  })
  expect(users.length).toBe(clauses.less_than_equal[0].expect)
})

test('more than equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.more_than_equal)
  })
  expect(users.length).toBe(clauses.more_than_equal[0].expect)
})

test('not equal', async () => {
  const users = await User.findAll({
    where: convert(clauses.not_equal)
  })
  expect(users.length).toBe(clauses.not_equal[0].expect)
})

test('at', async () => {
  const users = await User.findAll({
    where: convert(clauses.at)
  })
  expect(users.length).toBe(clauses.at[0].expect)
})

test('at between', async () => {
  const users = await User.findAll({
    where: convert(clauses.at_between)
  })
  expect(users.length).toBe(clauses.at_between[0].expect)
})

test('before', async () => {
  const users = await User.findAll({
    where: convert(clauses.before)
  })
  expect(users.length).toBe(clauses.before[0].expect)
})

test('after', async () => {
  const users = await User.findAll({
    where: convert(clauses.after)
  })
  expect(users.length).toBe(clauses.after[0].expect)
})

test('group or', async () => {
  const users = await User.findAll({
    where: convert(clauses.group_or)
  })
  expect(users.length).toBe(clauses.group_or[0].expect)
})

test('group or more', async () => {
  const users = await User.findAll({
    where: convert(clauses.group_or_more)
  })
  expect(users.length).toBe(clauses.group_or_more[0].expect)
})
