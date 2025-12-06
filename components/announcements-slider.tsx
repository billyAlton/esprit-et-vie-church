"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import eventService from "@/src/services/event.service"
import { BASE_URL } from "@/lib/apiCaller"

// Configuration de l'URL des médias
const MediaUrl = BASE_URL.replace("/api", "")

// Interface pour typer les événements
interface Event {
  _id: string
  title: string
  description: string
  start_date: string
  end_date: string
  event_time?: string
  location: string
  images: string[]
  event_type: string
  status: string
  max_attendees: number
  created_by: string
  createdAt?: string
  updatedAt?: string
}

// Données par défaut en cas d'erreur ou de chargement
const defaultAnnouncements = [
  {
    id: 1,
    title: "Campagne d'Évangélisation",
    description: "Rejoignez-nous pour notre campagne annuelle d'évangélisation. Un moment de partage et de témoignage.",
    date: "10 Janvier 2025",
    time: "10h00",
    location: "Calavi, Bénin",
    image: "/outdoor-evangelization-event-with-crowd.jpg",
    type: "Événement Spécial",
  },
  {
    id: 2,
    title: "Pèlerinage à Imeko",
    description: "Pèlerinage annuel à Imeko, République Fédérale du Nigeria. Inscriptions ouvertes.",
    date: "15 Août 2025",
    time: "06h00",
    location: "Imeko, Nigeria",
    image: "/pilgrimage-journey-with-people-walking.jpg",
    type: "Pèlerinage",
  },
  {
    id: 3,
    title: "Moisson Spirituelle",
    description: "Célébration de la moisson avec actions de grâce, louanges et partage communautaire.",
    date: "À venir",
    time: "09h00",
    location: "Paroisse Esprit et Vie",
    image: "/harvest-celebration-in-church-with-decorations.jpg",
    type: "Célébration",
  },
]

export function AnnouncementsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fonction pour formater la date en français
  const formatDate = (dateString: string) => {
    if (!dateString) return "À venir"
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return "À venir"
    }
  }

  // Fonction pour obtenir l'URL complète de l'image
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.svg"
    // Si l'image commence déjà par http, c'est une URL complète
    if (imagePath.startsWith('http')) return imagePath
    // Sinon, on construit l'URL complète avec MediaUrl
    return `${MediaUrl}${imagePath}`
  }

  // Fonction pour obtenir la première image d'un événement
  const getFirstImage = (event: Event) => {
    if (event.images && event.images.length > 0) {
      return getImageUrl(event.images[0])
    }
    return "/placeholder.svg"
  }

  // Fonction pour formater le type d'événement
  const formatEventType = (eventType: string) => {
    const types: { [key: string]: string } = {
      'service': 'Service',
      'special': 'Événement Spécial',
      'celebration': 'Célébration',
      'pilgrimage': 'Pèlerinage',
      'conference': 'Conférence',
      'retreat': 'Retraite'
    }
    return types[eventType] || eventType || 'Événement'
  }

  // Charger les événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await eventService.getEvents()
        
        // Trier les événements par date de début (du plus récent au plus ancien)
        const sortedEvents = response.sort((a: Event, b: Event) => 
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        )
        
        setEvents(sortedEvents)
      } catch (err) {
        console.error("Erreur lors du chargement des événements:", err)
        setError("Impossible de charger les événements")
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])
  
  console.log("Events fetched:", events)
  console.log("Media URL:", MediaUrl)

  // Gestion du carrousel automatique
  useEffect(() => {
    if (!isAutoPlaying || events.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, events.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  // Utiliser les événements de l'API ou les données par défaut
  const announcements = events.length > 0 
    ? events.map(event => ({
        id: event._id,
        title: event.title,
        description: event.description,
        date: formatDate(event.start_date),
        time: event.event_time || "À confirmer",
        location: event.location,
        image: getFirstImage(event),
        type: formatEventType(event.event_type),
      }))
    : defaultAnnouncements

  const currentAnnouncement = announcements[currentIndex]

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Annonces & Événements</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Chargement des événements...</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Card className="p-20 text-center border-border shadow-xl">
              <div className="animate-pulse">
                <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  if (error && events.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Annonces & Événements</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Annonces & Événements</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Restez informés de nos prochains événements et activités</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Card className="overflow-hidden border-border shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={currentAnnouncement.image}
                  alt={currentAnnouncement.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onError={(e) => {
                    // Fallback si l'image ne charge pas
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    {currentAnnouncement.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-between bg-card">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                    {currentAnnouncement.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {currentAnnouncement.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{currentAnnouncement.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{currentAnnouncement.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{currentAnnouncement.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/evenements">En savoir plus</Link>
                  </Button>

                  {/* Navigation Dots */}
                  {announcements.length > 1 && (
                    <div className="flex gap-2">
                      {announcements.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentIndex(index)
                            setIsAutoPlaying(false)
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentIndex ? "bg-primary w-8" : "bg-border hover:bg-primary/50"
                          }`}
                          aria-label={`Aller à l'annonce ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation Arrows - seulement s'il y a plus d'un événement */}
          {announcements.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
                aria-label="Annonce précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
                aria-label="Annonce suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}