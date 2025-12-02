// app/galerie/albums/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, ImageIcon, MapPin, User, Share2, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PhotoGallery from "@/components/photo-gallery";
import ShareAlbum from "@/components/share-album";

// Type pour les photos
interface Photo {
  _id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  width: number;
  height: number;
  exif?: {
    camera?: string;
    lens?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
    focalLength?: string;
  };
  uploadedAt: string;
}

// Type pour l'album
interface Album {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  location?: string;
  category: string;
  tags: string[];
  photographer?: string;
  photoCount: number;
  photos: Photo[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Fonction pour récupérer l'album
async function getAlbum(id: string): Promise<Album> {
  // Remplacer par votre appel API réel
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/albums/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch album');
  }
  
  return res.json();
}

// Metadata dynamique
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const album = await getAlbum(params.id);
    
    return {
      title: `${album.title} - Galerie Photo`,
      description: album.description,
      openGraph: {
        title: album.title,
        description: album.description,
        images: [album.coverImage],
      },
    };
  } catch {
    return {
      title: 'Album non trouvé',
    };
  }
}

export default async function AlbumPage({ params }: { params: { id: string } }) {
  let album: Album;
  
  try {
    album = await getAlbum(params.id);
  } catch {
    notFound();
  }

  if (!album.isPublic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec image de couverture */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={album.coverImage || "/placeholder.svg"}
            alt={album.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
        </div>

        {/* Navigation */}
        <div className="relative z-10 container mx-auto px-4 pt-8">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-white hover:text-white hover:bg-white/20">
              <Link href="/galerie">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la galerie
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
              <ShareAlbum album={album} />
              <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Infos de l'album */}
        <div className="relative z-10 container mx-auto px-4 pt-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
                {album.category}
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                {album.photoCount} photos
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {album.title}
            </h1>
            
            <p className="text-lg text-white/90 mb-6">
              {album.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              {album.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{album.date}</span>
                </div>
              )}
              
              {album.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{album.location}</span>
                </div>
              )}
              
              {album.photographer && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Par {album.photographer}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="photos" className="space-y-6">
          <TabsList className="bg-transparent border-b w-full justify-start h-auto p-0">
            <TabsTrigger 
              value="photos" 
              className="relative px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Photos ({album.photoCount})
            </TabsTrigger>
            <TabsTrigger 
              value="info" 
              className="relative px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Informations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-6">
            {/* Stats rapides */}
            <Card className="p-6 bg-muted/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{album.photoCount}</div>
                  <div className="text-sm text-muted-foreground">Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{album.date}</div>
                  <div className="text-sm text-muted-foreground">Date</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{album.category}</div>
                  <div className="text-sm text-muted-foreground">Catégorie</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {album.location ? album.location.split(',')[0] : 'Non spécifié'}
                  </div>
                  <div className="text-sm text-muted-foreground">Lieu</div>
                </div>
              </div>
            </Card>

            {/* Galerie de photos */}
            <PhotoGallery photos={album.photos} />

            {/* Tags */}
            {album.tags && album.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {album.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Détails de l'album</h3>
              
              <div className="grid gap-4">
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Titre</h4>
                  <p className="text-lg">{album.title}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Description</h4>
                  <p className="text-lg">{album.description}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-muted-foreground mb-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                      </h4>
                      <p>{album.date}</p>
                    </div>
                    
                    {album.location && (
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Lieu
                        </h4>
                        <p>{album.location}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-muted-foreground mb-1">Catégorie</h4>
                      <Badge>{album.category}</Badge>
                    </div>
                    
                    {album.photographer && (
                      <div>
                        <h4 className="font-medium text-muted-foreground mb-1 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Photographe
                        </h4>
                        <p>{album.photographer}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-muted-foreground mb-2">Métadonnées</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Créé le :</span>
                      <p>{new Date(album.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dernière mise à jour :</span>
                      <p>{new Date(album.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Albums similaires */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Albums similaires</h2>
            <Button asChild variant="ghost">
              <Link href="/galerie">
                Voir tous
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Ici vous pourriez ajouter une section d'albums similaires */}
          <div className="text-center py-12 text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>D'autres albums de la catégorie {album.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}