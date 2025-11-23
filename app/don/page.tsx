"use client";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  CreditCard,
  Building,
  Smartphone,
  CheckCircle,
  Gift,
  HandHeart,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Phone,
} from "lucide-react";
import { ProjectService, type Project } from "@/src/services/project.service";
import { useEffect, useState } from "react";

export default function DonationPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showDonationMethods, setShowDonationMethods] = useState(false);
  const [showMobileOperator, setShowMobileOperator] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string>("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Numéros Mobile Money
  const mobileNumbers = {
    mtn: "0162393394",
    moov: "0195863319",
  };

  // Codes USSD pour chaque opérateur
  const ussdCodes = {
    mtn: `*880*1*${mobileNumbers.mtn}#`,
    moov: `*855*1*1*1*1*${mobileNumbers.moov}#`,
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await ProjectService.getPublishedProjects({
          limit: 10,
          featured: true,
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

  const handleShowDonationMethods = (project: Project) => {
    setSelectedProject(project);
    setShowDonationMethods(true);
  };

  const handleShowMobileOperator = () => {
    setShowDonationMethods(false);
    setShowMobileOperator(true);
  };

  const handleCloseModals = () => {
    setShowProjectDetails(false);
    setShowDonationMethods(false);
    setShowMobileOperator(false);
    setSelectedProject(null);
    setSelectedOperator("");
  };

  const handleOperatorSelect = (operator: string) => {
    setSelectedOperator(operator);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Code USSD copié !");
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      construction: Building,
      humanitarian: HandHeart,
      education: CheckCircle,
      health: Heart,
      spiritual: Gift,
      other: Heart,
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
      other: "Autre",
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: {
        label: "En planification",
        color: "bg-yellow-100 text-yellow-800",
      },
      in_progress: { label: "En cours", color: "bg-blue-100 text-blue-800" },
      completed: { label: "Terminé", color: "bg-green-100 text-green-800" },
      paused: { label: "En pause", color: "bg-gray-100 text-gray-800" },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.planning;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
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
            <h1 className="text-3xl md:text-6xl font-bold text-foreground mb-6 text-balance px-4">
              Faire un Don
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed px-4">
              Soutenez l'ONG Esprit et Vie et participez à l'avancement de la
              mission
            </p>
          </div>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-12 border-border shadow-xl mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Pourquoi Donner ?
              </h2>
              <p className="text-foreground leading-relaxed mb-6 text-base md:text-lg">
                Vos dons permettent à l'ONG Esprit & Vie de poursuivre sa
                mission spirituelle, humanitaire et sociale. Chaque
                contribution, quelle que soit sa taille, fait une différence
                dans la vie de nombreuses personnes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm md:text-base">
                    Mission Spirituelle
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Évangélisation et enseignement de la Parole
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm md:text-base">
                    Action Humanitaire
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Aide aux orphelins, aux couches défavorisées et aux
                    personnes démunies
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm md:text-base">
                    Développement Social
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Formation et insertion professionnelle
                  </p>
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
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Moyens de Don
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Online Donation */}
              <Card className="p-6 md:p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4 text-center">
                  Don en Ligne
                </h3>
                <p className="text-muted-foreground text-center mb-4 md:mb-6 text-sm md:text-base">
                  Faites votre don de manière sécurisée par carte bancaire
                </p>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-sm md:text-base py-2 md:py-3"
                  onClick={() => alert("Fonctionnalité à venir")}
                >
                  Donner en ligne
                </Button>
              </Card>

              {/* Bank Transfer */}
              <Card className="p-6 md:p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Building className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4 text-center">
                  Virement Bancaire
                </h3>
                <p className="text-muted-foreground text-center mb-4 md:mb-6 text-sm md:text-base">
                  Effectuez un virement directement sur notre compte
                </p>
                <div className="bg-muted p-3 md:p-4 rounded-lg text-xs md:text-sm mb-4">
                  <p className="font-semibold text-foreground mb-2">
                    Coordonnées bancaires :
                  </p>
                  <p className="text-muted-foreground">
                    Banque : [Nom de la banque]
                  </p>
                  <p className="text-muted-foreground">IBAN : [Numéro IBAN]</p>
                  <p className="text-muted-foreground">BIC : [Code BIC]</p>
                </div>
              </Card>

              {/* Mobile Money */}
              <Card className="p-6 md:p-8 border-border shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4 text-center">
                  Mobile Money
                </h3>
                <p className="text-muted-foreground text-center mb-4 md:mb-6 text-sm md:text-base">
                  Utilisez votre service de paiement mobile
                </p>
                <div className="bg-muted p-3 md:p-4 rounded-lg text-xs md:text-sm mb-4">
                  <p className="font-semibold text-foreground mb-2">
                    Numéros :
                  </p>
                  <p className="text-muted-foreground">
                    MTN : +229 {mobileNumbers.mtn}
                  </p>
                  <p className="text-muted-foreground">
                    Moov : +229 {mobileNumbers.moov}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Projets à Soutenir
              </h2>
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
                <Button onClick={() => window.location.reload()}>
                  Réessayer
                </Button>
              </Card>
            ) : projects.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600">
                  Aucun projet à afficher pour le moment.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {projects.map((project) => {
                  const CategoryIcon = getCategoryIcon(project.category);

                  return (
                    <Card
                      key={project._id}
                      className="p-4 md:p-6 lg:p-8 border-border shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 hover:scale-[1.01]"
                    >
                      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:block">
                          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                            <CategoryIcon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
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

                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 line-clamp-2">
                            {project.title}
                          </h3>

                          {project.short_description && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                              {project.short_description}
                            </p>
                          )}

                          <div className="mb-4 space-y-3">
                            {project.impact_points &&
                              project.impact_points.length > 0 && (
                                <div>
                                  <p className="font-semibold text-foreground mb-2 text-sm">
                                    Ce projet permettra :
                                  </p>
                                  <ul className="text-xs md:text-sm text-muted-foreground ml-4 space-y-1 list-disc">
                                    {project.impact_points
                                      .slice(0, 2)
                                      .map((point, index) => (
                                        <li
                                          key={index}
                                          className="line-clamp-2"
                                        >
                                          {point}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              )}

                            {project.steps && project.steps.length > 0 && (
                              <div>
                                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                                  Étapes du projet :
                                </p>
                                <div className="flex flex-wrap gap-1 md:gap-2 items-center">
                                  {project.steps
                                    .slice(0, 3)
                                    .map((step, index) => (
                                      <span
                                        key={index}
                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                          step.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : step.status === "in_progress"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                        }`}
                                      >
                                        {step.name}
                                      </span>
                                    ))}
                                  {project.steps.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                      +{project.steps.length - 3} autres
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Progrès de collecte */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs md:text-sm mb-1">
                              <span className="text-foreground font-medium">
                                Collecte :{" "}
                                {formatAmount(project.current_amount)} /{" "}
                                {formatAmount(project.goal_amount)}
                              </span>
                              <span className="text-primary font-bold">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 md:h-3 overflow-hidden">
                              <div
                                className="h-2 md:h-3 bg-primary transition-all duration-500"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>

                          {project.donation_examples &&
                            project.donation_examples.length > 0 && (
                              <div className="bg-muted p-2 md:p-3 rounded-md text-xs md:text-sm mb-4">
                                <p className="font-semibold text-foreground mb-1">
                                  Exemples d'impact :
                                </p>
                                <ul className="text-muted-foreground list-disc ml-4 space-y-1">
                                  {project.donation_examples
                                    .slice(0, 2)
                                    .map((example, index) => (
                                      <li key={index} className="line-clamp-2">
                                        {formatAmount(example.amount)} :{" "}
                                        {example.description}
                                      </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Montant libre — chaque contribution compte.
                                </p>
                              </div>
                            )}

                          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                            <Button
                              className="w-full sm:flex-1 bg-primary hover:bg-primary/90 text-sm py-2"
                              onClick={() => handleShowDonationMethods(project)}
                            >
                              Soutenir ce projet
                            </Button>
                            <button
                              type="button"
                              className="w-full sm:w-auto px-3 md:px-4 py-2 rounded-md border border-border text-xs md:text-sm text-foreground bg-transparent hover:bg-muted transition"
                              onClick={() => handleShowProjectDetails(project)}
                            >
                              En savoir plus
                            </button>
                          </div>

                          <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
                            Transparence : rapports trimestriels publiés et
                            possibilité de recevoir un bilan personnalisé sur
                            demande.
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

      {/* Bible Verses Section */}
      <section
        className="py-16 md:py-20"
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
              className="relative rounded-xl md:rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden border border-emerald-100"
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
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-emerald-100 to-emerald-50 flex items-center justify-center ring-1 ring-emerald-200">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-emerald-700" />
                </div>

                <div className="text-center">
                  <h3
                    id="versets-heading"
                    className="text-xl md:text-3xl font-extrabold text-emerald-900"
                  >
                    Versets bibliques
                  </h3>
                  <p className="text-xs md:text-sm text-emerald-700/80 mt-1">
                    Réflexions et méditations pour encourager le service, la
                    solidarité et le partage
                  </p>
                  <div className="mx-auto mt-2 md:mt-3 w-16 md:w-28 h-1 rounded-full bg-gradient-to-r from-emerald-300 to-emerald-600" />
                </div>
              </div>

              <div className="grid gap-4 md:gap-5 mt-6">
                {[
                  {
                    text: "Mais mon serviteur Caleb, parce qu'il a eu un esprit différent et qu'il m'a pleinement suivi, je le conduirai dans le pays où il est entré, et ses descendants en hériteront.",
                    ref: "Nombres 14:24",
                  },
                  {
                    text: "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie.",
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
                    text: "Donnez, et il vous sera donné: on versera dans votre sein une bonne mesure, serrée, secouée et qui déborde; car on vous mesurera avec la mesure dont vous vous serez servis.",
                    ref: "Luc 6:38",
                  },
                  {
                    text: "Car là où est ton trésor, là aussi sera ton cœur.",
                    ref: "Matthieu 6:21",
                  },
                  {
                    text: "Et n'oubliez pas la bienfaisance et la libéralité; car c'est à de tels sacrifices que Dieu prend plaisir.",
                    ref: "Hébreux 13:16",
                  },
                  {
                    text: "Ne vous laissez pas vaincre par le mal, mais vainquez le mal par le bien.",
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
                      className="relative rounded-lg md:rounded-xl p-4 md:p-6 bg-white/80 border border-emerald-50 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                        <div
                          className={`flex-shrink-0 rounded-md px-2 py-1 md:px-3 md:py-1 text-xs font-semibold uppercase tracking-widest bg-gradient-to-br ${badgeBg} ring-1 ring-inset ring-emerald-50 self-start`}
                        >
                          {v.ref}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm md:text-base leading-relaxed italic text-emerald-900/95 font-medium"
                            style={{ lineHeight: 1.6 }}
                          >
                            "{v.text}"
                          </p>

                          <div className="mt-2 md:mt-3 flex items-center gap-3">
                            <div className="text-xs text-emerald-700/80">
                              Méditation
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-6 md:mt-7 text-center text-xs text-emerald-700/80">
                <span>
                  Ces versets peuvent vous inspirer pour vos dons et votre
                  service. Merci pour votre générosité.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal des détails du projet */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold line-clamp-2 pr-4">
                {selectedProject.title}
              </h2>
              <Button variant="ghost" size="sm" onClick={handleCloseModals}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* En-tête du projet */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium">
                  {getCategoryLabel(selectedProject.category)}
                </span>
                {getStatusBadge(selectedProject.status)}
                {selectedProject.is_featured && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs md:text-sm font-medium">
                    Projet phare
                  </span>
                )}
              </div>

              {/* Description complète */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Description du projet
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {selectedProject.description}
                </p>
              </div>

              {/* Progrès de collecte */}
              <Card className="p-3 md:p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Avancement de la collecte
                </h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      Collecté : {formatAmount(selectedProject.current_amount)}
                    </span>
                    <span className="text-primary font-bold">
                      {selectedProject.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
                    <div
                      className="h-2 md:h-3 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mt-1 text-right">
                    Objectif : {formatAmount(selectedProject.goal_amount)}
                  </p>
                </div>
              </Card>

              {/* Points d'impact */}
              {selectedProject.impact_points &&
                selectedProject.impact_points.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Points d'impact
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.impact_points.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm md:text-base">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Bouton de soutien */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setShowProjectDetails(false);
                    setShowDonationMethods(true);
                  }}
                >
                  Soutenir ce projet
                </Button>
                <Button variant="outline" onClick={handleCloseModals}>
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
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 flex justify-between items-center">
              <div className="min-w-0 pr-4">
                <h2 className="text-xl md:text-2xl font-bold line-clamp-2">
                  Soutenir {selectedProject.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  Choisissez votre moyen de don
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseModals}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 md:p-6">
              {/* Aperçu du projet */}
              <Card className="p-3 md:p-4 mb-4 md:mb-6 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const IconComponent = getCategoryIcon(
                        selectedProject.category
                      );
                      return (
                        <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      );
                    })()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Progression : {selectedProject.progress}% •{" "}
                      {formatAmount(selectedProject.current_amount)} /{" "}
                      {formatAmount(selectedProject.goal_amount)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Section des moyens de don */}
              <div className="space-y-4 md:space-y-6">
                {/* Online Donation */}
                <Card className="p-4 md:p-6 border shadow-sm">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-foreground">
                        Don en Ligne
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm line-clamp-2">
                        Faites votre don de manière sécurisée par carte bancaire
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-sm md:text-base py-2">
                    Donner en ligne
                  </Button>
                </Card>

                {/* Bank Transfer */}
                <Card className="p-4 md:p-6 border shadow-sm">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-foreground">
                        Virement Bancaire
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm line-clamp-2">
                        Effectuez un virement directement sur notre compte
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-3 md:p-4 rounded-lg text-xs md:text-sm mb-3 md:mb-4">
                    <p className="font-semibold text-foreground mb-2">
                      Coordonnées bancaires :
                    </p>
                    <p className="text-muted-foreground">
                      Banque : [Nom de la banque]
                    </p>
                    <p className="text-muted-foreground">
                      IBAN : [Numéro IBAN]
                    </p>
                    <p className="text-muted-foreground">BIC : [Code BIC]</p>
                  </div>
                </Card>

                {/* Mobile Money */}
                <Card className="p-4 md:p-6 border shadow-sm">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base md:text-lg font-bold text-foreground">
                        Mobile Money
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm line-clamp-2">
                        Utilisez votre service de paiement mobile
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted p-3 md:p-4 rounded-lg text-xs md:text-sm mb-3 md:mb-4">
                    <p className="font-semibold text-foreground mb-2">
                      Numéros :
                    </p>
                    <p className="text-muted-foreground">
                      MTN : +229 {mobileNumbers.mtn}
                    </p>
                    <p className="text-muted-foreground">
                      Moov : +229 {mobileNumbers.moov}
                    </p>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-sm md:text-base py-2"
                    onClick={handleShowMobileOperator}
                  >
                    Choisir l'opérateur
                  </Button>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 md:pt-6">
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
                <Button variant="outline" onClick={handleCloseModals}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de sélection d'opérateur mobile */}
      {showMobileOperator && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 flex justify-between items-center">
              <div className="min-w-0 pr-4">
                <h2 className="text-xl md:text-2xl font-bold">
                  Choisir votre opérateur
                </h2>
                <p className="text-gray-600 text-sm">
                  Sélectionnez votre opérateur mobile
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleCloseModals}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 md:p-6">
              {!selectedOperator ? (
                <div className="space-y-4">
                  <Card
                    className="p-4 border-2 border-orange-500 cursor-pointer hover:bg-orange-50 transition-colors"
                    onClick={() => handleOperatorSelect("mtn")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          MTN Mobile Money
                        </h3>
                        <p className="text-sm text-gray-600">
                          Utilisez votre compte MTN Money
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className="p-4 border-2 border-blue-500 cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => handleOperatorSelect("moov")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Moov Money
                        </h3>
                        <p className="text-sm text-gray-600">
                          Utilisez votre compte Moov Money
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedOperator === "mtn"
                        ? "MTN Mobile Money"
                        : "Moov Money"}
                    </h3>
                    <p className="text-gray-600">
                      Suivez les instructions ci-dessous
                    </p>
                  </div>

                  <Card className="p-4 bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Code USSD :
                        </h4>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <code className="text-lg font-mono text-gray-900">
                            {selectedOperator === "mtn"
                              ? ussdCodes.mtn
                              : ussdCodes.moov}
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyToClipboard(
                                selectedOperator === "mtn"
                                  ? ussdCodes.mtn
                                  : ussdCodes.moov
                              )
                            }
                          >
                            <Copy className="w-4 h-4 mr-1" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Instructions :
                        </h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                          <li>Composez le code USSD ci-dessus</li>
                          <li>Suivez les instructions à l'écran</li>
                          <li>Entrez le montant de votre don</li>
                          <li>Confirmez la transaction</li>
                          <li>Gardez le reçu de transaction</li>
                        </ol>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Important :</strong> Utilisez le code USSD
                          pour un transfert direct. Vous pouvez aussi faire un
                          transfert manuel vers le numéro +229{" "}
                          {selectedOperator === "mtn"
                            ? mobileNumbers.mtn
                            : mobileNumbers.moov}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedOperator("")}
                    >
                      Changer d'opérateur
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={handleCloseModals}
                    >
                      Terminé
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowMobileOperator(false);
                    setShowDonationMethods(true);
                  }}
                >
                  Retour
                </Button>
                <Button variant="outline" onClick={handleCloseModals}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
