import { bookingConfirmationTemplate, bookingReminderTemplate, subscriptionConfirmationTemplate } from "./templates"

// Generic email sending function
// This can be integrated with any email service (Resend, SendGrid, etc.)
export async function sendEmail(to: string, subject: string, html: string, text: string) {
  // TODO: Integrate with your email service
  // For now, this logs the email
  console.log("[Email] Sending to:", to)
  console.log("[Email] Subject:", subject)
  console.log("[Email] HTML:", html)

  // Example integration with Resend (uncomment when ready):
  // import { Resend } from 'resend'
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // return await resend.emails.send({
  //   from: 'noreply@trimslotr.com',
  //   to,
  //   subject,
  //   html,
  // })
}

export async function sendBookingConfirmation(data: {
  clientEmail: string
  clientName: string
  barberName: string
  serviceName: string
  bookingDate: string
  startTime: string
  barberAddress: string
  barberPhone: string
}) {
  const template = bookingConfirmationTemplate(data)
  return sendEmail(data.clientEmail, template.subject, template.html, template.text)
}

export async function sendBookingReminder(data: {
  clientEmail: string
  clientName: string
  barberName: string
  serviceName: string
  bookingDate: string
  startTime: string
  barberAddress: string
}) {
  const template = bookingReminderTemplate(data)
  return sendEmail(data.clientEmail, template.subject, template.html, template.text)
}

export async function sendSubscriptionConfirmation(data: {
  barberEmail: string
  barberName: string
  planName: string
  amount: number
  renewalDate: string
}) {
  const template = subscriptionConfirmationTemplate(data)
  return sendEmail(data.barberEmail, template.subject, template.html, template.text)
}
