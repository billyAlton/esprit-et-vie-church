"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Target,
  DollarSign,
  TrendingUp,
  Building,
  HandHeart,
  BookOpen,
  Heart,
  Gift,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  X,
  Users,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ProjectService, type Project } from "@/src/services/project.service";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const projectId = params.id as string;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await ProjectService.getProjectById(projectId);
        setProject(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du projet");
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      construction: Building,
      humanitarian: HandHeart,
      education: BookOpen,
      health: Heart,
      spiritual: Gift,
      other: Building,
    };
    return icons[category as keyof typeof icons] || Building;
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: {
        label: "En planification",
        variant: "secondary" as const,
        color: "bg-yellow-100 text-yellow-800",
      },
      in_progress: {
        label: "En cours",
        variant: "default" as const,
        color: "bg-blue-100 text-blue-800",
      },
      completed: {
        label: "Terminé",
        variant: "outline" as const,
        color: "bg-green-100 text-green-800",
      },
      paused: {
        label: "En pause",
        variant: "secondary" as const,
        color: "bg-gray-100 text-gray-800",
      },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.planning;
    return (
      <Badge
        variant={config.variant}
        className={`${config.color} break-words max-w-full`}
      >
        {config.label}
      </Badge>
    );
  };

  const getStepStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      in_progress: TrendingUp,
      completed: CheckCircle,
    };
    const IconComponent = icons[status as keyof typeof icons] || Clock;
    return <IconComponent className="h-4 w-4" />;
  };

  const getStepStatusColor = (status: string) => {
    const colors = {
      pending: "text-gray-500 bg-gray-100",
      in_progress: "text-blue-600 bg-blue-100",
      completed: "text-green-600 bg-green-100",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(amount);
  };

  const calculateProgress = (current: number, goal: number): number => {
    if (goal === 0) return 0;
    return Math.min(100, Math.round((current / goal) * 100));
  };

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2 break-words max-w-full text-center">
              {error ? "Erreur" : "Projet non trouvé"}
            </h2>
            <p className="text-gray-600 mb-6 text-center break-words max-w-full">
              {error ||
                "Le projet demandé n'existe pas ou vous n'y avez pas accès."}
            </p>
            <Button onClick={() => router.push("/admin/projects")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(project.category);
  const progress = calculateProgress(
    project.current_amount,
    project.goal_amount
  );

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/projets")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words whitespace-normal max-w-full">
              {project.title}
            </h1>
            <p className="text-gray-600 mt-1 break-words whitespace-normal">
              Détails du projet
            </p>
            <div className="mt-3">
              <Button
                onClick={() => router.push(`/admin/projets/${projectId}/edit`)}
                size="sm"
              >
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          {/* Carte des informations principales */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="min-w-0">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-3 break-words whitespace-norma max-w-full min-w-0">
                    <CategoryIcon className="h-8 w-8 text-blue-600 flex-shrink-0 break-words whitespace-norma" />
                    <span className="break-words whitespace-normal min-w-0 max-w-full">
                      {project.title}
                    </span>
                  </CardTitle>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium break-words max-w-full">
                      <CategoryIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                      {getCategoryLabel(project.category)}
                    </span>
                    {getStatusBadge(project.status)}
                    {project.is_featured && (
                      <Badge
                        variant="default"
                        className="bg-yellow-100 text-yellow-800 break-words max-w-full"
                      >
                        Projet phare
                      </Badge>
                    )}
                    <Badge
                      variant={project.is_published ? "default" : "secondary"}
                      className="break-words max-w-full"
                    >
                      {project.is_published ? "Publié" : "Brouillon"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description courte */}
              {project.short_description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 break-words">
                    Description courte
                  </h3>
                  <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap min-w-0">
                    {project.short_description}
                  </p>
                </div>
              )}

              {/* Description complète avec scroll */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 break-words">
                  Description complète
                </h3>
                <div className="relative">
                  <div
                    className="prose max-w-none overflow-y-auto pr-4 break-words min-w-0"
                    style={{ maxHeight: "400px" }}
                  >
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words min-w-0">
                      {project.description}
                    </p>
                  </div>
                  {/* Ombre dégradée pour indiquer qu'il y a plus de contenu */}
                  {project.description && project.description.length > 1500 && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  )}
                </div>
              </div>

              {/* Image du projet */}
              {project.image_url && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 break-words">
                    Image du projet
                  </h3>
                  <div className="rounded-lg overflow-hidden border">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Points d'impact */}
              {project.impact_points && project.impact_points.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 break-words">
                    Points d'impact
                  </h3>
                  <ul className="space-y-2">
                    {project.impact_points.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 min-w-0"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 break-words whitespace-normal min-w-0">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Étapes du projet avec scroll si besoin */}
              {project.steps && project.steps.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 break-words">
                    Étapes du projet
                  </h3>
                  <div
                    className="space-y-3 overflow-y-auto pr-2"
                    style={{
                      maxHeight: project.steps.length > 5 ? "300px" : "none",
                    }}
                  >
                    {project.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg min-w-0"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className={`p-2 rounded-full ${getStepStatusColor(
                              step.status
                            )} flex-shrink-0`}
                          >
                            {getStepStatusIcon(step.status)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 break-words overflow-hidden">
                              {step.name}
                            </p>
                            <p className="text-sm text-gray-500 break-words">
                              Étape {step.order} •
                              <span className="capitalize ml-1">
                                {step.status === "pending" && "En attente"}
                                {step.status === "in_progress" && "En cours"}
                                {step.status === "completed" && "Terminé"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exemples de dons avec scroll si besoin */}
              {project.donation_examples &&
                project.donation_examples.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 break-words">
                      Exemples d'impact des dons
                    </h3>
                    <div
                      className="grid gap-3 md:grid-cols-2 overflow-y-auto pr-2"
                      style={{
                        maxHeight:
                          project.donation_examples.length > 4
                            ? "300px"
                            : "none",
                      }}
                    >
                      {project.donation_examples.map((example, index) => (
                        <Card
                          key={index}
                          className="border-l-4 border-l-blue-500 break-words"
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2 min-w-0">
                              <span className="text-lg font-bold text-blue-600 break-words overflow-hidden">
                                {formatAmount(example.amount)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm break-words">
                              {example.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 break-words">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="break-words max-w-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Progression financière */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 break-words">
                <TrendingUp className="h-5 w-5 flex-shrink-0" />
                <span className="break-words">Progression financière</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2 break-words">
                  {progress}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      progress >= 80
                        ? "bg-green-500"
                        : progress >= 50
                        ? "bg-blue-500"
                        : progress >= 25
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 break-words">
                    {formatAmount(project.goal_amount)}
                  </p>
                  <p className="text-gray-600">Objectif</p>
                </div>
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 break-words">
                    {formatAmount(project.current_amount)}
                  </p>
                  <p className="text-gray-600">Collecté</p>
                </div>
              </div>

              {project.goal_amount > 0 && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 break-words">
                    Il reste{" "}
                    {formatAmount(project.goal_amount - project.current_amount)}{" "}
                    à collecter
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations du projet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 break-words">
                <Eye className="h-5 w-5 flex-shrink-0" />
                <span className="break-words">Informations du projet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between min-w-0">
                <span className="text-sm text-gray-600 break-words">
                  Statut
                </span>
                <div className="min-w-0">{getStatusBadge(project.status)}</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 break-words">
                  Projet phare
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium break-words ${
                    project.is_featured
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {project.is_featured ? "Oui" : "Non"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 break-words">
                  Publication
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium break-words ${
                    project.is_published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.is_published ? "Publié" : "Brouillon"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 break-words">
                  Ordre d'affichage
                </span>
                <span className="font-medium break-words">{project.order}</span>
              </div>

              {project.steps && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 break-words">
                    Étapes définies
                  </span>
                  <span className="font-medium break-words">
                    {project.steps.length}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Métadonnées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 break-words">
                <Calendar className="h-5 w-5 flex-shrink-0" />
                <span className="break-words">Métadonnées</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.createdAt && (
                <div className="flex items-center justify-between min-w-0">
                  <span className="text-sm text-gray-600 break-words">
                    Créé le
                  </span>
                  <span className="font-medium text-sm text-right break-words">
                    {format(new Date(project.createdAt), "PPP", { locale: fr })}
                  </span>
                </div>
              )}

              {project.updatedAt && (
                <div className="flex items-center justify-between min-w-0">
                  <span className="text-sm text-gray-600 break-words">
                    Modifié le
                  </span>
                  <span className="font-medium text-sm text-right break-words">
                    {format(new Date(project.updatedAt), "PPP", { locale: fr })}
                  </span>
                </div>
              )}

              {project.published_at && project.is_published && (
                <div className="flex items-center justify-between min-w-0">
                  <span className="text-sm text-gray-600 break-words">
                    Publié le
                  </span>
                  <span className="font-medium text-sm text-right break-words">
                    {format(new Date(project.published_at), "PPP", {
                      locale: fr,
                    })}
                  </span>
                </div>
              )}

              {project.start_date && (
                <div className="flex items-center justify-between min-w-0">
                  <span className="text-sm text-gray-600 break-words">
                    Date de début
                  </span>
                  <span className="font-medium text-sm text-right break-words">
                    {format(new Date(project.start_date), "PPP", {
                      locale: fr,
                    })}
                  </span>
                </div>
              )}

              {project.estimated_end_date && (
                <div className="flex items-center justify-between min-w-0">
                  <span className="text-sm text-gray-600 break-words">
                    Date de fin estimée
                  </span>
                  <span className="font-medium text-sm text-right break-words">
                    {format(new Date(project.estimated_end_date), "PPP", {
                      locale: fr,
                    })}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg break-words">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full break-words"
                onClick={() => router.push(`/admin/projets/${projectId}/edit`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Modifier le projet
              </Button>

              <Button
                variant="outline"
                className="w-full break-words"
                onClick={() => router.push("/admin/projets")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la liste
              </Button>
            </CardContent>
          </Card>

          {/* Statistiques rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg break-words">
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center min-w-0">
                <span className="text-sm text-gray-600 break-words">
                  Points d'impact
                </span>
                <span className="font-semibold break-words">
                  {project.impact_points?.length || 0}
                </span>
              </div>

              <div className="flex justify-between items-center min-w-0">
                <span className="text-sm text-gray-600 break-words">
                  Exemples de dons
                </span>
                <span className="font-semibold break-words">
                  {project.donation_examples?.length || 0}
                </span>
              </div>

              <div className="flex justify-between items-center min-w-0">
                <span className="text-sm text-gray-600 break-words">Tags</span>
                <span className="font-semibold break-words">
                  {project.tags?.length || 0}
                </span>
              </div>

              <div className="flex justify-between items-center min-w-0">
                <span className="text-sm text-gray-600 break-words">
                  Taux de progression
                </span>
                <span className="font-semibold break-words">{progress}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Composant Skeleton pour le chargement
function ProjectDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-24" />
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Skeleton Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-7 w-3/4" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-16 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-28 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skeleton Colonne latérale */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
