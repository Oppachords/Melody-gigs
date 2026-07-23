import { requireAuth } from "@/lib/session";
import { db } from "@/lib/db";
import { ProfileImageUpload } from "@/components/upload/profile-image-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ClientSettingsPage() {
  const user = await requireAuth();

  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>
            Upload a profile photo. Images are stored securely on Vercel Blob.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileImageUpload
            userId={user.id}
            name={user.name ?? "User"}
            currentImage={user.image}
          />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Name:</span> {user.name}
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span> {user.email}
          </p>
          <p>
            <span className="text-muted-foreground">Role:</span> {user.role}
          </p>
          {profile?.bio && (
            <p>
              <span className="text-muted-foreground">Bio:</span> {profile.bio}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
