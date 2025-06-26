import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Icons
import { Search, Pizza, Utensils, Sandwich, Soup, IceCream, Beer } from 'lucide-react';

// Placeholder Data
const cuisineCategories = [
  { name: 'Pizza', icon: <Pizza className="w-8 h-8 mx-auto" />, link: '/restaurant-listing?cuisine=pizza' },
  { name: 'Sushi', icon: <Utensils className="w-8 h-8 mx-auto" />, link: '/restaurant-listing?cuisine=sushi' },
  { name: 'Burgers', icon: <Sandwich className="w-8 h-8 mx-auto" />, link: '/restaurant-listing?cuisine=burgers' },
  { name: 'Italian', icon: <Soup className="w-8 h-8 mx-auto" />, link: '/restaurant-listing?cuisine=italian' },
  { name: 'Desserts', icon: <IceCream className="w-8 h-8 mx-auto" />, link: '/restaurant-listing?cuisine=desserts' },
  { name: 'Pub Food', icon: <Beer className="w-8 h-8 mx-auto" />, link: '/restaurant-listing?cuisine=pub' },
];

const featuredRestaurants = [
  { id: 1, slug: "the-gourmet-kitchen", name: "The Gourmet Kitchen", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80", cuisine: "Italian", rating: 4.8, deliveryTime: 30 },
  { id: 2, slug: "sushi-zen", name: "Sushi Zen", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80", cuisine: "Japanese", rating: 4.9, deliveryTime: 25 },
  { id: 3, slug: "burger-bliss", name: "Burger Bliss", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80", cuisine: "American", rating: 4.6, deliveryTime: 20 },
  { id: 4, slug: "taco-fiesta", name: "Taco Fiesta", imageUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&q=80", cuisine: "Mexican", rating: 4.7, deliveryTime: 25 },
  { id: 5, slug: "veggie-delight", name: "Veggie Delight", imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&q=80", cuisine: "Vegan", rating: 4.5, deliveryTime: 35 },
];

const popularRestaurants = [
  { id: 6, slug: "pizza-palace", name: "Pizza Palace", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80", cuisine: "Pizza", rating: 4.7, deliveryTime: 25 },
  { id: 7, slug: "the-noodle-house", name: "The Noodle House", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80", cuisine: "Asian", rating: 4.8, deliveryTime: 30 },
  { id: 8, slug: "bbq-central", name: "BBQ Central", imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&q=80", cuisine: "BBQ", rating: 4.6, deliveryTime: 40 },
];


const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your next meal is just a click away.</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Discover and order from the best local restaurants.</p>
            <form className="max-w-xl mx-auto flex gap-2">
              <Input
                type="search"
                placeholder="Find a restaurant or cuisine..."
                className="flex-grow text-black"
                aria-label="Search for restaurants"
              />
              <Button type="submit" size="lg">
                <Search className="h-5 w-5 mr-2" /> Search
              </Button>
            </form>
          </div>
        </section>

        {/* Cuisine Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Explore Cuisines</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {cuisineCategories.map((category) => (
                <Link to={category.link} key={category.name} className="group">
                  <Card className="text-center p-6 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 hover:shadow-lg">
                    <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
                      {category.icon}
                      <span className="font-semibold mt-2">{category.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants Carousel */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Featured Restaurants</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 pb-4">
                {featuredRestaurants.map((restaurant) => (
                  <div className="w-[300px]" key={restaurant.id}>
                    <RestaurantCard {...restaurant} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>

        {/* Popular Near You Carousel */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Popular Near You</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-4 pb-4">
                {popularRestaurants.map((restaurant) => (
                   <div className="w-[300px]" key={restaurant.id}>
                    <RestaurantCard {...restaurant} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;