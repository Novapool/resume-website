import AboutPage from "@/components/site/about-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("about");

export default function Page() {
  return <AboutPage />;
}
