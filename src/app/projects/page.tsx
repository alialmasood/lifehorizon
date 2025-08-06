import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsFilter } from "@/components/projects/projects-filter";

export const metadata = {
  title: "المشاريع | شركة أفق الحياة",
  description: "تصفح أحدث مشاريعنا في مجال تكنولوجيا المعلومات والخدمات العامة",
};

export default function ProjectsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            مشاريعنا
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            نفخر بتقديم مجموعة متنوعة من المشاريع الناجحة في مجال تكنولوجيا
            المعلومات والخدمات العامة
          </p>
        </div>

        {/* فلتر المشاريع */}
        <ProjectsFilter />

        {/* شبكة المشاريع */}
        <ProjectsGrid />
      </div>
    </div>
  );
} 