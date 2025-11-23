"use client";

import { useEffect, useState } from "react";
import eventService from "@/src/services/event.service";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BASE_URL } from "@/lib/apiCaller";


const MediaUrl = BASE_URL.replace("/api", "");
function EventCarousel({ images, title }: { images: string[]; title: string }) {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <img src="/placeholder.svg" alt="Placeholder"   className="w-50 h-full object-cover" />
    );
  }

  return (
    <div className="relative h-48 overflow-hidden">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`${title} - image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Boutons navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ▶
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erreur lors du chargement des événements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Chargement des événements...
      </div>
    );
  }
  const currentDate = new Date();
  const eventsFiltered = events.filter((event) => new Date(event.end_date) >= currentDate);

  const featuredEvents = events.filter((event) => event.featured);
  const regularEvents = events.filter((event) => !event.featured);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Nos Événements</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-xl text-muted-foreground">
            Découvrez nos prochains événements et rejoignez-nous pour des moments de foi et de communion
          </p>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Événements à la Une</h2>
          <div className="w-20 h-1 bg-primary mb-12" />
          <div className="grid lg:grid-cols-2 gap-8">
            {eventsFiltered.map((event, index) => (
              <Card
                key={event._id}
                className="overflow-hidden border-border shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
              >
                <EventCarousel
                  images={event.images.map((img: string) => MediaUrl + img)}
                  title={event.title}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <div className="space-y-3 mb-6 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{event.start_date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{event.attendees} participants attendus</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href={`/evenements/${event._id}`}>
                      En savoir plus
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tous les Événements</h2>
          <div className="w-20 h-1 bg-primary mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map((event, index) => (
              <Card
                key={event._id}
                className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <EventCarousel
                  images={event.images.map((img: string) => MediaUrl + img)}
                  title={event.title}
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/evenements/${event._id}`}>Détails</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}