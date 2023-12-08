import CategoryItemLoading from "./CategoryItemLoading";

const CategoriesLoading = () => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto py-4 mb-2">
      <CategoryItemLoading />
      <CategoryItemLoading />
      <CategoryItemLoading />
      <CategoryItemLoading />
    </div>
  );
};

export default CategoriesLoading;
