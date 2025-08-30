
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

const paymentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry must be in MM/YY format." }),
  cvc: z.string().regex(/^\d{3}$/, { message: "CVC must be 3 digits." }),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const eventId = searchParams.get('eventId');
  const ticketsParam = searchParams.get('tickets');

  if (!eventId || !ticketsParam) {
    return notFound();
  }
  const event = getEventById(eventId);
  if (!event) {
    return notFound();
  }

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    // Mock payment processing
    toast({
      title: "Processing Payment...",
      description: "Please wait while we confirm your transaction.",
    });

    setTimeout(() => {
      router.push(`/checkout/confirmation?eventId=${eventId}`);
    }, 2000);
  };

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12 max-w-lg">
          <Link href={`/checkout?eventId=${eventId}&tickets=${ticketsParam}`}>
              <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4"/> Back to Order Summary
              </Button>
          </Link>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Enter your payment information below. All transactions are secure.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Processing..." : <> <Lock className="mr-2 h-4 w-4"/> Pay Now </>}
                 </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentForm />
        </Suspense>
    )
}
