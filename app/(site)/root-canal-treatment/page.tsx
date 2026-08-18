import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";

const service = getService("root-canal-treatment")!;

export const metadata: Metadata = buildMetadata({
  path: service.path,
  title: service.seoTitle,
  description: service.seoDescription,
  ogTitle: service.ogTitle,
  ogDescription: service.ogDescription,
});

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
