import ProjectsPage from "@/components/site/projects-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("projects");

export default function Page() {
  return <ProjectsPage />;
}
