import SpaceNavigator from "@/components/site/space-navigator";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home");

export default function LandingPage() {
  return <SpaceNavigator />;
}
