import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Utensils, Music, Palette, Globe, BookOpen } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    title: "Festivals",
    description: "Celebrate the vibrant festivals that bring communities together",
    color: "from-[#FF6B35] to-[#DAA520]",
    bgColor: "from-[#FF6B35]/10 to-[#DAA520]/10"
  },
  {
    icon: Utensils,
    title: "Cuisine",
    description: "Savor the diverse flavors and culinary traditions of each region",
    color: "from-[#2D5A27] to-[#008080]",
    bgColor: "from-[#2D5A27]/10 to-[#008080]/10"
  },
  {
    icon: Music,
    title: "Music & Dance",
    description: "Experience the rhythm and grace of traditional performing arts",
    color: "from-[#005F8C] to-[#4169E1]",
    bgColor: "from-[#005F8C]/10 to-[#4169E1]/10"
  },
  {
    icon: Palette,
    title: "Art & Craft",
    description: "Discover the intricate artistry passed down through generations",
    color: "from-[#8B0000] to-[#FF1493]",
    bgColor: "from-[#8B0000]/10 to-[#FF1493]/10"
  },
  {
    icon: Globe,
    title: "Languages",
    description: "Explore the linguistic diversity with 700+ languages and dialects",
    color: "from-[#DAA520] to-[#FF8C00]",
    bgColor: "from-[#DAA520]/10 to-[#FF8C00]/10"
  },
  {
    icon: BookOpen,
    title: "Traditions",
    description: "Learn about customs and rituals that define Indian culture",
    color: "from-[#4B0082] to-[#9932CC]",
    bgColor: "from-[#4B0082]/10 to-[#9932CC]/10"
  }
];

export default function CulturalHighlights({ regions }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Cultural <span className="bg-gradient-to-r from-[#FF6B35] to-[#005F8C] bg-clip-text text-transparent">Dimensions</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          India's cultural heritage spans across multiple dimensions, each contributing to the nation's rich tapestry
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-none bg-gradient-to-br ${highlight.bgColor} backdrop-blur-sm`}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${highlight.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${highlight.color} bg-clip-text text-transparent`}>
                  {highlight.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mt-12 p-8 bg-gradient-to-r from-[#FF6B35]/5 via-[#DAA520]/5 to-[#005F8C]/5 rounded-2xl border border-orange-200/30"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Unity in Diversity</h3>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          "Unity in Diversity" perfectly captures India's essence - where countless languages, religions, 
          cuisines, and traditions coexist harmoniously, creating a vibrant mosaic of human culture.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="text-4xl">🇮🇳</div>
        </div>
      </motion.div>
    </div>
  );
}