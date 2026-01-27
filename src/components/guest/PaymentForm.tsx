'use client';

import { useState } from 'react';
import { useProperty } from '@/context/PropertyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  CreditCard, 
  Lock, 
  Check, 
  AlertCircle,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { PaymentInfo } from '@/types';

interface PaymentFormProps {
  totalPrice: number;
  onPaymentComplete: (paymentInfo: PaymentInfo) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function PaymentForm({ totalPrice, onPaymentComplete, onBack, onSkip }: PaymentFormProps) {
  const { property, t } = useProperty();
  const paymentConfig = property.payment;
  
  // Calculate advance payment amount
  const advancePercent = paymentConfig?.advancePaymentPercent || 30;
  const advanceAmount = Math.round(totalPrice * (advancePercent / 100) * 100) / 100;
  const remainingAmount = Math.round((totalPrice - advanceAmount) * 100) / 100;
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 16);
    const groups = limited.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
    }
    return numbers;
  };

  // Card brand detection
  const getCardBrand = (number: string): string => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'card';
  };

  // Validate form
  const isFormValid = () => {
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    return (
      cleanCardNumber.length >= 15 &&
      cardHolder.trim().length > 2 &&
      expiryDate.length === 5 &&
      cvv.length >= 3
    );
  };

  // Handle payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Simulate payment processing (2 second delay)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In demo/test mode, always succeed
    if (paymentConfig?.testMode) {
      const cleanCardNumber = cardNumber.replace(/\s/g, '');
      const paymentInfo: PaymentInfo = {
        status: 'paid',
        amount: advanceAmount,
        currency: property.currency,
        method: 'card',
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        paidAt: new Date().toISOString(),
        cardLast4: cleanCardNumber.slice(-4),
        cardBrand: getCardBrand(cardNumber),
      };
      
      setPaymentSuccess(true);
      
      // Delay before completing to show success state
      setTimeout(() => {
        onPaymentComplete(paymentInfo);
      }, 1500);
    } else {
      // For real payment integration, you would call your payment API here
      // For now, simulate a random failure 10% of the time in non-test mode
      if (Math.random() < 0.1) {
        setError(t.payment.paymentError);
        setIsProcessing(false);
      } else {
        const cleanCardNumber = cardNumber.replace(/\s/g, '');
        const paymentInfo: PaymentInfo = {
          status: 'paid',
          amount: advanceAmount,
          currency: property.currency,
          method: 'card',
          transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          paidAt: new Date().toISOString(),
          cardLast4: cleanCardNumber.slice(-4),
          cardBrand: getCardBrand(cardNumber),
        };
        
        setPaymentSuccess(true);
        setTimeout(() => {
          onPaymentComplete(paymentInfo);
        }, 1500);
      }
    }
  };

  // Handle skip payment
  const handleSkip = () => {
    onSkip?.();
  };

  if (paymentSuccess) {
    return (
      <Card className="max-w-md mx-auto border-green-200 bg-green-50/50">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            {t.payment.paymentSuccess}
          </h3>
          <p className="text-green-700">
            {t.payment.paymentSuccessMessage}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.common.back}
      </Button>

      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-full bg-primary/10">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle>{t.payment.title}</CardTitle>
          <CardDescription>
            {t.payment.advancePaymentDescription.replace('{percent}', advancePercent.toString())}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Payment summary */}
          <div className="p-4 bg-neutral-50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t.payment.totalDue}</span>
              <span className="font-semibold">{property.currency}{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>{t.payment.advancePayment} ({advancePercent}%)</span>
              <span className="font-bold">{property.currency}{advanceAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500 pt-2 border-t">
              <span>{t.payment.remainingOnArrival}</span>
              <span>{property.currency}{remainingAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Test mode notice */}
          {paymentConfig?.testMode && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>{t.payment.testModeNotice}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber">{t.payment.cardNumber}</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="pl-10"
                  maxLength={19}
                  disabled={isProcessing}
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {/* Card Holder */}
            <div className="space-y-2">
              <Label htmlFor="cardHolder">{t.payment.cardHolder}</Label>
              <Input
                id="cardHolder"
                type="text"
                placeholder="JOHN DOE"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                disabled={isProcessing}
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">{t.payment.expiryDate}</Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">{t.payment.cvv}</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  disabled={isProcessing}
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid() || isProcessing}
              size="lg"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  {t.payment.processing}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  {t.payment.payNow.replace('{amount}', `${property.currency}${advanceAmount.toFixed(2)}`)}
                </>
              )}
            </Button>

            {/* Secure payment badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <Lock className="w-3 h-3" />
              <span>{t.payment.securePayment}</span>
            </div>
          </form>

          {/* Skip payment option */}
          {onSkip && (
            <div className="pt-4 border-t text-center">
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-neutral-500 hover:text-neutral-700 underline"
                disabled={isProcessing}
              >
                {t.payment.skipPayment}
              </button>
              <p className="text-xs text-neutral-400 mt-1">
                {t.payment.skipPaymentNote}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
