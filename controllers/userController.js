const Email = require("../utils/email");

const User = [
	{
		id: 1,
		name: "John Doe",
		email: "johndoe@gmail.com",
		password: "password",
	},
	{
		id: 2,
		name: "Jane Doe",
		email: "janedoe@gmail.com",
		password: "password",
	},
];

const getUsers = (req, res) => {
	const users = User;

	res.status(200).json({
		status: "success",
		results: users.length,
		data: {
			users,
		},
	});
};

const createUser = async (req, res) => {
	const users = User;
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(401).json({
			status: "fail",
			message: "All fields are required",
		});
	}
	const newUser = { name, email, password };
	const newUserId = users[users.length - 1].id + 1;

	const currentUsers = [...users, { id: newUserId, ...newUser }];

	res.status(201).json({
		status: "success",
		data: {
			user: currentUsers,
		},
	});

	// Send Welcome Email
	const url =
		process.env.NODE_ENV === "production" ? `${process.env.FRONTEND_PROD_URL}/me` : `${process.env.FRONTEND_URL}/me`;

	await new Email(newUser, url).sendWelcome();
};

module.exports = { getUsers, createUser };
