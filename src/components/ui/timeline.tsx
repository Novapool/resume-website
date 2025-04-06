"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export interface TimelineItem {
  title: string;
  date: string;
  description: string;  // Now this will contain HTML
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
      
      {/* Timeline Items */}
      {items.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`flex mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          <div className={`w-5/12 relative ${index % 2 === 1 && 'order-1'}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.date}</p>
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: item.description }} />
              </CardContent>
            </Card>
            {/* Dot on timeline */}
            <div className="absolute top-6 w-4 h-4 rounded-full bg-primary shadow">
              <div className={`absolute ${index % 2 === 0 ? '-right-10' : '-left-10'}`}></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}