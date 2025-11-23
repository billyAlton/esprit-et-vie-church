"use client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPostService, BlogPost } from "@/src/services/blog.service";
import { useState, useEffect } from "react";

const blogPosts = [
  {
    id: 1,
    title: "La Puissance de la Prière dans la Vie du Croyant",
    excerpt:
      "Découvrez comment la prière peut transformer votre vie quotidienne et renforcer votre relation avec Dieu. Un guide pratique pour développer une vie de prière efficace.",
    author: "Supérieur ÉvangélisteJoachim KPOMAHO",
    date: "10 Décembre 2024",
    readTime: "8 min",
    image: "/blog-power-of-prayer-article.jpg",
    category: "Spiritualité",
    featured: true,
  },
  {
    id: 2,
    title: "Comprendre la Grâce de Dieu",
    excerpt:
      "La grâce de Dieu est un concept fondamental de la foi chrétienne. Explorons ensemble ce que signifie vivre sous la grâce et comment elle transforme nos vies.",
    author: "Ministère Esprit et Vie",
    date: "5 Décembre 2024",
    readTime: "10 min",
    image: "/blog-understanding-gods-grace-article.jpg",
    category: "Doctrine",
    featured: true,
  },
  {
    id: 3,
    title: "Le Jeûne Biblique : Guide Pratique",
    excerpt:
      "Le jeûne est une discipline spirituelle puissante. Apprenez les différents types de jeûne et comment les pratiquer selon les principes bibliques.",
    author: "Supérieur ÉvangélisteJoachim KPOMAHO",
    date: "28 Novembre 2024",
    readTime: "12 min",
    image: "/blog-biblical-fasting-guide-article.jpg",
    category: "Pratique",
    featured: false,
  },
  {
    id: 4,
    title: "Vivre dans la Sainteté au Quotidien",
    excerpt:
      "La sainteté n'est pas réservée aux saints d'autrefois. Découvrez comment vivre une vie sainte dans le monde moderne tout en restant fidèle à Dieu.",
    author: "Ministère Esprit et Vie",
    date: "22 Novembre 2024",
    readTime: "7 min",
    image: "/blog-living-in-holiness-daily-article.jpg",
    category: "Vie Chrétienne",
    featured: false,
  },
  {
    id: 5,
    title: "L'Importance de la Communion Fraternelle",
    excerpt:
      "Pourquoi la communion fraternelle est-elle si importante dans la vie de l'église ? Explorons les bénéfices spirituels de la vie en communauté.",
    author: "Ministère Esprit et Vie",
    date: "15 Novembre 2024",
    readTime: "6 min",
    image: "/blog-fellowship-importance-article.jpg",
    category: "Communauté",
    featured: false,
  },
  {
    id: 6,
    title: "Les Dons Spirituels et Leur Utilisation",
    excerpt:
      "Chaque croyant a reçu des dons spirituels. Apprenez à identifier vos dons et à les utiliser pour l'édification de l'église et la gloire de Dieu.",
    author: "Supérieur ÉvangélisteJoachim KPOMAHO",
    date: "8 Novembre 2024",
    readTime: "9 min",
    image: "/blog-spiritual-gifts-usage-article.jpg",
    category: "Enseignement",
    featured: false,
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await BlogPostService.getPublishedBlogPosts({
          limit: 10,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Erreur chargement articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-20">Chargement...</div>;

  // Trier les articles par date de création (du plus récent au plus ancien)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  // Le dernier article (le plus récent) est l'article à la une
  const featuredPost = sortedPosts.length > 0 ? sortedPosts[0] : null;
  // Les articles réguliers sont tous les autres articles
  const regularPosts = sortedPosts.length > 1 ? sortedPosts.slice(1) : [];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Blog
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Articles spirituels, réflexions et enseignements pour nourrir
              votre foi
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Article à la Une
                </h2>
                <div className="w-20 h-1 bg-primary" />
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card
                  key={featuredPost._id}
                  className="overflow-hidden border-border shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-5 duration-700"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={featuredPost.featured_image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 right-4">
                      {/* <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                        {featuredPost.category}
                      </span> */}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${featuredPost._id}`}>{featuredPost.title}</Link>
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>Sup.Ev KPOMAHO Joachim</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>
                          {featuredPost.createdAt
                            ? new Date(featuredPost.createdAt).toLocaleDateString(
                                "fr-FR",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Date inconnue"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{featuredPost.reading_time} min(s)</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 group"
                    >
                      <Link href={`/blog/${featuredPost._id}`}>
                        Lire l'article
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {featuredPost ? "Tous les Articles" : "Articles"}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, index) => (
                <Card
                  key={post._id}
                  className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-5 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      {/* <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span> */}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${post._id}`}>{post.title}</Link>
                    </h3>

                    <div className="flex flex-col gap-2 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Date inconnue"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-primary" />
                        <span>{post.reading_time} min(s)</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full bg-transparent"
                    >
                      <Link href={`/blog/${post._id}`}>Lire plus</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}