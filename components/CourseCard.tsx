import { formatPrice } from "@/lib/formatPrice";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";

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
      <div className="group hover:shadow-md dark:shadow-accent transition overflow-hidden border rounded-lg h-full">
        {/* Image */}
        <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>

        {/* Info */}
        <div className="flex flex-col p-2">
          <div className="text-xl font-bold transition line-clamp-2">
            {title}
          </div>
          <p className="text-[14px] text-muted-foreground mt-1">{category}</p>

          {/* Chapters and Progress Bar */}
          <div className="my-3 flex items-center gap-x-2 text-sm">
            <div className="flex items-center gap-x-1">
              <BookOpen />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
              </span>
            </div>
            <LiaGripLinesVerticalSolid
              size={20}
              className="text-muted-foreground"
            />
            {progress !== null ? (
              <div>TODO: Progress component</div>
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
    </Link>
  );
};

export default CourseCard;
