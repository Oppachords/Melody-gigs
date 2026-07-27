import { requireClient } from "@/lib/session";
import { CreateGigForm } from "@/components/gigs/create-gig-form";

export default async function PostGigPage() {
  await requireClient();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Post a Gig</h1>
      <p className="mb-8 text-muted-foreground">
        Describe your project and let creators apply with proposals.
      </p>
      <CreateGigForm />
    </div>
  );
}
