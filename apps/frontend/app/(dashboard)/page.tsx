import { redirect } from "next/navigation";
import { defaultDomainId } from "@/config/navigation";

export default function HomePage() {
  redirect(`/${defaultDomainId}`);
}
