import React, { useState, useEffect } from "react";
import { Region } from "@/entities/Region";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { MapPin, Calendar, Utensils, Music, Eye, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import InteractiveMap from "../components/home/InteractiveMap";
import FeaturedRegions from "../components/home/FeaturedRegions";
import CulturalHighlights from "../components/home/CulturalHighlights";

export default function Home() {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    setIsLoading(true);
    try {
      const fetchedRegions = await Region.list('-created_date');
      setRegions(fetchedRegions);
    } catch (error) {
      console.error('Error loading regions:', error);
    }
    setIsLoading(false);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/10 via-[#DAA520]/5 to-[#005F8C]/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#DAA520] to-[#005F8C] bg-clip-text text-transparent">
                Culture Map
              </span>
              <br />
              <span className="text-gray-800">of India</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the magnificent tapestry of traditions, festivals, cuisines, and art forms 
              that make India truly incredible
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Regions")}>
                <Button size="lg" className="bg-gradient-to-r from-[#FF6B35] to-[#DAA520] hover:from-[#FF6B35]/90 hover:to-[#DAA520]/90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <MapPin className="w-5 h-5 mr-2" />
                  Explore Regions
                </Button>
              </Link>
              <Link to={createPageUrl("Categories")}>
                <Button variant="outline" size="lg" className="border-2 border-[#005F8C] text-[#005F8C] hover:bg-[#005F8C] hover:text-white px-8 py-3 rounded-xl transition-all duration-300">
                  <Eye className="w-5 h-5 mr-2" />
                  Discover Culture
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Interactive Culture Map
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any region to explore its unique cultural heritage
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <InteractiveMap 
                regions={regions}
                onRegionSelect={handleRegionSelect}
                isLoading={isLoading}
              />
            </div>
            <div className="space-y-6">
              {selectedRegion ? (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-xl border-none bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: selectedRegion.color_theme || '#FF6B35' }}
                        />
                        <h3 className="text-2xl font-bold text-gray-800">{selectedRegion.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{selectedRegion.description}</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#FF6B35]" />
                          <span className="font-medium">Primary Language:</span>
                          <span>{selectedRegion.primary_language}</span>
                        </div>
                        
                        {selectedRegion.major_festivals?.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 text-sm mb-2">
                              <Music className="w-4 h-4 text-[#005F8C]" />
                              <span className="font-medium">Major Festival:</span>
                            </div>
                            <span className="text-sm bg-gradient-to-r from-[#005F8C]/10 to-[#2D5A27]/10 px-3 py-1 rounded-full">
                              {selectedRegion.major_festivals[0].name}
                            </span>
                          </div>
                        )}
                        
                        {selectedRegion.cuisine?.signature_dishes?.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 text-sm mb-2">
                              <Utensils className="w-4 h-4 text-[#2D5A27]" />
                              <span className="font-medium">Signature Dish:</span>
                            </div>
                            <span className="text-sm bg-gradient-to-r from-[#2D5A27]/10 to-[#DAA520]/10 px-3 py-1 rounded-full">
                              {selectedRegion.cuisine.signature_dishes[0]}
                            </span>
                          </div>
                        )}
                      </div>

                      <Link to={createPageUrl(`Region?id=${selectedRegion.id}`)}>
                        <Button className="w-full mt-6 bg-gradient-to-r from-[#FF6B35] to-[#DAA520] hover:from-[#FF6B35]/90 hover:to-[#DAA520]/90 text-white rounded-xl shadow-lg">
                          Learn More <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card className="shadow-lg border-none bg-gradient-to-br from-[#FF6B35]/10 to-[#DAA520]/10">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Region</h3>
                    <p className="text-gray-600 text-sm">
                      Click on any region on the map to explore its cultural heritage
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Regions */}
      <section className="py-16 bg-gradient-to-r from-white to-amber-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <FeaturedRegions regions={regions} isLoading={isLoading} />
        </div>
      </section>

      {/* Cultural Highlights */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <CulturalHighlights regions={regions} />
        </div>
      </section>
    </div>
  );
}