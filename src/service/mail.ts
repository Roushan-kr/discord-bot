import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

// Send bulk email
export const sendBulkEmail = async (
  recipients: string[],
  message: string,
  subject?: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'notification <admin@devroush.tech',
      to: recipients,
      subject: subject || 'Important Notification',
      html: `<p>${message}</p>`,
    });
    console.log('Bulk mail log: ', data);
    console.log('Bulk mail log error: ', error);
  } catch (error) {
    console.error('❌ Error sending bulk email:', error);
  }
};

// Send individual emails
export const sendIndividualEmails = async (
  data: { sandTo: string; message: string; subject: string }[]
) => {
  try {
    for (const { sandTo, message, subject } of data) {
      await resend.emails.send({
        from: 'notification <admin@devroush.tech>',
        to: sandTo,
        subject: subject || 'Personalized Message',
        html: `<p>${message}</p>`,
      });
    }
  } catch (error) {
    console.error('❌ Error sending individual emails:', error);
  }
};
