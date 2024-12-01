const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.firstName = user.firstName;
		this.url = url;
		this.from = `COMPANY_NAME <${process.env.EMAIL_FROM}>`;
	}

	// 1) Create a transporter
	newTransport() {
		if (process.env.NODE_ENV === "production") {
			// BREVO
			return nodemailer.createTransport({
				host: process.env.BREVO_HOST,
				port: process.env.BREVO_PORT,
				secure: false,
				auth: {
					user: process.env.BREVO_USERNAME,
					pass: process.env.BREVO_PASSWORD,
				},
			});
		}

		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	async send(template, subject) {
		// 1) Render HTML based on a pug template
		const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
			firstName: this.firstName,
			url: this.url,
			subject,
		});

		// 2) Define the email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: convert(html),
		};

		// 3) Create a transport and send email
		await this.newTransport().sendMail(mailOptions);
	}

	async sendWelcome() {
		await this.send("Welcome", "Welcome to my Mailing System!");
	}

	async sendPasswordReset() {
		await this.send("PasswordReset", "Your password reset token (valid for only 10 minutes)");
	}
};
