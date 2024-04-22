import { Skeleton } from "../ui/skeleton";

const TextSkeleton = ({ className }) => {
  return <Skeleton className={`${className} rounded-md`} />;
};

export default TextSkeleton;
