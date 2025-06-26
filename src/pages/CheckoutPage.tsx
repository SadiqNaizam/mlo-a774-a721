import React from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Icons
import { CreditCard, Wallet, Landmark } from 'lucide-react';

// Placeholder data for the order summary
const orderItems = [
  { id: 1, name: 'Spicy Tuna Roll', quantity: 2, price: 14.00 },
  { id: 2, name: 'Miso Soup', quantity: 1, price: 3.50 },
  { id: 3, name: 'Edamame', quantity: 1, price: 5.00 },
];

const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
const deliveryFee = 4.99;
const total = subtotal + deliveryFee;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // In a real app, this would trigger API calls, payment processing, etc.
    // For now, we just navigate to the tracking page.
    console.log('Placing order...');
    navigate('/order-tracking'); // Navigate to the path from App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Delivery and Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address Card */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
                <CardDescription>Confirm your address for delivery.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="123-456-7890" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Delish St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Foodville" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" defaultValue="90210" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select a payment option.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="card" className="space-y-4">
                  <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-6 w-6" />
                    <span className="font-medium">Credit / Debit Card</span>
                  </Label>
                  <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Wallet className="h-6 w-6" />
                    <span className="font-medium">PayPal</span>
                  </Label>
                  <Label className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="cod" id="cod" />
                    <Landmark className="h-6 w-6" />
                    <span className="font-medium">Cash on Delivery</span>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                </div>
                <Separator />
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Have a discount code?</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-2">
                        <Input placeholder="Enter code" />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;