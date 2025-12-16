import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Heart, Users, Target, BookOpen, Sparkles, HandHeart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">À Propos de Nous</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Découvrez l'histoire, la mission et la vision du Ministère Esprit et Vie
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Notre Histoire</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            {/* Le Missionnaire */}
            <Card className="p-8 md:p-12 mb-12 border-border shadow-lg animate-in fade-in slide-in-from-left-5 duration-700">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden shadow-xl">
                    <img
                      src="/papa1.jpeg"
                      alt="Supérieur ÉvangélisteJoachim KPOMAHO"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-primary" />
                    Le Missionnaire
                  </h3>
                  <p className="text-foreground leading-relaxed mb-4">
                    Homme de foi, serviteur dévoué, le <strong>Supérieur ÉvangélisteJoachim KPOMAHO</strong> est
                    l'exemple vivant d'un ministère exercé avec ferveur et humilité. Jour après jour, il se tient à la
                    brèche, guidant les âmes vers la lumière de l'Évangile, soutenant les faibles, fortifiant les cœurs,
                    et enseignant avec clarté la Parole de Dieu.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Fidèle dans les petites comme dans les grandes missions, il œuvre sans relâche pour le bien de
                    l'Église et l'édification du peuple de Dieu. Sa vie, marquée par la prière, le service et l'amour du
                    prochain, inspire et témoigne que le véritable leadership spirituel se mesure à la constance, au
                    sacrifice et à la fidélité envers le Seigneur.
                  </p>
                </div>
              </div>
            </Card>

            {/* La Paroisse */}
            <Card className="p-8 md:p-12 bg-card border-border shadow-lg animate-in fade-in slide-in-from-right-5 duration-700 delay-200">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary" />
                La Paroisse Esprit et Vie
              </h3>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Fondée le <strong>29 septembre 2016</strong>, la paroisse Esprit et Vie s'est progressivement affirmée
                  comme bien plus qu'une simple communauté : elle est aujourd'hui un lieu de foi vivante, d'engagement
                  spirituel et humain.
                </p>
                <p>
                  Son fondateur a eu l'honneur de recevoir une formation auprès de grandes figures ecclésiastiques,
                  notamment le regretté <strong>Pasteur Paul Gonçalves</strong>, fondateur de la paroisse de Sikecodji,
                  ancien Secrétaire Général Mondial de l'ECC, qu'il avait servi avec loyauté et humilité jusqu'à son
                  rappel à Dieu, le 05 février 2012.
                </p>
                <p>
                  C'est fort de cet héritage et mû par un appel divin qu'il poursuit aujourd'hui sa mission avec ferveur
                  et dévouement.
                </p>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mt-8">
                  <h4 className="font-semibold text-foreground mb-4 text-lg">Nos Activités Principales</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>
                        <strong>Cours bibliques :</strong> Tous les mardis de 19h à 21h en français et traduits en
                        langue locale
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>
                        <strong>Campagnes d'évangélisation :</strong> Les 10 janvier de chaque année
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>
                        <strong>24h pour Jésus Christ :</strong> Les 15 août de chaque année
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>
                        <strong>Pèlerinages annuels :</strong> Organisés à Imeko, République Fédérale du Nigeria et
                        autres sites de dévotion
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Notre Mission</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Le Ministère Esprit et Vie est composé de trois palliers ou secteurs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pallier Spirituel */}
              <Card className="p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">Pallier Spirituel</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  L'adoration, l'évangélisation, la vision et la prophétie, dans leurs dimensions spirituelles.
                </p>
              </Card>

              {/* Pallier Humanitaire */}
              <Card className="p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <HandHeart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">Pallier Humanitaire</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Encadrement et éducation des couches défavorisées (enfants de rue, orphelins et personnes âgées).
                </p>
              </Card>

              {/* Pallier Social */}
              <Card className="p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">Pallier Social</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Éducation, entreprenant, formation à l'auto emploi, santé, officine.
                </p>
              </Card>
            </div>

            <Card className="mt-12 p-8 md:p-12 bg-primary text-primary-foreground border-0 shadow-xl">
              <p className="text-lg leading-relaxed mb-4">
                En outre, nous encourageons l'insertion professionnelle des jeunes, préparons une relève éduquée et
                consciente.
              </p>
              <p className="text-lg leading-relaxed font-semibold">
                La prière est essentielle, mais elle doit s'accompagner d'actions concrètes; étant donné que Dieu n'agit
                qu'à travers les efforts humains.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Notre Vision</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <Card className="p-8 md:p-12 border-border shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Un Point d'Ancrage Spirituel pour Tous</h3>
                </div>
              </div>

              <div className="space-y-4 text-foreground leading-relaxed text-lg">
                <p>
                  Elle découle de la mission humanitaire et spirituelle. Nous aspirons à être un point d'ancrage
                  spirituel, un espace où l'âme retrouve sens à la vie et réconfort à tous les désespérés.
                </p>
                <p>
                  Animés par la foi, soutenus par l'amour, et guidés par la prière, nous œuvrons à restaurer les cœurs,
                  élever les consciences et transformer les vies.
                </p>
                <p>
                  Notre engagement est d'accompagner chacun, quel que soit son chemin, dans une démarche sincère de
                  croissance spirituelle et personnelle.
                </p>
                <p className="font-semibold text-primary">
                  À travers nos actions, nous visons à impacter durablement les consciences aux plans spirituel, social
                  au service d'un monde plus éclairé, plus juste et plus harmonieux.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Rejoignez Notre Communauté
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Venez découvrir une communauté accueillante où la foi, l'amour et l'espoir se rencontrent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/evenements">Voir nos événements</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
