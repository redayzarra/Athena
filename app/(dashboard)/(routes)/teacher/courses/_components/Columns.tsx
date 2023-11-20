"use client";

import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import { Course as PrismaCourse, Category } from "@prisma/client";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

// Extend the Course type to include the category object
type CourseWithCategory = PrismaCourse & {
  category?: Category | null;
};

export const columns: ColumnDef<CourseWithCategory>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: (info: CellContext<CourseWithCategory, unknown>) => (
      <span className="line-clamp-2 font-medium">{info.getValue() as string}</span>
    ),
  },
  {
    accessorFn: (row) =>
      row.price === 0 || row.price === null ? "Free" : formatPrice(row.price),
    id: "price",
    header: "Price",
    cell: (info: CellContext<CourseWithCategory, unknown>) => {
      const value = info.getValue() as string;
      return value === "Free" ? (
        <span className="italic font-bold text-muted-foreground">{value}</span>
      ) : (
        <span className="font-bold">{value}</span>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: (info: CellContext<CourseWithCategory, unknown>) => {
      const isPublished = info.getValue() as boolean;
      return (
        <div className="flex justify-center items-center">
          {isPublished ? (
            <FaRegCheckCircle className="h-5 w-5 text-primary" />
          ) : (
            <FaRegTimesCircle className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.category?.name, // Access the category name
    id: "category",
    header: "Category",
  },
  {
    accessorFn: (row) => formatDate(row.updatedAt), // Format the date
    id: "updatedAt",
    header: "Last Modified",
  },
];
