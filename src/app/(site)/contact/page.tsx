import ContactPage from "@/components/site/contact-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("contact");

export default function Page() {
  return <ContactPage />;
}
