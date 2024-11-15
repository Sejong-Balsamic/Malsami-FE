import Link from "next/link";

interface DocCategoryCardProps {
  title: string;
  link: string;
  accessible: boolean;
}

export default function DocCategoryCard({ title, link, accessible }: DocCategoryCardProps) {
  return accessible ? (
    <Link href={link}>
      <div className="h-24 w-24 rounded bg-gray-200 p-4 text-center shadow-md">{title}</div>
    </Link>
  ) : (
    <div className="h-24 w-24 rounded bg-gray-300 p-4 text-center text-gray-400 shadow-md">
      {title}
      <p className="mt-1 text-sm">접근 불가</p>
    </div>
  );
}
