# 📱 Telegram Notifications Setup (FREE!)

Send instant notifications to property owners via Telegram - **completely free, unlimited messages!**

## Why Telegram?

| Feature | Telegram | WhatsApp (Twilio) |
|---------|----------|-------------------|
| Cost | **FREE** | ~$0.005/msg |
| Setup time | 5 minutes | 30+ minutes |
| Account needed | Just Telegram | Twilio + approval |
| Message limits | Unlimited | Pay per message |
| Rich formatting | ✅ Markdown | ✅ |
| Images/files | ✅ | ✅ |

---

## Quick Setup (5 minutes)

### Step 1: Create a Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Follow the prompts:
   - Choose a name (e.g., "Vila Marija Reservations")
   - Choose a username (e.g., "vilamarija_bot")
4. **Copy the bot token** - looks like: `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`

### Step 2: Get Your Chat ID

1. Start a chat with your new bot (search for its username)
2. Send any message to it (e.g., "Hello")
3. Open this URL in your browser (replace TOKEN with your bot token):
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
4. Look for `"chat":{"id":` - that number is your **chat ID**
   - Personal chats: positive number (e.g., `123456789`)
   - Groups: negative number (e.g., `-987654321`)

### Step 3: Configure in Property Config

Edit `src/config/property.ts`:

```typescript
features: {
  telegram: {
    enabled: true,                    // ← Enable Telegram
    botToken: '123456789:ABC...',     // ← Your bot token
    chatId: '987654321',              // ← Your chat ID
    notifyOnNewBooking: true,
    notifyOnPayment: true,
    notifyOnDayBefore: true,
  },
  // ... other features
}
```

### Step 4: Test It!

1. Restart your dev server
2. Make a test booking
3. You should receive a Telegram message! 🎉

---

## Message Examples

### New Booking
```
🔔 Nova rezervacija!

👤 Ivan Horvat
📞 +385 91 234 5678
📧 ivan@email.com

🏠 Studio apartman
📅 27.01.2026 → 30.01.2026
🌙 3 noći
👥 2 gostiju

💰 €267
✅ Ara plaćena: €80

📝 Molim rani check-in ako moguće

Provjerite upravljačku ploču za potvrdu.
```

### Guest Arriving Tomorrow
```
⏰ Gost dolazi sutra!

👤 Ivan Horvat
📞 +385 91 234 5678

🏠 Studio apartman
📅 Ponedjeljak, 27.01. 15:00
👥 2 gostiju

✅ Ara: €80
📋 Za naplatiti: €187
```

---

## Group Notifications (Optional)

Want notifications in a group chat (e.g., with your team)?

1. Create a Telegram group
2. Add your bot to the group
3. Make the bot an **admin** (Settings → Edit → Administrators)
4. Get the **group chat ID**:
   - Send a message in the group
   - Visit `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Find the group's negative chat ID (e.g., `-987654321`)
5. Use that chat ID in your config

---

## Security Notes

⚠️ **Keep your bot token secret!**

- Don't commit it to public repositories
- Use environment variables for production:

```typescript
// In property.ts
telegram: {
  enabled: true,
  botToken: process.env.TELEGRAM_BOT_TOKEN || '',
  chatId: process.env.TELEGRAM_CHAT_ID || '',
  // ...
}
```

```bash
# In .env.local
TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
TELEGRAM_CHAT_ID=987654321
```

---

## Troubleshooting

### "Message not received"

1. Make sure you started a chat with the bot
2. Verify the bot token is correct
3. Verify the chat ID is correct
4. Check server console for errors

### "Bot token invalid"

- Make sure you copied the entire token including the colon
- Token format: `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`

### "Chat not found"

- For personal chats: Start a conversation with the bot first
- For groups: Make sure the bot is added and is an admin

### Test the bot manually

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<CHAT_ID>", "text": "Test message!"}'
```

---

## Demo Mode

If the bot token or chat ID is not configured, messages are logged to console:

```
📱 Telegram Notification (Demo Mode)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Chat ID: (not configured)
Message:
🔔 *Nova rezervacija!*
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(Configure botToken and chatId to send real messages)
```

---

## Daily Reminders (Cron Job)

To send "guest arriving tomorrow" reminders automatically:

### Vercel Cron

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
import { sendDailyArrivalReminders } from '@/lib/notifications';
import { getBookings } from '@/lib/storage';
import { property } from '@/config/property';

export async function GET() {
  const bookings = getBookings();
  await sendDailyArrivalReminders(bookings, property);
  return Response.json({ success: true });
}
```

---

## Need Help?

- [Telegram Bot API Docs](https://core.telegram.org/bots/api)
- [@BotFather](https://t.me/botfather) - Create and manage bots
