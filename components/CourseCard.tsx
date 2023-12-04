import { formatPrice } from "@/lib/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import CourseProgress from "./CourseProgress";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  description: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  description,
}: Props) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-md dark:shadow-accent transition overflow-hidden border rounded-lg h-full flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-video rounded-t-md overflow-hidden flex-shrink-0">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>

        {/* Info */}
        <div className="flex flex-col p-2 flex-grow">
          <div className="text-xl font-bold transition line-clamp-2">
            {title}
          </div>
          <p className="text-[14px] text-muted-foreground mt-1">{category}</p>

          {/* Align Chapters and Progress Bar at Bottom */}
          <div className="mt-auto">
            <div className="my-3 gap-x-2 text-sm flex justify-between items-center">
              <div className="flex items-center gap-x-2 max-w-[200px]">
                <BookOpen />
                <span>
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "chapter" : "chapters"}
                </span>
                <LiaGripLinesVerticalSolid
                  size={20}
                  className="text-muted-foreground"
                />
              </div>
              <div className="mr-12 mt-1.5">
                {progress !== null ? (
                  <CourseProgress
                    size="sm"
                    value={progress}
                    variant={progress === 100 ? "success" : "default"}
                  />
                ) : (
                  <p
                    className={`font-semibold text-base inline-block ${
                      price === 0 && "italic"
                    }`}
                  >
                    {price === 0 ? "Free" : formatPrice(price)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
