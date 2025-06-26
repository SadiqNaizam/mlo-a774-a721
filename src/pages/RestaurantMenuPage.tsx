import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';

// Lucide Icons
import { Star, ShoppingCart, Trash2, MinusCircle, PlusCircle } from 'lucide-react';

// Types
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

// Placeholder Data
const menuCategories = [
  {
    name: 'Specialty Rolls',
    items: [
      { id: 'sr1', name: 'Dragon Roll', description: 'Eel, crab, and cucumber topped with avocado and eel sauce.', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=2070&auto=format&fit=crop' },
      { id: 'sr2', name: 'Rainbow Roll', description: 'Crab, avocado, and cucumber topped with a variety of fresh fish.', price: 16.99, imageUrl: 'https://images.unsplash.com/photo-1625631980779-cf4693b137c7?q=80&w=1974&auto=format&fit=crop' },
      { id: 'sr3', name: 'Volcano Roll', description: 'Spicy tuna roll topped with baked crab and spicy mayo.', price: 17.50, imageUrl: 'https://images.unsplash.com/photo-1611142037880-993c4a23a7b6?q=80&w=1965&auto=format&fit=crop' },
    ],
  },
  {
    name: 'Classic Rolls',
    items: [
      { id: 'cr1', name: 'California Roll', description: 'Crab meat, avocado, and cucumber.', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1556801713-33195a9f2a03?q=80&w=1939&auto=format&fit=crop' },
      { id: 'cr2', name: 'Spicy Tuna Roll', description: 'Tuna mixed with spicy mayo.', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1623395123992-140263c461e1?q=80&w=1964&auto=format&fit=crop' },
    ],
  },
];

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (itemToAdd: { id: string | number; name: string; price: number }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string | number, change: number) => {
    setCart((prevCart) => {
        const updatedCart = prevCart.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + change } : item
        );
        return updatedCart.filter(item => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Restaurant Banner */}
        <section className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative container mx-auto h-full flex flex-col justify-end p-4 md:p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Sushi Palace</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                <span className="font-semibold">4.8</span>
                <span className="text-sm text-gray-300">(500+ ratings)</span>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Sushi</Badge>
                <Badge variant="secondary">Japanese</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="container mx-auto py-8 px-4">
          {menuCategories.map((category) => (
            <div key={category.name} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 border-b pb-2">{category.name}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} {...item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Floating Cart Button & Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg z-50">
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center rounded-full bg-red-500 text-white">{cartItemCount}</Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>Review your items before checkout.</SheetDescription>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto -mx-6 px-6">
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center mt-8">Your cart is empty.</p>
            ) : (
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between items-center gap-4">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleUpdateQuantity(item.id, -1)}>
                           <MinusCircle className="h-4 w-4" />
                       </Button>
                       <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleUpdateQuantity(item.id, 1)}>
                           <PlusCircle className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <SheetFooter>
                <Card className="w-full">
                    <CardContent className="p-4">
                         <div className="flex justify-between items-center font-bold text-lg mb-4">
                            <span>Total:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <SheetClose asChild>
                            <Link to="/checkout" className="w-full">
                                <Button size="lg" className="w-full">Proceed to Checkout</Button>
                            </Link>
                        </SheetClose>
                    </CardContent>
                </Card>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;