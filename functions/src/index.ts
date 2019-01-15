import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer'

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailer@sznapka.pl',
    pass: 'ycUjaaZEdf50Y14I',
  },
});

exports.sendEmail = functions.firestore.document('/meetupers/{uid}').onWrite(async (change) => {
  const meetuper = change.after;

  try {
    await mailTransport.sendMail({
      from: 'mailer@sznapka.pl',
      to: 'wojciech@sznapka.pl',
      subject: `New Meetuper ${meetuper.get('name')} with opinion ${meetuper.get('score')} / 5`,
      text: 'Yass!',
    });
    console.log('Email sent');
  } catch (e) {
    console.error('Error while sending email', e);
  }
  return null;
});
