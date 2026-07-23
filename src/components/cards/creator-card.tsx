"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency, getInitials } from "@/lib/utils-app";

interface CreatorCardProps {
  id: string;
  name: string;
  image?: string | null;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  priceMin: number;
  priceMax: number;
  country?: string | null;
  plan?: string;
  isVerified?: boolean;
}

export function CreatorCard({
  name,
  image,
  title,
  category,
  rating,
  reviews,
  priceMin,
  priceMax,
  country,
  plan,
  isVerified,
}: CreatorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/creators/${name.toLowerCase().replace(/\s+/g, "-")}`}>
        <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
          <CardContent className="p-0">
            <div className="relative h-40 bg-gradient-to-br from-violet-500/20 to-blue-500/20" />
            <div className="relative px-4 pb-4">
              <Avatar className="-mt-8 h-16 w-16 border-4 border-background">
                <AvatarImage src={image ?? ""} />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold group-hover:text-primary">
                    {name}
                    {isVerified && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Verified
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {title}
                  </p>
                </div>
                {plan && plan !== "FREE" && (
                  <Badge
                    className={
                      plan === "UNLIMITED"
                        ? "bg-gradient-to-r from-amber-500 to-orange-500"
                        : "bg-violet-600"
                    }
                  >
                    {plan === "UNLIMITED" ? "Premium" : "Pro"}
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {rating.toFixed(1)} ({reviews})
                </span>
                {country && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {country}
                  </span>
                )}
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              </div>
              <p className="mt-3 text-sm font-semibold">
                {formatCurrency(priceMin)} – {formatCurrency(priceMax)}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

interface AdCardProps {
  id: string;
  title: string;
  description: string;
  priceMin: number;
  priceMax: number;
  deliveryDays: number;
  category: string;
  creatorName: string;
  creatorImage?: string | null;
  rating: number;
  isFeatured?: boolean;
}

export function AdCard({
  title,
  description,
  priceMin,
  priceMax,
  deliveryDays,
  category,
  creatorName,
  creatorImage,
  rating,
  isFeatured,
}: AdCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/ads/${title.toLowerCase().replace(/\s+/g, "-")}`}>
        <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
          <CardContent className="p-5">
            {isFeatured && (
              <Badge className="mb-3 bg-violet-600">Featured</Badge>
            )}
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={creatorImage ?? ""} />
                <AvatarFallback>{getInitials(creatorName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{creatorName}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {rating.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="font-semibold">
                {formatCurrency(priceMin)} – {formatCurrency(priceMax)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {deliveryDays} days
              </span>
            </div>
            <Badge variant="outline" className="mt-3">
              {category}
            </Badge>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
