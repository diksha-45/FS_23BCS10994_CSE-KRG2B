import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InteractiveMap({ regions, onRegionSelect, isLoading }) {
  if (isLoading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <Skeleton className="w-64 h-64 rounded-lg mx-auto mb-4" />
          <p className="text-gray-500">Loading India map...</p>
        </div>
      </Card>
    );
  }

  // Simplified map representation using a grid
  const mapRegions = [
    { name: "Jammu & Kashmir", position: { top: "10%", left: "30%" } },
    { name: "Punjab", position: { top: "20%", left: "25%" } },
    { name: "Rajasthan", position: { top: "30%", left: "20%" } },
    { name: "Gujarat", position: { top: "40%", left: "15%" } },
    { name: "Maharashtra", position: { top: "50%", left: "25%" } },
    { name: "Karnataka", position: { top: "65%", left: "30%" } },
    { name: "Kerala", position: { top: "75%", left: "25%" } },
    { name: "Tamil Nadu", position: { top: "75%", left: "35%" } },
    { name: "Uttar Pradesh", position: { top: "35%", left: "40%" } },
    { name: "Madhya Pradesh", position: { top: "45%", left: "35%" } },
    { name: "Bihar", position: { top: "35%", left: "50%" } },
    { name: "West Bengal", position: { top: "45%", left: "55%" } },
    { name: "Odisha", position: { top: "55%", left: "50%" } },
    { name: "Andhra Pradesh", position: { top: "65%", left: "45%" } },
    { name: "Assam", position: { top: "25%", left: "65%" } },
    { name: "Nagaland", position: { top: "20%", left: "70%" } }
  ];

  const getRegionData = (mapRegionName) => {
    return regions.find(r => r.name.toLowerCase().includes(mapRegionName.toLowerCase())) ||
           regions.find(r => mapRegionName.toLowerCase().includes(r.name.toLowerCase()));
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 via-white to-green-50 border-2 border-orange-200/50 shadow-xl">
      <div className="relative w-full h-96 md:h-[500px] p-8">
        {/* India outline background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-[#005F8C]/5 rounded-lg" />
        
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#005F8C] bg-clip-text text-transparent">
            States & Territories of India
          </h3>
          <p className="text-sm text-gray-600 mt-2">Click on any region to explore</p>
        </div>

        {/* Map points */}
        <div className="relative w-full h-full">
          {mapRegions.map((mapRegion, index) => {
            const regionData = getRegionData(mapRegion.name);
            return (
              <motion.div
                key={mapRegion.name}
                className="absolute cursor-pointer group"
                style={mapRegion.position}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => regionData && onRegionSelect(regionData)}
              >
                <div className="relative">
                  <div 
                    className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
                      regionData 
                        ? 'bg-gradient-to-r from-[#FF6B35] to-[#DAA520] hover:shadow-xl' 
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                    style={{ 
                      backgroundColor: regionData?.color_theme || '#FF6B35' 
                    }}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border border-orange-200/50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-[#FF6B35]" />
                      <span className="text-sm font-medium text-gray-800">
                        {mapRegion.name}
                      </span>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-orange-200/50">
          <div className="text-xs font-medium text-gray-600 mb-2">Legend</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#DAA520]" />
            <span className="text-xs text-gray-600">Available Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-xs text-gray-600">Coming Soon</span>
          </div>
        </div>
      </div>
    </Card>
  );
}