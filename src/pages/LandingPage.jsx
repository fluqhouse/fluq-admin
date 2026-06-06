import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample data for successful raffles carousel
  const successfulRaffles = [
    {
      id: 1,
      title: "iPhone 15 Pro Max Raffle",
      winner: "Sarah M.",
      prize: "iPhone 15 Pro Max 256GB",
      image: "/api/placeholder/400/300",
      participants: 2847,
      date: "December 2024"
    },
    {
      id: 2,
      title: "Gaming Setup Giveaway",
      winner: "Mike D.",
      prize: "RTX 4080 Gaming PC + Setup",
      image: "/api/placeholder/400/300",
      participants: 1923,
      date: "November 2024"
    },
    {
      id: 3,
      title: "Dream Vacation Package",
      winner: "Emily R.",
      prize: "7-Day Maldives Vacation",
      image: "/api/placeholder/400/300",
      participants: 3241,
      date: "October 2024"
    }
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "John Anderson",
      prize: "MacBook Pro M3",
      testimonial: "I couldn't believe it when I got the call! FLUQ made my dream of owning a MacBook come true. The process was transparent and fair.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      prize: "Tesla Model 3",
      testimonial: "Winning the Tesla was life-changing! FLUQ's platform is trustworthy and the team handled everything professionally.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      id: 3,
      name: "David Chen",
      prize: "PlayStation 5 Bundle",
      testimonial: "Amazing experience! Quick delivery and excellent customer service. I'll definitely participate in more raffles.",
      avatar: "/api/placeholder/60/60",
      rating: 5
    }
  ];

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % successfulRaffles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [successfulRaffles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % successfulRaffles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + successfulRaffles.length) % successfulRaffles.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">FH</span>
              </div>
              <span className="text-white font-bold text-xl">FLUQ HOUSE</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
              <a href="#about" className="text-slate-300 hover:text-white transition-colors">About Us</a>
              <a href="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
              <a href="/" className="text-slate-300 hover:text-white transition-colors">Admin Portal</a>
              <a href="#help" className="text-slate-300 hover:text-white transition-colors">Help</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-400"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700/50">
              <div className="flex flex-col space-y-4">
                <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
                <a href="#about" className="text-slate-300 hover:text-white transition-colors">About Us</a>
                <a href="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</a>
                <a href="/" className="text-slate-300 hover:text-white transition-colors">Admin Portal</a>
                <a href="#help" className="text-slate-300 hover:text-white transition-colors">Help</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Win Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> Dream Prize</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join thousands of winners in our transparent, fair, and exciting digital raffles. 
              Your next big win could be just one ticket away!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Browse Current Raffles
            </button>
            <button className="px-8 py-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-200">
              How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-slate-400">Happy Winners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$2M+</div>
              <div className="text-slate-400">Prizes Given</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-slate-400">Trust Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-slate-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Successful Raffles Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recent Winners</h2>
            <p className="text-xl text-slate-300">Celebrating our latest successful raffles and happy winners</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {successfulRaffles.map((raffle) => (
                  <div key={raffle.id} className="w-full flex-shrink-0">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mx-4">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <img 
                            src={raffle.image} 
                            alt={raffle.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-4">{raffle.title}</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-slate-400">Winner:</span>
                              <span className="text-white font-semibold">{raffle.winner}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-slate-400">Prize:</span>
                              <span className="text-white">{raffle.prize}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-slate-400">Participants:</span>
                              <span className="text-blue-400 font-semibold">{raffle.participants.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-slate-400">Date:</span>
                              <span className="text-white">{raffle.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {successfulRaffles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">About FLUQ</h2>
              <p className="text-lg text-slate-300 mb-6">
                FLUQ House is a revolutionary digital raffle platform that brings transparency, 
                fairness, and excitement to online prize draws. Founded on the principles of 
                trust and innovation, we've created a secure environment where dreams come true.
              </p>
              <p className="text-lg text-slate-300 mb-8">
                Our cutting-edge technology ensures every raffle is conducted with complete 
                transparency, giving every participant an equal chance to win amazing prizes. 
                From luxury gadgets to dream vacations, we make winning accessible to everyone.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-2">2019</div>
                  <div className="text-slate-400">Founded</div>
                </div>
                <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-2">500+</div>
                  <div className="text-slate-400">Raffles Completed</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-500/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Verified</h4>
                    <p className="text-slate-400 text-sm">100% Legitimate</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Secure</h4>
                    <p className="text-slate-400 text-sm">Bank-Level Security</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Fast</h4>
                    <p className="text-slate-400 text-sm">Instant Results</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Trusted</h4>
                    <p className="text-slate-400 text-sm">50K+ Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Winners Say</h2>
            <p className="text-xl text-slate-300">Real stories from real winners who trusted FLUQ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">Won: {testimonial.prize}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-slate-300 italic">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>

          {/* Trust Statistics */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20 p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Trusted by Thousands</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">50,247</div>
                <div className="text-slate-400">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">4.9/5</div>
                <div className="text-slate-400">User Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">15,432</div>
                <div className="text-slate-400">Winners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">99.8%</div>
                <div className="text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-700/50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FH</span>
                </div>
                <span className="text-white font-bold text-xl">FLUQ HOUSE</span>
              </div>
              <p className="text-slate-400 mb-4">
                Making dreams come true through fair and transparent digital raffles.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Current Raffles</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">How It Works</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Winners Gallery</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-slate-400">
                <p>support@fluqhouse.com</p>
                <p>+1 (555) 123-4567</p>
                <p>24/7 Customer Support</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 FLUQ House. All rights reserved. Licensed and regulated digital raffle platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;