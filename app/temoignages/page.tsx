"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Calendar, User, Heart, X, Loader2, Filter, ChevronRight, ChevronLeft } from "lucide-react"
import { TestimonyForm } from "@/components/testimony-form"
import { TestimonyService, Testimony } from "@/src/services/testimony.service"

const CATEGORIES = [
  { value: "all", label: "Toutes les catégories" },
  { value: "guerison", label: "Guérison" },
  { value: "famille", label: "Famille" },
  { value: "finances", label: "Finances" },
  { value: "delivrance", label: "Délivrance" },
  { value: "miracle", label: "Miracle" },
  { value: "transformation", label: "Transformation" },
  { value: "autre", label: "Autre" }
]

export default function TestimonialsPage() {
  const [showModal, setShowModal] = useState(false)
  const [testimonies, setTestimonies] = useState<Testimony[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Récupérer les témoignages
  const fetchTestimonies = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await TestimonyService.getApprovedTestimonies({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        featured: showFeaturedOnly ? true : undefined,
        limit: 50
      })
      setTestimonies(response.data)
    } catch (err) {
      console.error('Erreur récupération témoignages:', err)
      setError('Erreur lors du chargement des témoignages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonies()
  }, [selectedCategory, showFeaturedOnly])

  const handleTestimonySubmit = () => {
    // Fermer le modal et recharger les témoignages
    setShowModal(false)
    fetchTestimonies()
  }

  // Séparer les témoignages featured et réguliers
  const featuredTestimonials = testimonies.filter((t) => t.is_featured)
  const regularTestimonials = testimonies.filter((t) => !t.is_featured)

  // Image par défaut basée sur la catégorie
  const getCategoryImage = (category: string) => {
    const categoryImages: { [key: string]: string } = {
      guerison: "/testimonial-healing-miracle-person.jpg",
      famille: "/testimonial-family-restoration-couple.jpg",
      finances: "/testimonial-financial-breakthrough-person.jpg",
      delivrance: "/testimonial-spiritual-deliverance-person.jpg",
      miracle: "/testimonial-conception-miracle-mother.jpg",
      transformation: "/testimonial-life-transformation-person.jpg",
      autre: "/placeholder.svg"
    }
    return categoryImages[category] || "/placeholder.svg"
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

      {/* Filtres */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filtrer par :</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className="flex items-center gap-2"
                >
                  <Heart className={`w-4 h-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />
                  {showFeaturedOnly ? "Témoignages mis en avant" : "Voir les mis en avant"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Chargement des témoignages...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchTestimonies}>Réessayer</Button>
              </div>
            ) : testimonies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">Aucun témoignage trouvé</p>
                <Button onClick={() => setShowModal(true)}>
                  Soyez le premier à partager votre témoignage
                </Button>
              </div>
            ) : (
              <>
                {/* Témoignages mis en avant */}
                {featuredTestimonials.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Témoignages Mis en Avant</h2>
                    <div className="w-20 h-1 bg-primary mb-8" />

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                      {featuredTestimonials.map((testimonial, index) => (
                        <Card
                          key={testimonial._id}
                          className="overflow-hidden border-border shadow-xl hover:shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-700"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="relative h-64 overflow-hidden">
                            {testimonial.images && testimonial.images.length > 0 ? (
                              <img
                                src={testimonial.images[0]}
                                alt={testimonial.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                src={getCategoryImage(testimonial.category)}
                                alt={testimonial.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Category Badge */}
                            <div className="absolute top-4 right-4">
                              <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                                {CATEGORIES.find(cat => cat.value === testimonial.category)?.label || testimonial.category}
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
                                <span>{testimonial.author_name}</span>
                              </div>
                              {testimonial.author_location && (
                                <div className="flex items-center gap-2">
                                  <span>📍 {testimonial.author_location}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{formatDate(testimonial.createdAt)}</span>
                              </div>
                            </div>

                            <blockquote className="text-foreground leading-relaxed italic border-l-4 border-primary pl-4">
                              {testimonial.content}
                            </blockquote>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tous les témoignages */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {showFeaturedOnly ? 'Témoignages Mis en Avant' : 'Tous les Témoignages'}
                    <span className="text-muted-foreground text-lg ml-2">
                      ({testimonies.length})
                    </span>
                  </h3>

                  <div className="relative">
                    {/* Flèches de navigation */}
                    {regularTestimonials.length > 2 && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white -ml-4"
                          onClick={() => setCurrentSlide((prev) => (prev === 0 ? Math.ceil(regularTestimonials.length / 2) - 1 : prev - 1))}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white -mr-4"
                          onClick={() => setCurrentSlide((prev) => (prev >= Math.ceil(regularTestimonials.length / 2) - 1 ? 0 : prev + 1))}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {/* Carousel */}
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-300 ease-in-out gap-6"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {regularTestimonials.map((testimonial, index) => (
                          <div key={testimonial._id} className="flex-shrink-0 w-full md:w-1/2 px-2">
                            <Card
                              className="p-6 border-border shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-5 duration-700 h-full"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                  {testimonial.images && testimonial.images.length > 0 ? (
                                    <img
                                      src={testimonial.images[0]}
                                      alt={testimonial.author_name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <img
                                      src={getCategoryImage(testimonial.category)}
                                      alt={testimonial.author_name}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="min-w-0 flex-1">
                                      <h4 className="font-bold text-foreground truncate">{testimonial.author_name}</h4>
                                      {testimonial.author_location && (
                                        <p className="text-sm text-muted-foreground truncate">{testimonial.author_location}</p>
                                      )}
                                    </div>
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 flex-shrink-0">
                                      {CATEGORIES.find(cat => cat.value === testimonial.category)?.label || testimonial.category}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(testimonial.createdAt)}</span>
                                  </div>
                                </div>
                              </div>

                              <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{testimonial.title}</h3>

                              {/* Zone de contenu avec scrollbar */}
                              <div className="flex flex-col max-h-32">
                                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                  <blockquote className="text-muted-foreground text-sm leading-relaxed italic border-l-4 border-primary/30 pl-4 pr-2 whitespace-pre-wrap break-words">
                                    {testimonial.content}
                                  </blockquote>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Indicateurs de slide */}
                    {regularTestimonials.length > 2 && (
                      <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: Math.ceil(regularTestimonials.length / 2) }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-primary' : 'bg-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
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