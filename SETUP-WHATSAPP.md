# WhatsApp Notifications Setup

Send instant WhatsApp notifications to property owners when:
- 📬 New booking received
- 💳 Payment received
- ⏰ Guest arriving tomorrow (daily reminder)
- ✅ Booking confirmed
- ❌ Booking cancelled

## Quick Setup (5 minutes)

### 1. Create Twilio Account

1. Go to [twilio.com](https://www.twilio.com/try-twilio) and sign up (free)
2. Verify your phone number
3. You'll get **$15 free credit** - enough for ~1,000 WhatsApp messages!

### 2. Set Up WhatsApp Sandbox (Free Testing)

1. In Twilio Console, go to **Messaging → Try it Out → Send a WhatsApp message**
2. Follow the instructions to join the sandbox:
   - Save the Twilio WhatsApp number to your contacts
   - Send "join [your-sandbox-code]" via WhatsApp to that number
3. You'll see confirmation that you've joined the sandbox

### 3. Get Your Credentials

From [Twilio Console](https://console.twilio.com/):

1. **Account SID** - on the dashboard homepage
2. **Auth Token** - click to reveal on dashboard
3. **WhatsApp Number** - from the WhatsApp Sandbox settings (format: +14155238886)

### 4. Add to Environment Variables

Create or edit `.env.local` in your project root:

```bash
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_WHATSAPP_FROM=+14155238886
```

### 5. Configure Property Settings

Edit `src/config/property.ts`:

```typescript
whatsapp: {
  enabled: true,
  ownerPhone: '+385911234567',  // Owner's WhatsApp number
  notifyOnNewBooking: true,     // New booking alerts
  notifyOnPayment: true,        // Payment received alerts
  notifyOnDayBefore: true,      // Guest arriving tomorrow
},
```

### 6. Test It!

1. Restart your dev server: `npm run dev`
2. Make a test booking
3. You should receive a WhatsApp message! 📱

---

## Message Examples

### New Booking
```
🔔 *Nova rezervacija!*

👤 Ivan Horvat
📞 +385911234567
📧 ivan@email.com

🏠 Studio apartman
📅 01.02.2024 → 05.02.2024
🌙 4 noći
👥 2 gostiju

💰 *€356*
✅ Ara plaćena: €107

Provjerite upravljačku ploču za potvrdu.
```

### Payment Received
```
💳 *Plaćanje primljeno!*

👤 Ivan Horvat
🏠 Studio apartman

💰 Ara plaćena: *€107*
💳 **** 4242

📋 Ukupno: €356
📋 Ostatak na dolasku: €249
```

### Guest Arriving Tomorrow
```
⏰ *Gost dolazi sutra!*

👤 Ivan Horvat
📞 +385911234567

🏠 Studio apartman
📅 Prijava: Ponedjeljak, 01.02. 15:00
👥 2 gostiju

✅ Ara plaćena: €107
📋 Za naplatiti: €249
```

---

## Production Setup (Beyond Sandbox)

The sandbox is perfect for testing, but has limitations:
- Users must send "join" message first
- Messages show "from sandbox" label
- Only works with numbers that joined

### Upgrade to WhatsApp Business API

1. **Apply for WhatsApp Business API** in Twilio Console
2. **Register your business** (takes 1-3 days for approval)
3. **Create message templates** (required for outbound messages)
4. Update your `TWILIO_WHATSAPP_FROM` to your business number

### Message Templates

For production, you need pre-approved templates. Create these in Twilio:

**New Booking Template:**
```
🔔 Nova rezervacija od {{1}} za {{2}}. 
Datum: {{3}} - {{4}}
Ukupno: {{5}}
```

**Guest Arriving Template:**
```
⏰ Podsjetnik: {{1}} dolazi sutra ({{2}}) u {{3}}.
Kontakt: {{4}}
```

---

## Pricing

| Type | Cost |
|------|------|
| Sandbox (testing) | Free |
| WhatsApp Business (utility messages) | ~$0.005/message |
| WhatsApp Business (marketing) | ~$0.02/message |

Most booking notifications are "utility" messages = very cheap!

---

## Troubleshooting

### Messages not sending?

1. **Check credentials** - ensure all 3 env vars are set
2. **Sandbox joined?** - owner must send "join" message first
3. **Phone format** - use international format with + (e.g., +385...)
4. **Check console** - demo mode logs messages to console

### Demo Mode

If Twilio isn't configured, messages are logged to console:

```
📱 WhatsApp Notification (Demo Mode)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To: +385911234567
Message:
🔔 *Nova rezervacija!*
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(Configure Twilio to send real messages)
```

---

## Daily Arrival Reminders

The `sendDailyArrivalReminders` function checks for guests arriving tomorrow. To automate this:

### Option 1: Vercel Cron Job

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/arrival-reminders",
    "schedule": "0 8 * * *"
  }]
}
```

Create `/app/api/cron/arrival-reminders/route.ts`:
```typescript
import { sendDailyArrivalReminders } from '@/lib/whatsapp';
import { getBookings } from '@/lib/storage';
import { property } from '@/config/property';

export async function GET() {
  const bookings = getBookings();
  await sendDailyArrivalReminders(bookings, property);
  return Response.json({ success: true });
}
```

### Option 2: External Cron Service

Use [cron-job.org](https://cron-job.org) (free) to hit your API endpoint daily.

---

## Need Help?

- [Twilio WhatsApp Docs](https://www.twilio.com/docs/whatsapp)
- [Twilio Console](https://console.twilio.com/)
- [WhatsApp Business API Pricing](https://www.twilio.com/whatsapp/pricing)
