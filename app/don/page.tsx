"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, CreditCard, Building, Smartphone, CheckCircle, Gift, HandHeart, Loader2, X,ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectService, type Project } from "@/src/services/project.service";
import { useEffect, useState } from "react"

export default function DonationPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showDonationMethods, setShowDonationMethods] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await ProjectService.getPublishedProjects({
          limit: 10,
          featured: true
        });
        setProjects(response.data);
      } catch (err: any) {
        setError("Erreur lors du chargement des projets");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  const handleShowProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  // Fonction pour ouvrir les moyens de don
  const handleShowDonationMethods = (project: Project) => {
    setSelectedProject(project);
    setShowDonationMethods(true);
  };

  // Fonction pour fermer les modals
  const handleCloseModals = () => {
    setShowProjectDetails(false);
    setShowDonationMethods(false);
    setSelectedProject(null);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      construction: Building,
      humanitarian: HandHeart,
      education: CheckCircle,
      health: Heart,
      spiritual: Gift,
      other: Heart
    };
    return icons[category as keyof typeof icons] || Heart;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      construction: "Construction",
      humanitarian: "Humanitaire",
      education: "Éducation",
      health: "Santé",
      spiritual: "Spirituel",
      other: "Autre"
    };
    return labels[category as keyof typeof labels] || category;
  };
  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800"
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: { label: "En planification", color: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "En cours", color: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminé", color: "bg-green-100 text-green-800" },
      paused: { label: "En pause", color: "bg-gray-100 text-gray-800" }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.planning;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(amount);
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Faire un Don</h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Soutenez l'ONG Esprit et Vie et participez à l'avancement de la mission
            </p>
          </div>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 border-border shadow-xl mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Pourquoi Donner ?</h2>
              <p className="text-foreground leading-relaxed mb-6">
                Vos dons permettent à l'ONG Esprit & Vie de poursuivre sa mission spirituelle, humanitaire et sociale.
                Chaque contribution, quelle que soit sa taille, fait une différence dans la vie de nombreuses personnes.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Mission Spirituelle</h3>
                  <p className="text-sm text-muted-foreground">Évangélisation et enseignement de la Parole</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Action Humanitaire</h3>
                  <p className="text-sm text-muted-foreground">Aide aux orphelins, aux couches défavorisées et aux personnes démunies</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Développement Social</h3>
                  <p className="text-sm text-muted-foreground">Formation et insertion professionnelle</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Moyens de Don</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Online Donation */}
              <Card className="p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">Don en Ligne</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Faites votre don de manière sécurisée par carte bancaire
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">Donner en ligne</Button>
              </Card>

              {/* Bank Transfer */}
              <Card className="p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">Virement Bancaire</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Effectuez un virement directement sur notre compte
                </p>
                <div className="bg-muted p-4 rounded-lg text-sm mb-4">
                  <p className="font-semibold text-foreground mb-2">Coordonnées bancaires :</p>
                  <p className="text-muted-foreground">Banque : [Nom de la banque]</p>
                  <p className="text-muted-foreground">IBAN : [Numéro IBAN]</p>
                  <p className="text-muted-foreground">BIC : [Code BIC]</p>
                </div>
              </Card>

              {/* Mobile Money */}
              <Card className="p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">Mobile Money</h3>
                <p className="text-muted-foreground text-center mb-6">Utilisez votre service de paiement mobile</p>
                <div className="bg-muted p-4 rounded-lg text-sm mb-4">
                  <p className="font-semibold text-foreground mb-2">Numéros :</p>
                  <p className="text-muted-foreground">MTN : +229 XX XX XX XX</p>
                  <p className="text-muted-foreground">Moov : +229 XX XX XX XX</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projets à Soutenir</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 md:p-8 border-border shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                      <HandHeart className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Lieu de pèlerinage et d'accueil</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Aidez-nous à créer un sanctuaire dédié à la prière, à la rencontre et à la formation spirituelle
                      un lieu où les familles, les jeunes et les visiteurs peuvent se ressourcer, apprendre et se soutenir mutuellement.
                    </p>

                    <div className="mb-4">
                      <p className="font-semibold text-foreground mb-2">Ce que ce lieu permettra :</p>
                      <ul className="text-sm text-muted-foreground ml-4 space-y-1 list-disc mb-3">
                        <li>Espaces de prière et de retraite pour des groupes et des familles</li>
                        <li>Programmes de formation et d'accompagnement spirituel</li>
                        <li>Accueil et soutien des personnes vulnérables en détresse</li>
                      </ul>

                      <p className="text-sm text-muted-foreground mb-2">Étape actuelle :</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          Acquisition du terrain — En cours
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                          Aménagement — À venir
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                          Programmes & accueil — Planification
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <Button className="w-full sm:flex-1 bg-primary hover:bg-primary/90">
                        Soutenir ce projet
                      </Button>
                      <button
                        type="button"
                        className="w-full sm:w-auto px-4 py-2 rounded-md border border-border text-sm text-foreground bg-transparent hover:bg-muted transition"
                      >
                        Découvrir la vision
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 md:p-8 border-border shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-foreground mb-1">Aide aux Orphelins</h3>
                  <p className="text-muted-foreground">
                    Aidez-nous à offrir un avenir stable aux enfants les plus vulnérables. Vos dons financent l'accès à l'éducation,
                    la santé et l'encadrement psychologique pour des orphelins et enfants de la rue. Chaque contribution crée un
                    impact direct et mesurable dans la vie d'un enfant.
                  </p>

                  <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
                    <li>Programmes éducatifs et fournitures scolaires</li>
                    <li>Soins médicaux et nutritionnels réguliers</li>
                    <li>Accompagnement familial et insertion sociale</li>
                  </ul>

                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p className="font-semibold text-foreground mb-1">Exemples d'impact (montant libre) :</p>
                    <ul className="text-muted-foreground list-disc ml-5">
                      <li>Petit don : fournitures scolaires pour un enfant</li>
                      <li>Don moyen : suivi médical et nutritionnel sur plusieurs mois</li>
                      <li>Don généreux : prise en charge complète (éducation, santé, encadrement)</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">Montant libre — choisissez ce qui vous convient, chaque contribution compte.</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Progrès actuel du programme</p>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={42} aria-valuemin={0} aria-valuemax={100}>
                      <div className="h-3 bg-primary" style={{ width: "10%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">La graine a germé, faisons-la grandir ensemble.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Button className="w-full sm:flex-1 bg-primary hover:bg-primary/90">
                      Soutenir ce projet
                    </Button>
                    <button
                      type="button"
                      className="w-full sm:w-auto px-4 py-2 rounded-md border border-border text-sm text-foreground bg-transparent hover:bg-muted transition"
                    >
                      En savoir plus
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Transparence : rapports trimestriels publiés et possibilité de recevoir un bilan personnalisé sur demande.
                    Votre don est sécurisé et utilisé localement.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projets à Soutenir</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                <span className="text-gray-600">Chargement des projets...</span>
              </div>
            ) : error ? (
              <Card className="p-8 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Réessayer</Button>
              </Card>
            ) : projects.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600">Aucun projet à afficher pour le moment.</p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project) => {
                  const CategoryIcon = getCategoryIcon(project.category);

                  return (
                    <Card
                      key={project._id}
                      className="p-6 md:p-8 border-border shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 hover:scale-[1.01]"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-lg bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                            <CategoryIcon className="w-10 h-10 text-primary" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {getCategoryLabel(project.category)}
                            </span>
                            {getStatusBadge(project.status)}
                            {project.is_featured && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                                Projet phare
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>

                          {project.short_description && (
                            <p className="text-sm text-muted-foreground mb-4">
                              {project.short_description}
                            </p>
                          )}

                          <div className="mb-4">
                            {project.impact_points && project.impact_points.length > 0 && (
                              <>
                                <p className="font-semibold text-foreground mb-2">Ce projet permettra :</p>
                                <ul className="text-sm text-muted-foreground ml-4 space-y-1 list-disc mb-3">
                                  {project.impact_points.slice(0, 3).map((point, index) => (
                                    <li key={index}>{point}</li>
                                  ))}
                                </ul>
                              </>
                            )}

                            {project.steps && project.steps.length > 0 && (
                              <>
                                <p className="text-sm text-muted-foreground mb-2">Étapes du projet :</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                  {project.steps.map((step, index) => (
                                    <span
                                      key={index}
                                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${step.status === 'completed'
                                        ? 'bg-green-100 text-green-800'
                                        : step.status === 'in_progress'
                                          ? 'bg-blue-100 text-blue-800'
                                          : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                      {step.name}
                                    </span>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Progrès de collecte */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-foreground font-medium">
                                Collecte : {formatAmount(project.current_amount)} / {formatAmount(project.goal_amount)}
                              </span>
                              <span className="text-primary font-bold">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                              <div
                                className="h-3 bg-primary transition-all duration-500"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>

                          {project.donation_examples && project.donation_examples.length > 0 && (
                            <div className="bg-muted p-3 rounded-md text-sm mb-4">
                              <p className="font-semibold text-foreground mb-1">Exemples d'impact :</p>
                              <ul className="text-muted-foreground list-disc ml-5">
                                {project.donation_examples.slice(0, 2).map((example, index) => (
                                  <li key={index}>
                                    {formatAmount(example.amount)} : {example.description}
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs text-muted-foreground mt-2">
                                Montant libre — choisissez ce qui vous convient, chaque contribution compte.
                              </p>
                            </div>
                          )}

                          {/*  <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="w-full sm:flex-1 bg-primary hover:bg-primary/90">
                              Soutenir ce projet
                            </Button>
                            <button
                              type="button"
                              className="w-full sm:w-auto px-4 py-2 rounded-md border border-border text-sm text-foreground bg-transparent hover:bg-muted transition"
                            >
                              En savoir plus
                            </button>
                          </div> */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              className="w-full sm:flex-1 bg-primary hover:bg-primary/90"
                              onClick={() => handleShowDonationMethods(project)}
                            >
                              Soutenir ce projet
                            </Button>
                            <button
                              type="button"
                              className="w-full sm:w-auto px-4 py-2 rounded-md border border-border text-sm text-foreground bg-transparent hover:bg-muted transition"
                              onClick={() => handleShowProjectDetails(project)}
                            >
                              En savoir plus
                            </button>
                          </div>

                          <p className="text-xs text-muted-foreground mt-3">
                            Transparence : rapports trimestriels publiés et possibilité de recevoir un bilan personnalisé sur demande.
                            Votre don est sécurisé et utilisé localement.
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bible Verses — simple display for reading */}
      <section
        className="py-20"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          background:
            "linear-gradient(180deg, rgba(240, 255, 250, 0.7), rgba(255, 255, 255, 0.6))",
        }}
        aria-labelledby="versets-heading"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="relative rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden border border-emerald-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,255,248,0.85))",
                boxShadow:
                  "0 10px 30px rgba(14, 165, 132, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
                backdropFilter: "blur(6px)",
              }}
              role="region"
              aria-label="Versets bibliques"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-100 to-emerald-50 flex items-center justify-center ring-1 ring-emerald-200">
                  <Heart className="w-8 h-8 text-emerald-700" />
                </div>

                <div className="text-center">
                  <h3 id="versets-heading" className="text-2xl md:text-3xl font-extrabold text-emerald-900">
                    Versets bibliques
                  </h3>
                  <p className="text-sm text-emerald-700/80 mt-1">
                    Réflexions et méditations pour encourager le service, la solidarité et le partage
                  </p>
                  <div className="mx-auto mt-3 w-28 h-1 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-600" />
                </div>
              </div>

              <div className="grid gap-5 mt-6">
                {[
                  {
                    text:
                      "Mais mon serviteur Caleb, parce qu'il a eu un esprit différent et qu'il m'a pleinement suivi, je le conduirai dans le pays où il est entré, et ses descendants en hériteront.",
                    ref: "Nombres 14:24",
                  },
                  {
                    text:
                      "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie.",
                    ref: "2 Corinthiens 9:7",
                  },
                  {
                    text: "Il y a plus de bonheur à donner qu'à recevoir.",
                    ref: "Actes 20:35",
                  },
                  {
                    text: "Celui qui arrose sera lui-même arrosé; celui qui fait du bien sera lui-même béni.",
                    ref: "Proverbes 11:25",
                  },
                  {
                    text:
                      "Donnez, et il vous sera donné: on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde; car on vous mesurera avec la mesure dont vous vous serez servis.",
                    ref: "Luc 6:38",
                  },
                  {
                    text: "Car là où est ton trésor, là aussi sera ton cœur.",
                    ref: "Matthieu 6:21",
                  },
                  {
                    text:
                      "Et n'oubliez pas la bienfaisance et la libéralité; car c'est à de tels sacrifices que Dieu prend plaisir.",
                    ref: "Hébreux 13:16",
                  },
                  {
                    text:
                      "Ne vous laissez pas vaincre par le mal, mais vainquez le mal par le bien.",
                    ref: "Romains 12:21",
                  },
                ].map((v, i) => {
                  const badgeBg = [
                    "from-emerald-100 to-emerald-300 text-emerald-800",
                    "from-cyan-100 to-cyan-200 text-cyan-800",
                    "from-amber-100 to-amber-200 text-amber-800",
                    "from-rose-100 to-rose-200 text-rose-800",
                  ][i % 4];
                  return (
                    <article
                      key={`${v.ref}-${i}`}
                      className="relative rounded-xl p-5 md:p-6 bg-white/80 border border-emerald-50 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex-shrink-0 rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-gradient-to-br ${badgeBg} ring-1 ring-inset ring-emerald-50`}
                        >
                          {v.ref}
                        </div>

                        <div className="flex-1">
                          <p className="text-base md:text-lg leading-relaxed italic text-emerald-900/95 font-medium" style={{ lineHeight: 1.6 }}>
                            “{v.text}”
                          </p>

                          <div className="mt-3 flex items-center gap-3">
                            <div className="text-xs text-emerald-700/80">Méditation</div>
                          </div>
                        </div>
                      </div>

                      {/* decorative accent */}
                      <div
                        aria-hidden
                        className="absolute -bottom-3 right-3 w-20 h-6 rounded-full opacity-10"
                        style={{
                          background:
                            i % 2 === 0
                              ? "linear-gradient(90deg, rgba(16,185,129,0.12), rgba(6,95,70,0.04))"
                              : "linear-gradient(90deg, rgba(14,165,233,0.12), rgba(3,105,161,0.03))",
                        }}
                      />
                    </article>
                  );
                })}
              </div>

              <div className="mt-7 text-center text-xs text-emerald-700/80">
                <span>Ces versets peuvent vous inspirer pour vos dons et votre service. Merci pour votre générosité.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal des détails du projet */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <Button variant="ghost" size="sm" onClick={handleCloseModals}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* En-tête du projet */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {getCategoryLabel(selectedProject.category)}
                </span>
                {getStatusBadge(selectedProject.status)}
                {selectedProject.is_featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                    Projet phare
                  </span>
                )}
              </div>

              {/* Image du projet */}
              {selectedProject.image_url && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={selectedProject.image_url}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Description complète */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description du projet</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Progrès de collecte */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-3">Avancement de la collecte</h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      Collecté : {formatAmount(selectedProject.current_amount)}
                    </span>
                    <span className="text-primary font-bold">{selectedProject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1 text-right">
                    Objectif : {formatAmount(selectedProject.goal_amount)}
                  </p>
                </div>
              </Card>

              {/* Points d'impact */}
              {selectedProject.impact_points && selectedProject.impact_points.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Points d'impact</h3>
                  <ul className="space-y-2">
                    {selectedProject.impact_points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Étapes du projet */}
              {selectedProject.steps && selectedProject.steps.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Étapes du projet</h3>
                  <div className="space-y-3">
                    {selectedProject.steps.map((step, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium w-6">{step.order}.</span>
                          <span>{step.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(step.status)}`}>
                            {step.status === 'pending' && 'En attente'}
                            {step.status === 'in_progress' && 'En cours'}
                            {step.status === 'completed' && 'Terminé'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exemples de dons */}
              {selectedProject.donation_examples && selectedProject.donation_examples.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Exemples d'impact de votre don</h3>
                  <div className="grid gap-3">
                    {selectedProject.donation_examples.map((example, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-lg text-primary">
                              {formatAmount(example.amount)}
                            </span>
                            <p className="text-gray-700 mt-1">{example.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Bouton de soutien */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setShowProjectDetails(false);
                    setShowDonationMethods(true);
                  }}
                >
                  Soutenir ce projet
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseModals}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal des moyens de don */}
      {showDonationMethods && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Soutenir {selectedProject.title}</h2>
                <p className="text-gray-600">Choisissez votre moyen de don</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseModals}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              {/* Aperçu du projet */}
              <Card className="p-4 mb-6 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const IconComponent = getCategoryIcon(selectedProject.category);
                      return <IconComponent className="h-6 w-6 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedProject.title}</h3>
                    <p className="text-sm text-gray-600">
                      Progression : {selectedProject.progress}% • {formatAmount(selectedProject.current_amount)} / {formatAmount(selectedProject.goal_amount)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Section des moyens de don (reprise de votre section existante) */}
              <div className="space-y-6">
                {/* Online Donation */}
                <Card className="p-6 border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Don en Ligne</h3>
                      <p className="text-muted-foreground text-sm">
                        Faites votre don de manière sécurisée par carte bancaire
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Donner en ligne
                  </Button>
                </Card>

                {/* Bank Transfer */}
                <Card className="p-6 border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Virement Bancaire</h3>
                      <p className="text-muted-foreground text-sm">
                        Effectuez un virement directement sur notre compte
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-sm mb-4">
                    <p className="font-semibold text-foreground mb-2">Coordonnées bancaires :</p>
                    <p className="text-muted-foreground">Banque : [Nom de la banque]</p>
                    <p className="text-muted-foreground">IBAN : [Numéro IBAN]</p>
                    <p className="text-muted-foreground">BIC : [Code BIC]</p>
                  </div>
                </Card>

                {/* Mobile Money */}
                <Card className="p-6 border shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Mobile Money</h3>
                      <p className="text-muted-foreground text-sm">
                        Utilisez votre service de paiement mobile
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-sm mb-4">
                    <p className="font-semibold text-foreground mb-2">Numéros :</p>
                    <p className="text-muted-foreground">MTN : +229 XX XX XX XX</p>
                    <p className="text-muted-foreground">Moov : +229 XX XX XX XX</p>
                  </div>
                </Card>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowDonationMethods(false);
                    setShowProjectDetails(true);
                  }}
                >
                  Retour aux détails
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseModals}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
