"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Calendar, User, Heart, X } from "lucide-react"
import { TestimonyForm } from "@/components/testimony-form"

const testimonials = [
  {
    id: 1,
    name: "Marie K.",
    location: "Calavi",
    date: "15 Décembre 2024",
    title: "Guérison Miraculeuse",
    testimony:
      "J'étais malade depuis plusieurs années et les médecins ne trouvaient pas de solution. Lors d'une prière de délivrance un jeudi soir, j'ai senti la puissance de Dieu me toucher. Aujourd'hui, je suis complètement guérie ! Gloire à Dieu pour ce miracle dans ma vie.",
    image: "/testimonial-healing-miracle-person.jpg",
    category: "Guérison",
    featured: true,
  },
  {
    id: 2,
    name: "Jean-Paul M.",
    location: "Porto-Novo",
    date: "8 Décembre 2024",
    title: "Restauration Familiale",
    testimony:
      "Mon mariage était au bord de l'effondrement. Après avoir participé au séminaire de mariage et reçu des conseils du pasteur, Dieu a restauré notre union. Aujourd'hui, nous vivons dans l'harmonie et l'amour. Merci Seigneur !",
    image: "/testimonial-family-restoration-couple.jpg",
    category: "Famille",
    featured: true,
  },
  {
    id: 3,
    name: "Esther A.",
    location: "Calavi",
    date: "1 Décembre 2024",
    title: "Percée Financière",
    testimony:
      "J'étais au chômage depuis deux ans malgré mes diplômes. Après avoir jeûné et prié avec la communauté, j'ai reçu trois offres d'emploi en une semaine ! Dieu est fidèle et Il répond aux prières.",
    image: "/testimonial-financial-breakthrough-person.jpg",
    category: "Finances",
    featured: false,
  },
  {
    id: 4,
    name: "David L.",
    location: "Abomey-Calavi",
    date: "24 Novembre 2025",
    title: "Délivrance Spirituelle",
    testimony:
      "J'étais tourmenté par des cauchemars et des attaques spirituelles. Grâce aux prières de délivrance du jeudi, j'ai été libéré de toutes ces oppressions. Je dors maintenant en paix et ma vie a complètement changé.",
    image: "/testimonial-spiritual-deliverance-person.jpg",
    category: "Délivrance",
    featured: false,
  },
  {
    id: 5,
    name: "Rachelle T.",
    location: "Calavi",
    date: "17 Novembre 2024",
    title: "Miracle de Conception",
    testimony:
      "Après 8 ans de mariage sans enfant, nous avions perdu espoir. Mais Dieu a fait un miracle ! Suite aux prières de la communauté, je suis tombée enceinte. Aujourd'hui, nous avons un magnifique bébé. Dieu fait des miracles !",
    image: "/testimonial-conception-miracle-mother.jpg",
    category: "Miracle",
    featured: false,
  },
  {
    id: 6,
    name: "Samuel N.",
    location: "Parakou",
    date: "10 Novembre 2024",
    title: "Transformation de Vie",
    testimony:
      "J'étais dans l'alcoolisme et la drogue. Ma vie n'avait plus de sens. Lors d'une campagne d'évangélisation, j'ai rencontré Christ et ma vie a été transformée. Je suis maintenant sobre, j'ai un travail et je sers Dieu avec joie.",
    image: "/testimonial-life-transformation-person.jpg",
    category: "Transformation",
    featured: false,
  },
]

export default function TestimonialsPage() {
  const [showModal, setShowModal] = useState(false)
  const featuredTestimonials = testimonials.filter((t) => t.featured)
  const regularTestimonials = testimonials.filter((t) => !t.featured)

  const handleTestimonySubmit = () => {
    // Fermer le modal après soumission réussie
    setShowModal(false)
    // Vous pouvez aussi ajouter un toast de confirmation ici
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Modal de soumission */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <Card className="relative">
              <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Partager votre témoignage</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <TestimonyForm onSuccess={handleTestimonySubmit} />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Témoignages</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Découvrez comment Dieu transforme des vies à travers notre communauté
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Témoignages Récents</h2>
              <div className="w-20 h-1 bg-primary" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {featuredTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className="overflow-hidden border-border shadow-xl hover:shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                        {testimonial.category}
                      </span>
                    </div>

                    {/* Quote Icon */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{testimonial.title}</h3>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>{testimonial.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{testimonial.date}</span>
                      </div>
                    </div>

                    <blockquote className="text-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                      {testimonial.testimony}
                    </blockquote>
                  </div>
                </Card>
              ))}
            </div>

            {/* All Testimonials */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Tous les Témoignages</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {regularTestimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    className="p-6 border-border shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-5 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                            {testimonial.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-3">{testimonial.title}</h3>

                    <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-4">
                      {testimonial.testimony}
                    </blockquote>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Testimony CTA */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 border-border shadow-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                Partagez Votre Témoignage
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Dieu a fait quelque chose de merveilleux dans votre vie ? Partagez votre témoignage pour encourager
                d'autres personnes et glorifier le Seigneur.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => setShowModal(true)}
              >
                Partager mon témoignage
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}