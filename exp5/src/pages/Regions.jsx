
import React, { useState, useEffect, useCallback } from "react";
import { Region } from "@/entities/Region";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Users, Calendar, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Regions() {
  const [regions, setRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterRegions = useCallback(() => {
    let filtered = regions;

    if (searchTerm) {
      filtered = filtered.filter(region =>
        region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        region.primary_language.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter(region => {
        switch (selectedFilter) {
          case "north":
            return ["Punjab", "Haryana", "Delhi", "Uttar Pradesh", "Rajasthan", "Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir"].some(state => 
              region.name.toLowerCase().includes(state.toLowerCase())
            );
          case "south":
            return ["Karnataka", "Kerala", "Tamil Nadu", "Andhra Pradesh", "Telangana"].some(state => 
              region.name.toLowerCase().includes(state.toLowerCase())
            );
          case "east":
            return ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Assam", "Meghalaya", "Manipur", "Mizoram", "Nagaland", "Tripura", "Arunachal Pradesh", "Sikkim"].some(state => 
              region.name.toLowerCase().includes(state.toLowerCase())
            );
          case "west":
            return ["Maharashtra", "Gujarat", "Rajasthan", "Goa", "Madhya Pradesh"].some(state => 
              region.name.toLowerCase().includes(state.toLowerCase())
            );
          default:
            return true;
        }
      });
    }

    setFilteredRegions(filtered);
  }, [regions, searchTerm, selectedFilter]);

  useEffect(() => {
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
    
    loadRegions();
  }, []);

  useEffect(() => {
    filterRegions();
  }, [filterRegions]);

  const filterOptions = [
    { value: "all", label: "All Regions" },
    { value: "north", label: "North India" },
    { value: "south", label: "South India" },
    { value: "east", label: "East India" },
    { value: "west", label: "West India" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#005F8C] bg-clip-text text-transparent">
              Explore Regions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the unique cultural heritage of each region across India
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-orange-200/50"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search regions, languages, or cultural aspects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35] rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`rounded-xl transition-all duration-300 ${
                    selectedFilter === option.value
                      ? "bg-gradient-to-r from-[#FF6B35] to-[#DAA520] text-white shadow-lg"
                      : "border-gray-200 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Regions Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
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
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRegions.map((region, index) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-[#FF6B35]" />
                            <span className="font-medium">Festival:</span>
                            <Badge 
                              variant="outline" 
                              className="text-xs border-[#FF6B35]/30 text-[#FF6B35] bg-[#FF6B35]/5"
                            >
                              {region.major_festivals[0].name}
                            </Badge>
                          </div>
                        )}

                        {region.cuisine?.signature_dishes?.length > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <Utensils className="w-4 h-4 text-[#2D5A27]" />
                            <span className="font-medium">Cuisine:</span>
                            <Badge 
                              variant="outline" 
                              className="text-xs border-[#2D5A27]/30 text-[#2D5A27] bg-[#2D5A27]/5"
                            >
                              {region.cuisine.signature_dishes[0]}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredRegions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No regions found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
