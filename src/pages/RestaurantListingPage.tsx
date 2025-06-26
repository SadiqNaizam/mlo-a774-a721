import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';

// --- Placeholder Data ---
const allRestaurants = [
  { id: 1, slug: 'sushi-zen', name: 'Sushi Zen', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', cuisine: 'Japanese', rating: 4.8, deliveryTime: 25 },
  { id: 2, slug: 'pasta-palace', name: 'Pasta Palace', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', cuisine: 'Italian', rating: 4.6, deliveryTime: 30 },
  { id: 3, slug: 'taco-fiesta', name: 'Taco Fiesta', imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80', cuisine: 'Mexican', rating: 4.5, deliveryTime: 20 },
  { id: 4, slug: 'burger-bliss', name: 'Burger Bliss', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80', cuisine: 'American', rating: 4.2, deliveryTime: 35 },
  { id: 5, slug: 'veggie-vibes', name: 'Veggie Vibes', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', cuisine: 'Vegan', rating: 4.9, deliveryTime: 40 },
  { id: 6, slug: 'pizza-piazza', name: 'Pizza Piazza', imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80', cuisine: 'Italian', rating: 4.7, deliveryTime: 28 },
  { id: 7, slug: 'curry-corner', name: 'Curry Corner', imageUrl: 'https://images.unsplash.com/photo-1565557623262-b9a35fcde3a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', cuisine: 'Indian', rating: 4.6, deliveryTime: 45 },
  { id: 8, slug: 'sushi-saga', name: 'Sushi Saga', imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80', cuisine: 'Japanese', rating: 4.9, deliveryTime: 30 },
];

const cuisineTypes = ['Japanese', 'Italian', 'Mexican', 'American', 'Vegan', 'Indian'];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('rating-desc');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState([50]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);

  useEffect(() => {
    let restaurants = [...allRestaurants];

    // Filter by search term
    if (searchTerm) {
      restaurants = restaurants.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by cuisine
    if (selectedCuisines.length > 0) {
      restaurants = restaurants.filter(r => selectedCuisines.includes(r.cuisine));
    }

    // Filter by delivery time
    restaurants = restaurants.filter(r => r.deliveryTime <= maxDeliveryTime[0]);

    // Sort
    switch (sortOption) {
      case 'rating-desc':
        restaurants.sort((a, b) => b.rating - a.rating);
        break;
      case 'time-asc':
        restaurants.sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      case 'name-asc':
        restaurants.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredRestaurants(restaurants);
  }, [searchTerm, sortOption, selectedCuisines, maxDeliveryTime]);

  const handleCuisineChange = (cuisine: string, checked: boolean | 'indeterminate') => {
    setSelectedCuisines(prev =>
      checked ? [...prev, cuisine] : prev.filter(c => c !== cuisine)
    );
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSortOption('rating-desc');
    setSelectedCuisines([]);
    setMaxDeliveryTime([50]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Find Your Next Meal</h1>
            <p className="mt-4 text-lg text-muted-foreground">Explore top-rated restaurants in your area.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- Filter Sidebar --- */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                    <Filter className="mr-2 h-5 w-5"/>
                    Filter & Sort
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="search-name">Search by Name</Label>
                  <Input 
                    id="search-name" 
                    placeholder="e.g., Pizza Piazza" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sort-by">Sort By</Label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger id="sort-by">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating-desc">Highest Rating</SelectItem>
                      <SelectItem value="time-asc">Delivery Time</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cuisine</Label>
                  {cuisineTypes.map(cuisine => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cuisine-${cuisine}`}
                        checked={selectedCuisines.includes(cuisine)}
                        onCheckedChange={(checked) => handleCuisineChange(cuisine, checked)}
                      />
                      <Label htmlFor={`cuisine-${cuisine}`} className="font-normal">{cuisine}</Label>
                    </div>
                  ))}
                </div>
                <div>
                    <Label htmlFor="delivery-time">Max Delivery Time: {maxDeliveryTime[0]} min</Label>
                    <Slider 
                        id="delivery-time"
                        min={10} 
                        max={60} 
                        step={5}
                        value={maxDeliveryTime}
                        onValueChange={setMaxDeliveryTime}
                    />
                </div>
                <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
              </CardContent>
            </Card>
          </aside>

          {/* --- Restaurant Grid --- */}
          <section className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">
              Showing {filteredRestaurants.length} Restaurants
            </h2>
            {filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} {...restaurant} />
                    ))}
                </div>
            ) : (
                <Card className="flex flex-col items-center justify-center p-12 text-center">
                    <CardHeader>
                        <CardTitle>No Restaurants Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Try adjusting your filters to find more options.</p>
                    </CardContent>
                </Card>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;