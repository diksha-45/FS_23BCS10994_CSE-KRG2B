import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedRegions({ regions, isLoading }) {
  if (isLoading) {
    return (
      <div>
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const featuredRegions = regions.slice(0, 3);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Featured <span className="bg-gradient-to-r from-[#FF6B35] to-[#DAA520] bg-clip-text text-transparent">Cultural Regions</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore some of India's most culturally rich and diverse regions
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredRegions.map((region, index) => (
          <motion.div
            key={region.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Link to={createPageUrl(`Region?id=${region.id}`)}>
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-none bg-white/80 backdrop-blur-sm">
                <div className="relative h-48 bg-gradient-to-br from-[#FF6B35]/20 to-[#005F8C]/20 overflow-hidden">
                  {region.image_url ? (
                    <img 
                      src={region.image_url} 
                      alt={region.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF6B35]/20 to-[#DAA520]/20">
                      <MapPin className="w-16 h-16 text-[#FF6B35]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-[#FF6B35] border-none">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{region.name}</h3>
                    <p className="text-sm opacity-90">{region.state_code}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {region.description?.substring(0, 120)}...
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-[#005F8C]" />
                      <span className="font-medium">Language:</span>
                      <span className="text-gray-600">{region.primary_language}</span>
                    </div>
                    
                    {region.major_festivals?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        <Badge 
                          variant="outline" 
                          className="text-xs border-[#FF6B35]/30 text-[#FF6B35] bg-[#FF6B35]/5"
                        >
                          {region.major_festivals[0].name}
                        </Badge>
                        {region.major_festivals.length > 1 && (
                          <Badge 
                            variant="outline" 
                            className="text-xs border-gray-300 text-gray-500"
                          >
                            +{region.major_festivals.length - 1} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {regions.length > 3 && (
        <div className="text-center mt-12">
          <Link to={createPageUrl("Regions")}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#005F8C] to-[#2D5A27] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore All Regions
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
}