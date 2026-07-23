import { parseMediaUrl, type ParsedMedia } from "@/lib/utils-app";

interface MediaEmbedProps {
  url: string;
  className?: string;
}

export function MediaEmbed({ url, className = "" }: MediaEmbedProps) {
  const media = parseMediaUrl(url);

  return (
    <div className={`overflow-hidden rounded-xl ${className}`}>
      <EmbedContent media={media} />
    </div>
  );
}

function EmbedContent({ media }: { media: ParsedMedia }) {
  switch (media.platform) {
    case "youtube":
      if (!media.embedUrl) return <LinkFallback url={media.originalUrl} />;
      return (
        <div className="relative aspect-video w-full">
          <iframe
            src={media.embedUrl}
            title="YouTube embed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        </div>
      );

    case "spotify":
      if (!media.embedUrl) return <LinkFallback url={media.originalUrl} />;
      return (
        <iframe
          src={media.embedUrl}
          title="Spotify embed"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      );

    case "soundcloud":
      if (!media.embedUrl) return <LinkFallback url={media.originalUrl} />;
      return (
        <iframe
          src={media.embedUrl}
          title="SoundCloud embed"
          width="100%"
          height="166"
          allow="autoplay"
          loading="lazy"
          className="rounded-xl"
        />
      );

    case "instagram":
    case "tiktok":
      return <LinkFallback url={media.originalUrl} label={`View on ${media.platform}`} />;

    default:
      return <LinkFallback url={media.originalUrl} />;
  }
}

function LinkFallback({ url, label }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-xl border bg-muted/50 p-4 text-sm text-primary hover:underline"
    >
      {label ?? url}
    </a>
  );
}
