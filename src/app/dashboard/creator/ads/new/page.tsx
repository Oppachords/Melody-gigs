import { requireCreator } from "@/lib/session";
import { CreateAdForm } from "@/components/ads/create-ad-form";

export default async function CreateAdPage() {
  await requireCreator();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Create Ad</h1>
      <p className="mb-8 text-muted-foreground">
        Publish a new service listing. Your ad is saved to your account immediately.
      </p>
      <CreateAdForm />
    </div>
  );
}
