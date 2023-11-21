"use client";

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
  FcVoicePresentation
} from "react-icons/fc";

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Engineering": FcEngineering,
  "Photography & Film": FcOldTimeCamera,
  "Business & Finance": FcSalesPerformance,
  "Fitness": FcSportsMode,
  "Computer Science": FcOrgUnit,
  "Art & Design": FcLandscape,
  "History": FcTimeline,
  "Language Learning": FcVoicePresentation,
  "Literature": FcReading,
  "Mathematics": FcPieChart,
}

const Categories = ({ items }: { items: Category[] }) => {
  return <div>Categories</div>;
};

export default Categories;
