export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function bookingConfirmationTemplate(data: {
  clientName: string
  barberName: string
  serviceName: string
  bookingDate: string
  startTime: string
  barberAddress: string
  barberPhone: string
}): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1f2937; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .detail { margin: 15px 0; }
          .label { font-weight: bold; color: #1f2937; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.clientName},</p>
            <p>Your appointment has been confirmed. Here are your booking details:</p>
            
            <div class="detail">
              <span class="label">Barber:</span> ${data.barberName}
            </div>
            <div class="detail">
              <span class="label">Service:</span> ${data.serviceName}
            </div>
            <div class="detail">
              <span class="label">Date & Time:</span> ${data.bookingDate} at ${data.startTime}
            </div>
            <div class="detail">
              <span class="label">Location:</span> ${data.barberAddress}
            </div>
            <div class="detail">
              <span class="label">Contact:</span> ${data.barberPhone}
            </div>
            
            <p style="margin-top: 30px;">Please arrive 5-10 minutes early. If you need to reschedule or cancel, please contact the barber directly.</p>
            
            <a href="https://trimslotr.com" class="button">View Your Booking</a>
            
            <div class="footer">
              <p>This is an automated message from TrimSlotr. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
Booking Confirmed!

Hi ${data.clientName},

Your appointment has been confirmed. Here are your booking details:

Barber: ${data.barberName}
Service: ${data.serviceName}
Date & Time: ${data.bookingDate} at ${data.startTime}
Location: ${data.barberAddress}
Contact: ${data.barberPhone}

Please arrive 5-10 minutes early. If you need to reschedule or cancel, please contact the barber directly.

---
This is an automated message from TrimSlotr.
  `

  return {
    subject: `Booking Confirmed - ${data.barberName}`,
    html,
    text,
  }
}

export function bookingReminderTemplate(data: {
  clientName: string
  barberName: string
  serviceName: string
  bookingDate: string
  startTime: string
  barberAddress: string
}): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1f2937; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .detail { margin: 15px 0; }
          .label { font-weight: bold; color: #1f2937; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Reminder</h1>
          </div>
          <div class="content">
            <p>Hi ${data.clientName},</p>
            <p>This is a reminder about your upcoming appointment:</p>
            
            <div class="detail">
              <span class="label">Barber:</span> ${data.barberName}
            </div>
            <div class="detail">
              <span class="label">Service:</span> ${data.serviceName}
            </div>
            <div class="detail">
              <span class="label">Date & Time:</span> ${data.bookingDate} at ${data.startTime}
            </div>
            <div class="detail">
              <span class="label">Location:</span> ${data.barberAddress}
            </div>
            
            <p style="margin-top: 30px;">We look forward to seeing you!</p>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
Appointment Reminder

Hi ${data.clientName},

This is a reminder about your upcoming appointment:

Barber: ${data.barberName}
Service: ${data.serviceName}
Date & Time: ${data.bookingDate} at ${data.startTime}
Location: ${data.barberAddress}

We look forward to seeing you!
  `

  return {
    subject: `Reminder: Your appointment with ${data.barberName}`,
    html,
    text,
  }
}

export function subscriptionConfirmationTemplate(data: {
  barberName: string
  planName: string
  amount: number
  renewalDate: string
}): EmailTemplate {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1f2937; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .detail { margin: 15px 0; }
          .label { font-weight: bold; color: #1f2937; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Subscription Activated!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.barberName},</p>
            <p>Your subscription has been successfully activated. Here are your details:</p>
            
            <div class="detail">
              <span class="label">Plan:</span> ${data.planName}
            </div>
            <div class="detail">
              <span class="label">Amount:</span> $${(data.amount / 100).toFixed(2)}/month
            </div>
            <div class="detail">
              <span class="label">Next Renewal:</span> ${data.renewalDate}
            </div>
            
            <p style="margin-top: 30px;">You now have access to all premium features. Log in to your dashboard to get started!</p>
            
            <a href="https://trimslotr.com/barber/dashboard" class="button">Go to Dashboard</a>
          </div>
        </div>
      </body>
    </html>
  `

  const text = `
Subscription Activated!

Hi ${data.barberName},

Your subscription has been successfully activated. Here are your details:

Plan: ${data.planName}
Amount: $${(data.amount / 100).toFixed(2)}/month
Next Renewal: ${data.renewalDate}

You now have access to all premium features. Log in to your dashboard to get started!
  `

  return {
    subject: `Welcome to TrimSlotr ${data.planName} Plan`,
    html,
    text,
  }
}
