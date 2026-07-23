import type { Metadata } from "next";
import { SearchPage } from "@/components/search/search-page";

export const metadata: Metadata = {
  title: "Find Creators",
  description:
    "Search and discover music professionals, producers, engineers, and creative artists.",
};

export default function Search() {
  return <SearchPage />;
}
