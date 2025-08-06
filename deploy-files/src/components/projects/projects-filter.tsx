"use client";

import { useState } from "react";

const categories = [
  { id: "all", name: "الكل" },
  { id: "web", name: "تطوير الويب" },
  { id: "mobile", name: "تطبيقات الموبايل" },
  { id: "desktop", name: "برامج سطح المكتب" },
  { id: "enterprise", name: "حلول المؤسسات" },
];

export function ProjectsFilter() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 