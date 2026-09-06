import { work } from "@/lib/data";
import WorkDetail from "./WorkDetail";

/** Every case study is known up front, so the route can be prerendered or statically exported. */
export function generateStaticParams() {
  return work.map((project) => ({ slug: project.slug }));
}

export default function WorkDetailPage() {
  return <WorkDetail />;
}
