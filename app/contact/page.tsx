import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Contactez-Nous</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nous sommes là pour vous écouter et répondre à vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8 border-border shadow-xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Envoyez-nous un Message</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet
                    </label>
                    <Input id="name" placeholder="Votre nom" className="bg-background" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="votre@email.com" className="bg-background" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input id="phone" type="tel" placeholder="+229 01 95 86 33 19" className="bg-background" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Sujet
                    </label>
                    <Input id="subject" placeholder="Sujet de votre message" className="bg-background" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Votre message..."
                      rows={6}
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Envoyer le message
                  </Button>
                </form>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="p-6 border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Adresse</h3>
                      <p className="text-muted-foreground">Paroisse Esprit et Vie</p>
                      <p className="text-muted-foreground">Abomey-Calavi, Tokan</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Téléphone</h3>
                      <p className="text-muted-foreground">+229 01 52 87 98 98</p>
                      <p className="text-muted-foreground">+229 01 95 86 33 19</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Email</h3>
                      <p className="text-muted-foreground">ministereespritetvie2016@gmail.com</p>
                      <p className="text-muted-foreground">info@espritetvie.org</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2">Horaires d'Ouverture</h3>
                      <p className="text-muted-foreground">Lundi - Vendredi : 9h00 - 17h00</p>
                      <p className="text-muted-foreground">Samedi : 10h00 - 14h00</p>
                      <p className="text-muted-foreground">Dimanche : Culte à 10h00</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border shadow-lg bg-primary text-primary-foreground">
                  <h3 className="font-bold mb-4">Suivez-nous</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                    >
                      <Youtube className="w-6 h-6" />
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}

      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment Nous Trouver</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <Card className="overflow-hidden border-border shadow-xl">
              <a
                href="https://maps.app.goo.gl/qErULW1VxTgzJ9Uq6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {/* <div className="text-center">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Carte Google Maps</p>
                    <p className="text-sm text-muted-foreground">Paroisse Esprit et Vie, Calavi, Bénin</p>
                  </div> */}
                  <iframe className="" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4455.745298507692!2d2.310340819095908!3d6.4445788895812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1024a9003a283a05%3A0xf489dc52f562a379!2sECC%20ESPRIT%20ET%20VIE!5e0!3m2!1sfr!2sbj!4v1763565641959!5m2!1sfr!2sbj" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
