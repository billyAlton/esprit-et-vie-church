"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Heart, User, Eye, EyeOff, Loader2 } from "lucide-react"
import { PrayerRequestService, type PrayerRequest } from "@/src/services/prayer.service"
import { useState } from "react"

export default function PrayerRequestPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<Partial<PrayerRequest>>({
    title: "",
    description: "",
    requester_name: "",
    is_anonymous: false,
    is_public: true,
    status: "active"
  })

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation de base
      if (!formData.title || !formData.description) {
        throw new Error("Le titre et la description sont obligatoires")
      }

      // Préparer les données pour l'envoi
      const submitData = {
        ...formData,
        // Si c'est anonyme, on ne garde pas le nom
        requester_name: formData.is_anonymous ? null : formData.requester_name
      }

      await PrayerRequestService.createPrayerRequest(submitData)
      setSuccess(true)

      // Réinitialiser le formulaire
      setFormData({
        title: "",
        description: "",
        requester_name: "",
        is_anonymous: false,
        is_public: true,
        status: "pending"
      })
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi de votre demande de prière")
      console.error("Erreur:", err)
    } finally {
      setLoading(false)
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation améliorée
      if (!formData.title || !formData.description) {
        throw new Error("Le titre et la description sont obligatoires")
      }

      if (formData.description.length < 10) {
        throw new Error("La description doit contenir au moins 10 caractères")
      }

      // Préparer les données pour l'envoi
      const submitData = {
        title: formData.title,
        description: formData.description,
        requester_name: formData.is_anonymous ? null : (formData.requester_name || null),
        is_anonymous: formData.is_anonymous,
        is_public: formData.is_public,
        status: "active", // ← Toujours "active" pour les nouvelles demandes
        prayer_count: 0
      }

      await PrayerRequestService.createPrayerRequest(submitData)
      setSuccess(true)

      // Réinitialiser le formulaire
      setFormData({
        title: "",
        description: "",
        requester_name: "",
        is_anonymous: false,
        is_public: true,
        status: "active"
      })
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi de votre demande de prière")
      console.error("Erreur:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof PrayerRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Demande de Prière</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Partagez votre intention de prière avec notre communauté
            </p>
          </div>
        </div>
      </section>

      {/* Prayer Request Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Prayer Request Form */}
              <Card className="p-8 border-border shadow-xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Partagez Votre Demande</h2>

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-700 text-center">
                      ✅ Votre demande de prière a été envoyée avec succès. Notre communauté va prier pour vous.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                      Titre de votre demande *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Ex: Santé, Travail, Famille..."
                      className="bg-background"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                      Description détaillée *
                      {formData.description && (
                        <span className={`ml-2 text-xs ${formData.description.length < 10 ? 'text-red-500' : 'text-green-500'
                          }`}>
                          ({formData.description.length}/10 caractères minimum)
                        </span>
                      )}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre intention de prière en détail (au moins 10 caractères)..."
                      rows={6}
                      className="bg-background resize-none"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      required
                    />
                    {formData.description && formData.description.length < 10 && (
                      <p className="text-red-500 text-xs mt-1">
                        La description doit contenir au moins 10 caractères
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="requester_name" className="block text-sm font-medium text-foreground mb-2">
                      Votre nom (optionnel)
                    </Label>
                    <Input
                      id="requester_name"
                      placeholder="Votre nom"
                      className="bg-background"
                      value={formData.requester_name || ''}
                      onChange={(e) => handleChange('requester_name', e.target.value)}
                      disabled={formData.is_anonymous}
                    />
                  </div>

                  {/* Options de confidentialité */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <Label htmlFor="anonymous" className="text-sm font-medium text-foreground">
                            Demande anonyme
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Votre nom ne sera pas affiché
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="anonymous"
                        checked={formData.is_anonymous}
                        onCheckedChange={(checked) => handleChange('is_anonymous', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {formData.is_public ? (
                          <Eye className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <EyeOff className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <Label htmlFor="public" className="text-sm font-medium text-foreground">
                            Demande publique
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Visible par toute la communauté
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="public"
                        checked={formData.is_public}
                        onCheckedChange={(checked) => handleChange('is_public', checked)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Envoyer ma demande de prière
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Champs obligatoires. Votre demande sera traitée avec respect et confidentialité.
                  </p>
                </form>
              </Card>

              {/* Prayer Information */}
              <div className="space-y-6">
                <Card className="p-6 border-border shadow-lg bg-primary text-primary-foreground">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3">Pourquoi Partager Votre Demande ?</h3>
                      <p className="opacity-90 mb-3">
                        La prière en communauté a une puissance particulière. En partageant votre intention,
                        vous permettez à nos frères et sœurs de porter votre fardeau avec vous.
                      </p>
                      <p className="text-sm opacity-80">
                        "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux."
                        <br />
                        <span className="italic">- Matthieu 18:20</span>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Confidentialité</h3>
                      <p className="text-muted-foreground">
                        Vous pouvez choisir de rendre votre demande publique (visible par tous)
                        ou de la garder privée (visible uniquement par notre équipe de prière).
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Anonymat</h3>
                      <p className="text-muted-foreground">
                        Si vous préférez garder votre identité secrète, vous pouvez soumettre
                        votre demande de manière anonyme. Seul notre équipe de prière saura
                        qu'elle vient de vous.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Engagement de Prière</h3>
                      <p className="text-muted-foreground">
                        Notre équipe de prière s'engage à prier pour chaque demande reçue.
                        Nous croyons en la puissance de la prière d'intercession et en la
                        fidélité de Dieu à répondre selon sa volonté.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg">
                  <div className="text-center">
                    <h3 className="font-bold text-foreground mb-3">Versets d'Encouragement</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p className="italic">
                        "Ne vous inquiétez de rien; mais en toute chose faites connaître
                        vos besoins à Dieu par des prières et des supplications, avec des actions de grâces."
                        <br />
                        <span className="not-italic text-xs">- Philippiens 4:6</span>
                      </p>
                      <p className="italic">
                        "Confie-toi en l'Éternel de tout ton cœur, Et ne t'appuie pas sur ta sagesse."
                        <br />
                        <span className="not-italic text-xs">- Proverbes 3:5</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}