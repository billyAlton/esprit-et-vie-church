"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPostService, BlogPost } from "@/src/services/blog.service";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date inconnue";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await BlogPostService.getBlogPostById(id as string);
        setPost(data);
      } catch (error) {
        console.error("Erreur chargement article:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (!post) return <div className="text-center py-20">Article introuvable</div>;

  return (
    <><main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>{post.author_id || "Sup. Ev KPOMAHO Joachim"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatDate(post.published_at || post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span>{post.views || 0} vues</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4 grid gap-6 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image à la une */}
            {post.featured_image && (
              <Card>
                <CardContent className="p-0">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Contenu */}
            <Card>
              <CardHeader>
                <CardTitle>Contenu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {post.excerpt && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Extrait</h3>
                    <p className="text-blue-800 leading-relaxed">{post.excerpt}</p>
                  </div>
                )}
                <div
                  className="text-gray-700 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto p-4 border rounded w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                >
                  {post.content}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Détails */}
            <Card>
              <CardHeader>
                <CardTitle>Détails de l'article</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <p><strong>Créé le :</strong> {formatDate(post.createdAt)}</p>
                {post.published_at && (
                  <p><strong>Publié le :</strong> {formatDate(post.published_at)}</p>
                )}
                {post.updatedAt && post.updatedAt !== post.createdAt && (
                  <p><strong>Modifié le :</strong> {formatDate(post.updatedAt)}</p>
                )}
                <p><strong>Temps de lecture :</strong> {post.reading_time} min</p>
                {/* <p><strong>Statut :</strong> {post.status}</p> */}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au blog
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main></>
  );
}