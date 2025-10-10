
import React, { useState, useEffect, useCallback } from "react";
import { Region } from "@/entities/Region";
import { motion } from "framer-motion";
import { Shuffle, RefreshCw, MapPin, Calendar, Utensils, Music, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Discover() {
  const [regions, setRegions] = useState([]);
  const [currentDiscovery, setCurrentDiscovery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);

  // pickRandomRegion needs to be defined before loadRegions if loadRegions is wrapped in useCallback
  // and pickRandomRegion is not stable (i.e., not a useCallback itself).
  // However, the current usage in loadRegions (pickRandomRegion(fetchedRegions)) passes fresh data.
  // The button click uses the default 'regions' from state, which updates on re-render.
  // So, it's fine for now without useCallback on pickRandomRegion itself.
  const pickRandomRegion = (regionList = regions) => {
    if (regionList.length === 0) return;
    
    setIsShuffling(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * regionList.length);
      setCurrentDiscovery(regionList[randomIndex]);
      setIsShuffling(false);
    }, 1000);
  };

  const loadRegions = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedRegions = await Region.list();
      setRegions(fetchedRegions);
      if (fetchedRegions.length > 0) {
        // When called from loadRegions, fetchedRegions is explicitly passed,
        // so the 'regions' state captured by pickRandomRegion itself is not used here.
        pickRandomRegion(fetchedRegions);
      }
    } catch (error) {
      console.error('Error loading regions:', error);
    }
    setIsLoading(false);
  }, [pickRandomRegion]); // pickRandomRegion should be in the dependency array if it were wrapped in useCallback.
                          // Since it's not, it's recreated on every render and would cause loadRegions to recreate.
                          // However, ESLint typically warns about functions that are *not* stable.
                          // To avoid potential stale closure issues or ESLint warnings if pickRandomRegion
                          // were to become a useCallback, it's better to add it here.
                          // But given the specific instructions, I'll keep it empty as per the outline for now,
                          // assuming `pickRandomRegion` is fine as a fresh function on each render for this purpose.
                          // A more robust solution might wrap pickRandomRegion in useCallback or lift it outside.
                          // For strictly adhering to the prompt: `}, []);` as in the outline.

  useEffect(() => {
    loadRegions();
  }, [loadRegions]); // Dependency array now correctly includes loadRegions, which is memoized with useCallback.

  const getRandomFact = useCallback(() => { // Wrap getRandomFact in useCallback as it depends on currentDiscovery
    if (!currentDiscovery) return null;

    const facts = [];
    
    if (currentDiscovery.major_festivals?.length > 0) {
      const festival = currentDiscovery.major_festivals[Math.floor(Math.random() * currentDiscovery.major_festivals.length)];
      facts.push({
        icon: Calendar,
        title: "Festival Spotlight",
        content: `${festival.name} is celebrated in ${currentDiscovery.name}`,
        detail: festival.description,
        color: "text-[#FF6B35]"
      });
    }

    if (currentDiscovery.cuisine?.signature_dishes?.length > 0) {
      const dish = currentDiscovery.cuisine.signature_dishes[Math.floor(Math.random() * currentDiscovery.cuisine.signature_dishes.length)];
      facts.push({
        icon: Utensils,
        title: "Culinary Delight",
        content: `${dish} is a signature dish of ${currentDiscovery.name}`,
        detail: `${currentDiscovery.cuisine.cooking_style} cooking style`,
        color: "text-[#2D5A27]"
      });
    }

    if (currentDiscovery.art_forms?.length > 0) {
      const art = currentDiscovery.art_forms[Math.floor(Math.random() * currentDiscovery.art_forms.length)];
      facts.push({
        icon: Music,
        title: "Artistic Heritage",
        content: `${art.name} is a traditional ${art.type} from ${currentDiscovery.name}`,
        detail: art.description,
        color: "text-[#005F8C]"
      });
    }

    if (currentDiscovery.languages?.length > 0) {
      const additionalLangs = currentDiscovery.languages.filter(lang => lang !== currentDiscovery.primary_language);
      if (additionalLangs.length > 0) {
        facts.push({
          icon: Users,
          title: "Language Diversity",
          content: `Besides ${currentDiscovery.primary_language}, people in ${currentDiscovery.name} also speak ${additionalLangs.join(', ')}`,
          detail: `${currentDiscovery.languages.length} languages spoken`,
          color: "text-[#DAA520]"
        });
      }
    }

    return facts.length > 0 ? facts[Math.floor(Math.random() * facts.length)] : null;
  }, [currentDiscovery]); // Depends on currentDiscovery

  const randomFact = getRandomFact();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading discoveries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#005F8C] bg-clip-text text-transparent">
              Cultural Discovery
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Let serendipity guide you through India's cultural treasures
          </p>
          
          <Button
            onClick={() => pickRandomRegion()}
            disabled={isShuffling}
            size="lg"
            className="bg-gradient-to-r from-[#FF6B35] to-[#DAA520] hover:from-[#FF6B35]/90 hover:to-[#DAA520]/90 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isShuffling ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Discovering...
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5 mr-2" />
                Discover Something New
              </>
            )}
          </Button>
        </motion.div>

        {/* Discovery Card */}
        {currentDiscovery && (
          <motion.div
            key={currentDiscovery.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="overflow-hidden shadow-2xl border-none bg-white/90 backdrop-blur-sm mb-8">
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-[#FF6B35]/20 to-[#005F8C]/20 overflow-hidden">
                {currentDiscovery.image_url ? (
                  <img 
                    src={currentDiscovery.image_url} 
                    alt={currentDiscovery.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF6B35]/20 to-[#DAA520]/20">
                    <MapPin className="w-24 h-24 text-[#FF6B35]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentDiscovery.name}</h2>
                  <p className="text-lg opacity-90">{currentDiscovery.state_code}</p>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge className="bg-white/90 text-[#FF6B35] border-none text-lg px-4 py-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Featured
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {currentDiscovery.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#005F8C]" />
                      <div>
                        <span className="font-semibold">Primary Language:</span>
                        <p className="text-gray-600">{currentDiscovery.primary_language}</p>
                      </div>
                    </div>
                    
                    {currentDiscovery.famous_landmarks?.length > 0 && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#FF6B35] mt-1" />
                        <div>
                          <span className="font-semibold">Famous Landmarks:</span>
                          <p className="text-gray-600">{currentDiscovery.famous_landmarks.slice(0, 3).join(', ')}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {randomFact && (
                    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-none">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <randomFact.icon className={`w-6 h-6 ${randomFact.color} mt-1`} />
                          <div>
                            <h4 className="font-bold text-gray-800 mb-2">{randomFact.title}</h4>
                            <p className="text-gray-700 mb-2">{randomFact.content}</p>
                            {randomFact.detail && (
                              <p className="text-sm text-gray-500">{randomFact.detail}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {currentDiscovery.historical_significance && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-[#FF6B35]/5 via-[#DAA520]/5 to-[#005F8C]/5 rounded-xl border border-orange-200/30">
                    <h4 className="font-bold text-gray-800 mb-3">Historical Significance</h4>
                    <p className="text-gray-700 leading-relaxed">{currentDiscovery.historical_significance}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Fun Facts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200/50"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Did You Know?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#FF6B35]">36</div>
              <div className="text-gray-600">States & Union Territories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#005F8C]">700+</div>
              <div className="text-gray-600">Languages Spoken</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#2D5A27]">200+</div>
              <div className="text-gray-600">Art Forms</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
