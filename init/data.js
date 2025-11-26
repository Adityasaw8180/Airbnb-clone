const sampleListings = [
  // Mountains
  {
    title: "Mountain Retreat in Aspen",
    description: "Peaceful mountain cabin surrounded by nature. Perfect for hiking and relaxation.",
    image: { filename: "mountain1", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "Aspen",
    country: "United States",
    category: "mountains",
    owner: null
  },
  {
    title: "Ski Chalet in Verbier",
    description: "Ski-in/ski-out chalet in Swiss Alps. Luxury with breathtaking views.",
    image: { filename: "mountain2", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "mountains",
    owner: null
  },
  {
    title: "Banff Mountain Cabin",
    description: "Cozy cabin with stunning mountain views in the Canadian Rockies.",
    image: { filename: "mountain3", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "mountains",
    owner: null
  },
  {
    title: "Swiss Alps Luxury Lodge",
    description: "Luxury lodge in the heart of Swiss Alps with spa and ski facilities.",
    image: { filename: "mountain4", url: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=60" },
    price: 4500,
    location: "Zermatt",
    country: "Switzerland",
    category: "mountains",
    owner: null
  },
  {
    title: "Rocky Mountain Getaway",
    description: "Rustic cabin for adventurous mountain enthusiasts.",
    image: { filename: "mountain5", url: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=60" },
    price: 1100,
    location: "Colorado",
    country: "United States",
    category: "mountains",
    owner: null
  },

  // Beach
  {
    title: "Cozy Beachfront Cottage",
    description: "Charming beachfront cottage with stunning ocean views.",
    image: { filename: "beach1", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "beach",
    owner: null
  },
  {
    title: "Beachfront Paradise Condo",
    description: "Condo steps from the sandy beach with all amenities.",
    image: { filename: "beach2", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "beach",
    owner: null
  },
  {
    title: "Secluded Beach House",
    description: "Private beach house for a tranquil getaway.",
    image: { filename: "beach3", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "beach",
    owner: null
  },
  {
    title: "Bali Beachfront Bungalow",
    description: "Relax on sandy shores in a beautiful bungalow with pool.",
    image: { filename: "beach4", url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "beach",
    owner: null
  },
  {
    title: "Maldives Overwater Villa",
    description: "Luxury overwater villa with stunning views of Indian Ocean.",
    image: { filename: "beach5", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60" },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    category: "beach",
    owner: null
  },

  // City
  {
    title: "Modern Loft Downtown NYC",
    description: "Stay in the heart of the city in this stylish loft apartment.",
    image: { filename: "city1", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "city",
    owner: null
  },
  {
    title: "Luxury Penthouse LA",
    description: "Penthouse apartment with panoramic city views.",
    image: { filename: "city2", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "city",
    owner: null
  },
  {
    title: "Art Deco Apartment Miami",
    description: "Stylish Art Deco apartment in South Beach.",
    image: { filename: "city3", url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?auto=format&fit=crop&w=800&q=60" },
    price: 1600,
    location: "Miami",
    country: "United States",
    category: "city",
    owner: null
  },
  {
    title: "Modern Apartment Tokyo",
    description: "Centrally located modern apartment in Tokyo city center.",
    image: { filename: "city4", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=60" },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: "city",
    owner: null
  },
  {
    title: "Historic Brownstone Boston",
    description: "Elegant historic brownstone in Boston city center.",
    image: { filename: "city5", url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60" },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "city",
    owner: null
  },

  // Village
  {
    title: "Charming Cottage Cotswolds",
    description: "Quaint cottage with thatched roof in scenic Cotswolds.",
    image: { filename: "village1", url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60" },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "village",
    owner: null
  },
  {
    title: "Safari Lodge Serengeti",
    description: "Comfortable lodge to witness wildlife up close.",
    image: { filename: "village2", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60" },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "village",
    owner: null
  },
  {
    title: "Historic Canal House Amsterdam",
    description: "Stay in a piece of history in Amsterdam.",
    image: { filename: "village3", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "village",
    owner: null
  },
  {
    title: "Historic Castle Scotland",
    description: "Live like royalty in this historic Scottish castle.",
    image: { filename: "village4", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60" },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "village",
    owner: null
  },
  {
    title: "Beachfront Villa Greece",
    description: "Enjoy Mediterranean waters in a beautiful villa.",
    image: { filename: "village5", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    category: "village",
    owner: null
  },

  // Camp
  {
    title: "Secluded Treehouse Getaway",
    description: "Unique treehouse retreat among treetops for nature lovers.",
    image: { filename: "camp1", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60" },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "camp",
    owner: null
  },
  {
    title: "Eco-Friendly Treehouse Costa Rica",
    description: "Stay in eco-friendly treehouse nestled in forest.",
    image: { filename: "camp2", url: "https://images.unsplash.com/photo-1587913696806-280ef35f1e19?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0" },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "camp",
    owner: null
  },
  {
    title: "Luxury Campsite Yosemite",
    description: "Glamorous camping with nature comforts.",
    image: { filename: "camp3", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60" },
    price: 900,
    location: "Yosemite",
    country: "United States",
    category: "camp",
    owner: null
  },
  {
    title: "Mountain Camp Retreat",
    description: "Camp surrounded by scenic mountains and fresh air.",
    image: { filename: "camp4", url: "https://images.unsplash.com/photo-1535083789261-2e93de18d162?auto=format&fit=crop&w=800&q=60" },
    price: 700,
    location: "Rocky Mountains",
    country: "United States",
    category: "camp",
    owner: null
  },
  {
    title: "Jungle Camp Adventure",
    description: "Thrilling jungle camp with expert guides.",
    image: { filename: "camp5", url: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=60" },
    price: 650,
    location: "Amazon Rainforest",
    country: "Brazil",
    category: "camp",
    owner: null
  },

  // Trending
  {
    title: "Luxury Villa Phuket",
    description: "Tropical villa with infinity pool trending among tourists.",
    image: { filename: "trending1", url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?auto=format&fit=crop&w=800&q=60" },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "trending",
    owner: null
  },
  {
    title: "Desert Oasis Dubai",
    description: "Luxury desert oasis villa with private pool.",
    image: { filename: "trending2", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60" },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "trending",
    owner: null
  },
  {
    title: "Tropical Island Retreat",
    description: "Private island villa popular on social media.",
    image: { filename: "trending3", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60" },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "trending",
    owner: null
  },
  {
    title: "Luxury Chalet Alps",
    description: "Modern chalet trending for winter vacations.",
    image: { filename: "trending4", url: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=60" },
    price: 4000,
    location: "Chamonix",
    country: "France",
    category: "trending",
    owner: null
  },
  {
    title: "Beachfront Mansion Malibu",
    description: "Ultra-luxury mansion trending among celebrities.",
    image: { filename: "trending5", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60" },
    price: 12000,
    location: "Malibu",
    country: "United States",
    category: "trending",
    owner: null
  },

  // Rooms
  {
    title: "Single Room in Downtown",
    description: "Affordable and cozy room for solo travelers.",
    image: { filename: "rooms1", url: "https://images.unsplash.com/photo-1560448071-5a04a9b38f29?auto=format&fit=crop&w=800&q=60" },
    price: 350,
    location: "New York City",
    country: "United States",
    category: "rooms",
    owner: null
  },
  {
    title: "Double Room Hotel Paris",
    description: "Comfortable double room with city view.",
    image: { filename: "rooms2", url: "https://images.unsplash.com/photo-1560448071-5a04a9b38f29?auto=format&fit=crop&w=800&q=60" },
    price: 450,
    location: "Paris",
    country: "France",
    category: "rooms",
    owner: null
  },
  {
    title: "Budget Room Tokyo",
    description: "Compact room in central Tokyo.",
    image: { filename: "rooms3", url: "https://images.unsplash.com/photo-1560448071-5a04a9b38f29?auto=format&fit=crop&w=800&q=60" },
    price: 400,
    location: "Tokyo",
    country: "Japan",
    category: "rooms",
    owner: null
  },
  {
    title: "Hotel Room Los Angeles",
    description: "Modern hotel room for short stays.",
    image: { filename: "rooms4", url: "https://images.unsplash.com/photo-1560448071-5a04a9b38f29?auto=format&fit=crop&w=800&q=60" },
    price: 500,
    location: "Los Angeles",
    country: "United States",
    category: "rooms",
    owner: null
  },
  {
    title: "Studio Apartment London",
    description: "Cozy studio for solo travelers or couples.",
    image: { filename: "rooms5", url: "https://images.unsplash.com/photo-1560448071-5a04a9b38f29?auto=format&fit=crop&w=800&q=60" },
    price: 550,
    location: "London",
    country: "United Kingdom",
    category: "rooms",
    owner: null
  },

  // Premium
  {
    title: "Historic Villa Tuscany",
    description: "Beautifully restored villa in rolling hills of Tuscany.",
    image: { filename: "premium1", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "premium",
    owner: null
  },
  {
    title: "Private Island Fiji",
    description: "Entire private island for exclusive vacation.",
    image: { filename: "premium2", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60" },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "premium",
    owner: null
  },
  {
    title: "Luxury Yacht Mediterranean",
    description: "Charter a luxury yacht for a unique experience.",
    image: { filename: "premium3", url: "https://images.unsplash.com/photo-1567016432779-2991d4e3e912?auto=format&fit=crop&w=800&q=60" },
    price: 8000,
    location: "Mediterranean",
    country: "Greece",
    category: "premium",
    owner: null
  },
  {
    title: "Castle Stay Scotland",
    description: "Live like royalty in Scottish Highlands castle.",
    image: { filename: "premium4", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=60" },
    price: 4500,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "premium",
    owner: null
  },
  {
    title: "Luxury Penthouse NYC",
    description: "Stunning penthouse apartment in New York City.",
    image: { filename: "premium5", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60" },
    price: 3500,
    location: "New York City",
    country: "United States",
    category: "premium",
    owner: null
  }
];

module.exports = { data: sampleListings };
