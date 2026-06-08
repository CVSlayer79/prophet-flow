/**
 * Outreach Module
 */

async function sendSMS(phoneNumber, message) {
  // In a real app, use Twilio API
  console.log(`[SMS] Sending to ${phoneNumber}: "${message}"`);
  return { success: true, sid: "mock_sid_12345" };
}

async function sendEmail(email, subject, body) {
  // In a real app, use SendGrid or Mailgun
  console.log(`[Email] Sending to ${email}: ${subject}`);
  return { success: true };
}

module.exports = {
  sendSMS,
  sendEmail
};
