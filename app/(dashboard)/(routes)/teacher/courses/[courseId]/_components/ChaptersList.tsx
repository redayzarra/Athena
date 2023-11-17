"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Chapter } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface Props {
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
}

const ChaptersList = ({ onEdit, onReorder, items }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id)
    }))

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center justify-between gap-x-2 bg-background border border-muted-foreground/20 text-muted-foreground rounded-md mb-2 text-sm",
                      chapter.isPublished && "bg-primary/20 dark:bg-primary/30"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-2.5 border-r border-r-muted-foreground/20 hover:bg-foreground hover:text-background rounded-l-md transition-all",
                        chapter.isPublished &&
                          "hover:bg-primary/60 dark:hover:bg-primary dark:hover:text-foreground"
                      )}
                      {...provided.dragHandleProps}
                    >
                      {chapter.isPublished ? (
                        <FaCheck />
                      ) : (
                        <Grip className="h-4 w-4" />
                      )}
                    </div>
                    <p className="flex-grow text-foreground font-semibold line-clamp-1">
                      {chapter.title}
                    </p>

                    {/* Badge and Edit Icon */}
                    <div className="flex items-center">
                      <div className="flex items-center gap-x-2">
                        {chapter.isFree && (
                          <Badge
                            className={cn(
                              !chapter.isPublished &&
                                "bg-foreground text-background hover:bg-foreground/80"
                            )}
                          >
                            Free
                          </Badge>
                        )}
                      </div>
                      <Pencil
                        className="mx-2 h-4 w-4 cursor-pointer hover:text-foreground transition-all"
                        onClick={() => onEdit(chapter.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
