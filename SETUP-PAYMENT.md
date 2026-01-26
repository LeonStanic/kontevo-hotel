# 💳 Payment Setup Guide

Enable advance payment collection for bookings. Guests pay a percentage upfront (e.g., 30%) to secure their reservation.

## Overview

The payment system supports:
- ✅ **Demo/Test Mode** - No real charges, perfect for testing
- 🔄 **Stripe Integration** - Production-ready payment processing
- 💰 **Advance Payment** - Collect percentage of total (e.g., 30%)
- 🔒 **Secure** - PCI-compliant via Stripe

---

## Quick Setup (Demo Mode)

Perfect for testing without real charges:

### 1. Enable Payment in Config

Edit `src/config/property.ts`:

```typescript
features: {
  payment: {
    enabled: true,              // ← Enable payments
    advancePaymentPercent: 30,   // Collect 30% upfront
    testMode: true,              // Demo mode (no real charges)
  },
}
```

### 2. Test It!

1. Restart dev server: `npm run dev`
2. Make a test booking
3. Payment form will appear
4. Use any card number (e.g., `4242 4242 4242 4242`)
5. Payment will succeed instantly (demo mode)

**That's it!** Demo mode works immediately with no additional setup.

---

## Production Setup (Stripe)

For real payments, integrate with Stripe:

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete business verification
3. Add your bank account for payouts
4. Switch to **Live mode** (toggle in top right)

### Step 2: Get API Keys

1. In Stripe Dashboard, go to **Developers → API keys**
2. Copy these values:
   - **Publishable key** (starts with `pk_live_...`)
   - **Secret key** (starts with `sk_live_...`) - click "Reveal"

⚠️ **Important**: Use **Live keys** for production, **Test keys** for development

### Step 3: Install Stripe

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Step 4: Create Payment API Route

Create `src/app/api/payments/create-intent/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, propertyId } = await request.json();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata: {
        propertyId,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 5: Create Payment Confirmation Route

Create `src/app/api/payments/confirm/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId } = await request.json();

    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (paymentIntent.status === 'succeeded') {
      return NextResponse.json({
        success: true,
        paymentIntent,
      });
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 6: Update Environment Variables

Add to `.env.local`:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
```

**For Vercel deployment:**
1. Go to Project Settings → Environment Variables
2. Add both keys
3. Redeploy

### Step 7: Update PaymentConfig Type

Edit `src/types/index.ts`:

```typescript
export interface PaymentConfig {
  enabled: boolean;
  advancePaymentPercent: number;
  testMode: boolean;
  stripePublicKey?: string;  // Add this
}
```

### Step 8: Update Property Config

Edit `src/config/property.ts`:

```typescript
features: {
  payment: {
    enabled: true,
    advancePaymentPercent: 30,
    testMode: false,  // ← Switch to production
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
}
```

### Step 9: Update PaymentForm Component

Update `src/components/guest/PaymentForm.tsx` to use Stripe:

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// At the top of the component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// In handleSubmit, replace demo code with:
const stripe = useStripe();
const elements = useElements();

if (!stripe || !elements) {
  return;
}

// Create payment intent
const response = await fetch('/api/payments/create-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: advanceAmount,
    currency: property.currency,
    propertyId: property.id,
  }),
});

const { clientSecret } = await response.json();

// Confirm payment
const { error, paymentIntent } = await stripe.confirmCardPayment(
  clientSecret,
  {
    payment_method: {
      card: elements.getElement(CardElement)!,
      billing_details: {
        name: guestName,
        email: guestEmail,
      },
    },
  }
);

if (error) {
  setError(error.message);
  setIsProcessing(false);
} else if (paymentIntent?.status === 'succeeded') {
  // Payment successful!
  const paymentInfo: PaymentInfo = {
    status: 'paid',
    amount: advanceAmount,
    currency: property.currency,
    method: 'card',
    transactionId: paymentIntent.id,
    paidAt: new Date().toISOString(),
    cardLast4: paymentIntent.payment_method?.card?.last4,
    cardBrand: paymentIntent.payment_method?.card?.brand,
  };
  
  onPaymentComplete(paymentInfo);
}
```

---

## Testing Stripe Integration

### Test Mode (Development)

1. Use **Test keys** from Stripe Dashboard
2. Use test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`
3. Any future expiry date
4. Any 3-digit CVC

### Live Mode (Production)

1. Switch to **Live keys** in Stripe Dashboard
2. Use real cards for testing (small amounts)
3. Monitor in Stripe Dashboard → Payments

---

## Payment Flow

```
Guest Books Room
      ↓
Select Payment Option
      ↓
Enter Card Details
      ↓
[Stripe Processing]
      ↓
Payment Intent Created
      ↓
Card Charged (30% advance)
      ↓
Booking Confirmed
      ↓
Owner Notified
```

---

## Cost & Fees

| Provider | Setup | Transaction Fee |
|----------|-------|-----------------|
| **Stripe** | Free | 1.4% + €0.25 (EU cards)<br>2.9% + €0.25 (non-EU) |
| **PayPal** | Free | 2.9% + €0.35 |

**Example**: €100 booking, 30% advance = €30
- Stripe fee: €0.67 (EU) or €1.12 (non-EU)
- Client receives: €29.33 or €28.88

---

## Multi-Property Setup

For clients with multiple properties:

### Option 1: Single Stripe Account (Recommended)

- One Stripe account for all properties
- Unified payout to owner
- Easier accounting
- Set in owner's account settings

### Option 2: Per-Property Accounts

- Each property has own Stripe account
- Separate payouts
- More complex setup
- Use `property.stripeAccountId` in config

---

## Security Best Practices

1. ✅ **Never expose secret keys** - Only publishable key in frontend
2. ✅ **Use HTTPS** - Required for Stripe
3. ✅ **Validate amounts** - Server-side validation
4. ✅ **Webhook verification** - Verify Stripe webhooks
5. ✅ **PCI Compliance** - Stripe handles card data (never store)

---

## Webhook Setup (Optional but Recommended)

For real-time payment status updates:

### 1. Create Webhook Endpoint

Create `src/app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle payment events
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // Update booking status in database
    // Send confirmation email
  }

  return NextResponse.json({ received: true });
}
```

### 2. Configure in Stripe

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy webhook secret to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

---

## Troubleshooting

### Payment form not showing

- Check `features.payment.enabled: true` in config
- Verify `advancePaymentPercent > 0`
- Check browser console for errors

### Stripe errors

- Verify API keys are correct
- Check keys match mode (test vs live)
- Ensure HTTPS in production
- Check Stripe Dashboard → Logs

### Payment succeeds but booking not confirmed

- Check webhook endpoint is working
- Verify database connection
- Check server logs for errors

---

## Client Handover

When setting up for a client:

1. ✅ Stripe account created and verified
2. ✅ Bank account added for payouts
3. ✅ API keys added to environment variables
4. ✅ Test payment completed successfully
5. ✅ Webhook endpoint configured (optional)
6. ✅ Payment percentage set (e.g., 30%)
7. ✅ Client understands fees (~3% per transaction)

**Handover info:**
- Stripe Dashboard: `https://dashboard.stripe.com`
- Payout schedule: Usually 2-7 days
- Support: Stripe support or your contact

---

## Need Help?

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- Check server logs for detailed errors
- Contact Stripe support for account issues
