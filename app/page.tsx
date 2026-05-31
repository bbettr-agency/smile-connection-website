import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

// The brief requires /home as the homepage route. Root redirects there.
export default function RootIndex() {
  redirect(routes.home.path);
}
