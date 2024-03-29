const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const ejs = require("ejs");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `kaviarasu <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV == "prodection") {
    } else {
      return nodemailer.createTransport({
        host: process.env.email,
        port: process.env.port,
        auth: {
          user: process.env.username,
          pass: process.env.password,
        },
      });
    }
  }
  async send(templete, subject) {
    const html = await ejs.renderFile(
      `${__dirname}/../views/email/${templete}.ejs`,
      {
        name: this.name,
        url: this.url,
        subject,
      }
    );
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,

      // html:
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    this.send("welcome", "Welcome to Delicious Family!");
  }
};
