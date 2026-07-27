import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";

export default async function AdminContentPage() {
  await requireAdmin();

  const [faqs, posts] = await Promise.all([
    getDb().fAQ.findMany({ orderBy: { sortOrder: "asc" } }),
    getDb().blogPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Content</h1>
      <p className="mb-8 text-muted-foreground">
        FAQs and blog posts on the platform.
      </p>

      <h2 className="mb-4 text-xl font-semibold">FAQs</h2>
      {faqs.length === 0 ? (
        <DashboardEmpty message="No FAQs published yet." />
      ) : (
        <div className="mb-10 space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{faq.question}</CardTitle>
                <Badge variant={faq.isActive ? "default" : "secondary"}>
                  {faq.isActive ? "Active" : "Hidden"}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <h2 className="mb-4 text-xl font-semibold">Blog Posts</h2>
      {posts.length === 0 ? (
        <DashboardEmpty message="No blog posts yet." />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{post.title}</CardTitle>
                <Badge variant={post.isPublished ? "default" : "secondary"}>
                  {post.isPublished ? "Published" : "Draft"}
                </Badge>
              </CardHeader>
              {post.excerpt && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
