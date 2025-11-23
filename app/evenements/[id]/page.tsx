"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import eventService from "@/src/services/event.service";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { BASE_URL } from "@/lib/apiCaller";
const MediaUrl = BASE_URL.replace("/api", "");
function EventCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) {
    return <img src="/placeholder.svg" alt="Placeholder" className="w-full h-full object-cover" />;
  }

  return (
    <div className="relative h-64 overflow-hidden rounded-lg">
      <img
        src={images[currentIndex]}
        alt={`${title} - image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventService.getEvents(); // Si ton API a un endpoint getEventById, utilise-le
        const foundEvent = data.find((e: any) => e._id === id);
        setEvent(foundEvent);
      } catch (error) {
        console.error("Erreur lors du chargement de l'événement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center py-20">Chargement...</div>;
  if (!event) return <div className="text-center py-20">Événement introuvable</div>;

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
        <EventCarousel images={event.images.map((img: string) => `${MediaUrl}${img}`)} title={event.title} />
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}</span>
          </div>
          {/* <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span>{event.time}</span>
          </div> */}
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Users className="w-5 h-5 text-primary" />
            <span>{event?.max_attendees} participants attendus</span>
          </div>
        </div>
        <p className="mt-6 text-lg text-muted-foreground">{event.description}</p>
      </section>
      <Footer />
    </main>
  );
}