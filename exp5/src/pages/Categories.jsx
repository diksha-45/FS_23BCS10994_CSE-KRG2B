import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Utensils, Music, Palette, Globe, BookOpen, MapPin, Users } from "lucide-react";

const categories = [
  {
    id: "festivals",
    title: "Festivals & Celebrations",
    description: "Explore the vibrant festivals that bring communities together across different seasons and regions",
    icon: Calendar,
    color: "from-[#FF6B35] to-[#DAA520]",
    bgColor: "from-[#FF6B35]/10 to-[#DAA520]/10",
    examples: ["Diwali", "Holi", "Durga Puja", "Onam", "Baisakhi"]
  },
  {
    id: "cuisine",
    title: "Regional Cuisine",
    description: "Savor the diverse flavors, cooking techniques, and culinary traditions from every corner of India",
    icon: Utensils,
    color: "from-[#2D5A27] to-[#008080]",
    bgColor: "from-[#2D5A27]/10 to-[#008080]/10",
    examples: ["Biryani", "Dosa", "Rajma", "Fish Curry", "Dal Baati"]
  },
  {
    id: "performing-arts",
    title: "Music & Dance",
    description: "Experience the rhythm, grace, and storytelling of traditional performing arts and folk traditions",
    icon: Music,
    color: "from-[#005F8C] to-[#4169E1]",
    bgColor: "from-[#005F8C]/10 to-[#4169E1]/10",
    examples: ["Bharatanatyam", "Kathak", "Bhangra", "Classical Music", "Folk Songs"]
  },
  {
    id: "arts-crafts",
    title: "Arts & Crafts",
    description: "Discover intricate artistry, traditional crafts, and artistic expressions passed through generations",
    icon: Palette,
    color: "from-[#8B0000] to-[#FF1493]",
    bgColor: "from-[#8B0000]/10 to-[#FF1493]/10",
    examples: ["Madhubani", "Warli Art", "Pottery", "Textiles", "Jewelry"]
  },
  {
    id: "languages",
    title: "Languages & Literature",
    description: "Explore the incredible linguistic diversity with 700+ languages and rich literary traditions",
    icon: Globe,
    color: "from-[#DAA520] to-[#FF8C00]",
    bgColor: "from-[#DAA520]/10 to-[#FF8C00]/10",
    examples: ["Hindi", "Tamil", "Bengali", "Telugu", "Marathi"]
  },
  {
    id: "traditions",
    title: "Customs & Traditions",
    description: "Learn about ancient customs, rituals, and social practices that define Indian cultural identity",
    icon: BookOpen,
    color: "from-[#4B0082] to-[#9932CC]",
    bgColor: "from-[#4B0082]/10 to-[#9932CC]/10",
    examples: ["Weddings", "Coming of Age", "Religious Rituals", "Social Customs", "Family Traditions"]
  },
  {
    id: "architecture",
    title: "Architecture & Monuments",
    description: "Marvel at architectural wonders and historical monuments that showcase India's rich heritage",
    icon: MapPin,
    color: "from-[#CD853F] to-[#D2691E]",
    bgColor: "from-[#CD853F]/10 to-[#D2691E]/10",
    examples: ["Taj Mahal", "Temples", "Palaces", "Forts", "Step Wells"]
  },
  {
    id: "communities",
    title: "Communities & Tribes",
    description: "Meet diverse communities and tribal groups with their unique lifestyles and cultural practices",
    icon: Users,
    color: "from-[#20B2AA] to-[#48D1CC]",
    bgColor: "from-[#20B2AA]/10 to-[#48D1CC]/10",
    examples: ["Tribal Communities", "Nomadic Groups", "Artisan Communities", "Regional Ethnicities"]
  }
];

export default function Categories() {
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
              Cultural Categories
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore India's cultural heritage through different dimensions and aspects
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={createPageUrl(`Category?type=${category.id}`)}>
                <Card className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-none bg-gradient-to-br ${category.bgColor} backdrop-blur-sm h-full`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                          {category.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {category.description}
                        </p>

                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-700">Examples:</p>
                          <div className="flex flex-wrap gap-2">
                            {category.examples.map((example, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.color} bg-opacity-20 text-gray-700 border border-gray-200`}
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-[#FF6B35]/5 via-[#DAA520]/5 to-[#005F8C]/5 rounded-2xl border border-orange-200/30"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Dive Deeper into Indian Culture</h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            Each category represents centuries of tradition, innovation, and cultural evolution. 
            Click on any category to explore specific examples and regional variations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Regions")}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#DAA520] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore by Region
              </motion.button>
            </Link>
            <Link to={createPageUrl("Discover")}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-[#005F8C] text-[#005F8C] hover:bg-[#005F8C] hover:text-white rounded-xl font-medium transition-all duration-300"
              >
                Random Discovery
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}