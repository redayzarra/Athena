"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import { Course as PrismaCourse, Category } from "@prisma/client";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

// Extend the Course type to include the category object
type CourseWithCategory = PrismaCourse & {
  category?: Category | null;
};

export const columns: ColumnDef<CourseWithCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="rounded-[0.25rem]"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="rounded-[0.25rem]"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info: CellContext<CourseWithCategory, unknown>) => {
      // Access the entire row's original data
      const rowData = info.row.original;

      return (
        <Link href={`/teacher/courses/${rowData.id}`}>
          {" "}
          {/* Use rowData.id for courseId */}
          <a className="line-clamp-2 font-medium">
            {info.getValue() as string}
          </a>
        </Link>
      );
    },
  },
  {
    accessorFn: (row) => row.price, // Return the actual numerical value
    id: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info: CellContext<CourseWithCategory, unknown>) => {
      // Use the raw value for display formatting
      const priceValue = info.getValue() as number;
      const displayValue =
        priceValue === 0 || priceValue === null
          ? "Free"
          : formatPrice(priceValue);

      return (
        <div className="ml-4">
          <span
            className={
              displayValue === "Free"
                ? "italic font-bold text-muted-foreground"
                : "font-bold"
            }
          >
            {displayValue}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info: CellContext<CourseWithCategory, unknown>) => (
      <span className="ml-4 line-clamp-1 font-medium">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorFn: (row) => formatDate(row.createdAt), // Format the date
    id: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => formatDate(row.updatedAt), // Format the date
    id: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
