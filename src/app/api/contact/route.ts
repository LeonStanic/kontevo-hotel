import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, propertyType, message } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Ime i email su obavezni.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Nevažeća email adresa.' },
        { status: 400 }
      );
    }

    // Prepare email content
    // Set CONTACT_EMAIL in .env.local to receive contact form submissions
    const ownerEmail = process.env.CONTACT_EMAIL || process.env.RESEND_FROM_EMAIL || 'info@kontevo.com';
    const subject = `Novi upit sa marketing stranice - ${name}`;
    
    const emailBody = `
Novi upit sa Kontevo marketing stranice:

Ime i prezime: ${name}
Email: ${email}
Telefon: ${phone || 'Nije naveden'}
Tip smještaja: ${propertyType || 'Nije naveden'}

Poruka:
${message || 'Nema poruke'}

---
Ova poruka je poslana sa marketing stranice Kontevo sustava.
`;

    // Send email to owner
    const emailResult = await sendEmail(
      ownerEmail,
      subject,
      emailBody,
      'Kontevo Marketing <noreply@kontevo.com>'
    );

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      // Still return success to user, but log the error
    }

    // Optional: Send confirmation email to the user
    const confirmationSubject = 'Hvala vam na upitu - Kontevo';
    const confirmationBody = `
Poštovani/a ${name},

Hvala vam što ste nas kontaktirali!

Primili smo vaš upit i javit ćemo vam se unutar 24 sata s detaljima o Kontevo sustavu i kako možemo pomoći vašem smještaju.

Vaš upit:
${message ? `"${message}"` : 'Nema dodatne poruke'}

Ako imate hitna pitanja, možete nas kontaktirati direktno na:
- Email: info@kontevo.com
- Telegram: @kontevo

Srdačan pozdrav,
Tim Kontevo
`;

    await sendEmail(
      email,
      confirmationSubject,
      confirmationBody,
      'Kontevo <noreply@kontevo.com>'
    );

    return NextResponse.json({ 
      success: true,
      message: 'Vaš upit je uspješno poslan! Javit ćemo vam se unutar 24 sata.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Došlo je do greške. Molimo pokušajte ponovno.' },
      { status: 500 }
    );
  }
}
