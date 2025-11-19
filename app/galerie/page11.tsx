import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Video, Calendar } from "lucide-react"
import Link from "next/link"

const albums = [
  {
    id: 1,
    title: "Moissons Spirituelles",
    description: "Célébrations de moissons avec actions de grâce et louanges",
    date: "2024",
    photoCount: 45,
    coverImage: "/gallery-harvest-celebration-album.jpg",
    category: "Célébrations",
  },
  {
    id: 2,
    title: "Mariages",
    description: "Cérémonies de mariage célébrées à la paroisse",
    date: "2023-2024",
    photoCount: 120,
    coverImage: "/gallery-wedding-ceremonies-album.jpg",
    category: "Cérémonies",
  },
  {
    id: 3,
    title: "Baptêmes",
    description: "Baptêmes d'eau et célébrations de nouvelle naissance",
    date: "2024",
    photoCount: 68,
    coverImage: "/gallery-baptism-ceremonies-album.jpg",
    category: "Cérémonies",
  },
  {
    id: 4,
    title: "Retraites Spirituelles",
    description: "Moments de recueillement et de communion avec Dieu",
    date: "2024",
    photoCount: 52,
    coverImage: "/gallery-spiritual-retreats-album.jpg",
    category: "Retraites",
  },
  {
    id: 5,
    title: "Campagnes d'Évangélisation",
    description: "Nos campagnes d'évangélisation à travers le pays",
    date: "2023-2024",
    photoCount: 89,
    coverImage: "/gallery-evangelization-campaigns-album.jpg",
    category: "Évangélisation",
  },
  {
    id: 6,
    title: "Pèlerinages à Imeko",
    description: "Voyages spirituels annuels à Imeko, Nigeria",
    date: "2023-2024",
    photoCount: 76,
    coverImage: "/gallery-imeko-pilgrimage-album.jpg",
    category: "Pèlerinages",
  },
  {
    id: 7,
    title: "Cultes Dominicaux",
    description: "Moments de louange et d'adoration lors de nos cultes",
    date: "2024",
    photoCount: 134,
    coverImage: "/gallery-sunday-worship-services-album.jpg",
    category: "Cultes",
  },
  {
    id: 8,
    title: "Activités Jeunesse",
    description: "Programmes et activités dédiés aux jeunes de la paroisse",
    date: "2024",
    photoCount: 95,
    coverImage: "/gallery-youth-activities-album.jpg",
    category: "Jeunesse",
  },
  {
    id: 9,
    title: "Actions Humanitaires",
    description: "Nos actions caritatives auprès des communautés",
    date: "2023-2024",
    photoCount: 61,
    coverImage: "/gallery-humanitarian-actions-album.jpg",
    category: "Humanitaire",
  },
]

const videos = [
  {
    id: 1,
    title: "Campagne d'Évangélisation 2024",
    thumbnail: "/video-evangelization-campaign-2024.jpg",
    duration: "12:45",
    views: "2.3k",
  },
  {
    id: 2,
    title: "Pèlerinage à Imeko 2024",
    thumbnail: "/video-imeko-pilgrimage-2024.jpg",
    duration: "18:20",
    views: "1.8k",
  },
  {
    id: 3,
    title: "Moisson Spirituelle 2024",
    thumbnail: "/video-harvest-celebration-2024.jpg",
    duration: "15:30",
    views: "1.5k",
  },
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Galerie</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Revivez les moments forts de notre communauté à travers nos photos et vidéos
            </p>
          </div>
        </div>
      </section>

      {/* Photo Albums */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Albums Photos</h2>
              <div className="w-20 h-1 bg-primary" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album, index) => (
                <Card
                  key={album.id}
                  className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom-5 duration-700"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-64 overflow-hidden group">
                    <img
                      src={album.coverImage || "/placeholder.svg"}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-accent-foreground px-3 py-2 rounded-full text-xs font-semibold">
                        {album.category}
                      </span>
                    </div>

                    {/* Photo Count */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <ImageIcon className="w-5 h-5" />
                      <span className="font-semibold">{album.photoCount} photos</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-foreground mb-2">{album.title}</h3>

                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{album.date}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{album.description}</p>

                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/galerie/${album.id}`}>Voir l'album</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Vidéothèque</h2>
              <div className="w-20 h-1 bg-primary" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card
                  key={video.id}
                  className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom-5 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.views} vues</p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Voir toutes les vidéos sur YouTube
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
