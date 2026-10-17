import OverviewPage from "@/components/site/overview-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("overview");

export default function Page() {
  return <OverviewPage />;
}
