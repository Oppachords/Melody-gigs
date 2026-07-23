"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils-app";

interface ProfileImageUploadProps {
  userId: string;
  name: string;
  currentImage?: string | null;
}

export function ProfileImageUpload({
  name,
  currentImage,
}: ProfileImageUploadProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      setPreview(data.url);
      toast.success("Profile photo updated");
      router.refresh();
    } catch (err) {
      setPreview(currentImage ?? null);
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={preview ?? ""} alt={name} />
          <AvatarFallback className="text-2xl">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Camera className="mr-2 h-4 w-4" />
          {uploading ? "Uploading..." : "Change photo"}
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Stored on Vercel Blob. JPG, PNG, WebP, or GIF. Max 4MB.
        </p>
      </div>
    </div>
  );
}
