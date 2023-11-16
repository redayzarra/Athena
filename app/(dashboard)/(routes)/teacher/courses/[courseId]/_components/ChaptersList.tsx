"use client";

import { Chapter } from "@prisma/client";
import React from "react";

interface Props {
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
}

const ChaptersList = ({ onEdit, onReorder, items }: Props) => {
  return <div>ChaptersList</div>;
};

export default ChaptersList;
