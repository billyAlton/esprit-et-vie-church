"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Music, BookOpen, HelpCircle } from "lucide-react";
import {
  ResourceService,
  type Resource,
} from "@/src/services/resource.service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Types pour les données groupées
interface GroupedResources {
  books: Resource[];
  brochures: Resource[];
  songs: Resource[];
  faqs: Resource[];
}

export default function ResourcesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [grouped, setGrouped] = useState<GroupedResources>({
    books: [],
    brochures: [],
    songs: [],
    faqs: [],
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setError(null);

        // Charger toutes les ressources publiées
        const resourcesRes = await ResourceService.getPublishedResources();
        const allResources = resourcesRes.data;

        // Charger les FAQ (bien que normalement incluses, mais ton endpoint les sépare)
        const faqs = await ResourceService.getFAQs();

        // Grouper par catégorie
        const books = allResources.filter((r) => r.category === "book");
        const brochures = allResources.filter((r) => r.category === "brochure");
        const songs = allResources.filter((r) => r.category === "song");

        setGrouped({
          books,
          brochures,
          songs,
          faqs,
        });
      } catch (err: any) {
        console.error("Erreur chargement ressources:", err);
        setError(err.message || "Impossible de charger les ressources.");
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const handleDownload = async (resource: Resource) => {
    if (!resource._id || !resource.file_url) return;
    try {
      await ResourceService.incrementDownloadCount(resource._id);
      window.open(resource.file_url, "_blank");
    } catch (err) {
      console.error("Erreur téléchargement:", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
          <p>Chargement des ressources...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="py-20 container mx-auto px-4">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Ressources
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Livres, brochures, chants et réponses à vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Books Section */}
      {grouped.books.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <BookOpen className="w-10 h-10 text-primary" />
                  Livres
                </h2>
                <div className="w-20 h-1 bg-primary" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-20">
                {grouped.books.map((book, index) => (
                  <Card
                    key={book._id}
                    className="p-6 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-5 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>

                    {/* Contenu avec scroll interne */}
                    <div className="flex flex-col h-[180px]">
                      {" "}
                      {/* Hauteur fixe pour la carte */}
                      <h3 className="text-xl font-bold text-foreground mb-2 break-words line-clamp-2">
                        {book.title}
                      </h3>
                      {/* Description avec scroll */}
                      <div className="flex-1 overflow-y-auto pr-1 mb-4 text-sm text-muted-foreground break-words">
                        {book.description}
                      </div>
                      {book.pages && (
                        <p className="text-xs text-muted-foreground mb-4">
                          {book.pages} pages
                        </p>
                      )}
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 mt-auto"
                        onClick={() => handleDownload(book)}
                        disabled={!book.file_url}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger PDF
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brochures Section */}
      {grouped.brochures.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <FileText className="w-10 h-10 text-primary" />
                  Brochures
                </h2>
                <div className="w-20 h-1 bg-primary" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-20">
                {grouped.brochures.map((brochure, index) => (
                  <Card
                    key={brochure._id}
                    className="p-6 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-5 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 break-words line-clamp-2">
                      {brochure.title}
                    </h3>
                    <p className="flex-1 overflow-y-auto pr-1 mb-4 text-sm text-muted-foreground break-words">
                      {brochure.description}
                    </p>
                    {brochure.pages && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {brochure.pages} pages
                      </p>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleDownload(brochure)}
                      disabled={!brochure.file_url}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Songs Section */}
      {grouped.songs.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Music className="w-10 h-10 text-primary" />
                  Chants & Partitions
                </h2>
                <div className="w-20 h-1 bg-primary" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-20">
                {grouped.songs.map((song, index) => (
                  <Card
                    key={song._id}
                    className="p-6 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-5 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Music className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {song.title}
                    </h3>
                    {song.artist && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {song.artist}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {song.file_type === "audio" && (
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleDownload(song)}
                          disabled={!song.file_url}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Audio
                        </Button>
                      )}
                      {song.file_type !== "audio" && (
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleDownload(song)}
                          disabled={!song.file_url}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Télécharger
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {grouped.faqs.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                  <HelpCircle className="w-10 h-10 text-primary" />
                  Questions Fréquentes
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto" />
              </div>

              <div className="space-y-6">
                {grouped.faqs.map((faq, index) => (
                  <Card
                    key={faq._id || index}
                    className="p-6 border-border shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {faq.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Aucune ressource */}
      {grouped.books.length === 0 &&
        grouped.brochures.length === 0 &&
        grouped.songs.length === 0 &&
        grouped.faqs.length === 0 && (
          <section className="py-20">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Aucune ressource disponible
              </h3>
              <p className="text-muted-foreground">Revenez plus tard !</p>
            </div>
          </section>
        )}

      <Footer />
    </main>
  );
}
