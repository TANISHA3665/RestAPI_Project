const User = require('../models/user')

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({})
  return res.json(allDbUsers)
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  return res.json(user)
}

async function handleUpdateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {})
  return res.json({ status: 'success' })
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id)
  return res.json({ status: 'Deleted' })
}

async function handleCreateNewUser(req, res) {
  // When to use JSON Stringify?
  // JSON.stringify() A common use of JSON is to exchange data to/from a web server.
  // When sending data to a web server, the data has to be a string.
  // Convert a JavaScript object into a string with JSON.stringify().

  const body = req.body
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: ' All fields are required' })
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  })

  console.log(result)
  return res.status(201).json({ msg: 'success', id: result._id })
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
}
