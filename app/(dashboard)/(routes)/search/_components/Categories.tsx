"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
  FcEngineering,
  FcLandscape,
  FcMusic,
  FcOldTimeCamera,
  FcOrgUnit,
  FcPieChart,
  FcReading,
  FcSalesPerformance,
  FcSportsMode,
  FcTimeline,
  FcVoicePresentation,
} from "react-icons/fc";
import CategoryItem from "./CategoryItem";

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Engineering: FcEngineering,
  "Photography & Film": FcOldTimeCamera,
  "Business & Finance": FcSalesPerformance,
  Fitness: FcSportsMode,
  "Computer Science": FcOrgUnit,
  "Art & Design": FcLandscape,
  History: FcTimeline,
  "Language Learning": FcVoicePresentation,
  Literature: FcReading,
  Mathematics: FcPieChart,
};

const Categories = ({ items }: { items: Category[] }) => {
  return (
    <ScrollArea>
      <div className="flex items-center gap-x-2 overflow-x-auto py-4 mb-2">
        {items.map((item) => (
          <CategoryItem
            key={item.id}
            name={item.name}
            icon={iconMap[item.name]}
            label={item.label!}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Categories;
