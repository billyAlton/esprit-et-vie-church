// components/testimony-form.tsx
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, X, Upload, Image as ImageIcon } from "lucide-react";
import { TestimonyService, TestimonyFormData } from "@/src/services/testimony.service";

const CATEGORIES = [
  { value: "guerison", label: "Guérison" },
  { value: "famille", label: "Famille" },
  { value: "finances", label: "Finances" },
  { value: "delivrance", label: "Délivrance" },
  { value: "miracle", label: "Miracle" },
  { value: "transformation", label: "Transformation" },
  { value: "autre", label: "Autre" }
];

// Types pour les images
interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface TestimonyFormProps {
  onSuccess?: () => void;
}

export function TestimonyForm({ onSuccess }: TestimonyFormProps) {
  const [formData, setFormData] = useState<TestimonyFormData>({
    title: "",
    content: "",
    author_name: "",
    author_email: "",
    author_location: "",
    category: "autre"
  });
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Configuration des images
  const MAX_IMAGES = 3;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validation du nombre d'images
      if (images.length + newImages.length >= MAX_IMAGES) {
        setError(`Maximum ${MAX_IMAGES} images autorisées`);
        break;
      }

      // Validation du type de fichier
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError("Seuls les fichiers JPEG, PNG et WebP sont acceptés");
        continue;
      }

      // Validation de la taille
      if (file.size > MAX_FILE_SIZE) {
        setError(`La taille maximale par image est de ${MAX_FILE_SIZE / 1024 / 1024}MB`);
        continue;
      }

      const imageFile: ImageFile = {
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9)
      };

      newImages.push(imageFile);
    }

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
      setError(null);
    }

    // Reset le input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Créer FormData pour supporter les fichiers
      const formDataToSend = new FormData();
      
      // Ajouter les champs texte
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Ajouter les images
      images.forEach((image, index) => {
        formDataToSend.append(`images`, image.file);
      });

      await TestimonyService.submitTestimony(formDataToSend);
      setSubmitted(true);
      
      // Nettoyer les URLs des prévisualisations
      images.forEach(image => URL.revokeObjectURL(image.preview));
      
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      console.error("Erreur soumission témoignage:", err);
      setError(err.response?.data?.message || "Erreur lors de la soumission du témoignage");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof TestimonyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Merci pour votre témoignage !</h3>
        <p className="text-muted-foreground">
          Votre témoignage a été soumis avec succès. Il sera examiné par notre équipe avant publication.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <div className="flex-1">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Titre du témoignage *</Label>
        <Input
          id="title"
          required
          placeholder="Ex: Ma guérison miraculeuse"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Votre témoignage *</Label>
        <Textarea
          id="content"
          required
          rows={5}
          placeholder="Racontez votre histoire en détail..."
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Décrivez ce que Dieu a fait dans votre vie (10-2000 caractères)
        </p>
      </div>

      {/* Section Images */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Images (optionnel)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Glissez-déposez vos images ou cliquez pour parcourir
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WebP jusqu'à 5MB. Maximum {MAX_IMAGES} images.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Choisir des images
              </Button>
            </div>
          </div>
        </div>

        {/* Prévisualisation des images */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author_name">Votre nom *</Label>
          <Input
            id="author_name"
            required
            placeholder="Votre nom complet"
            value={formData.author_name}
            onChange={(e) => handleChange('author_name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author_email">Votre email *</Label>
          <Input
            id="author_email"
            type="email"
            required
            placeholder="votre@email.com"
            value={formData.author_email}
            onChange={(e) => handleChange('author_email', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author_location">Votre localisation</Label>
          <Input
            id="author_location"
            placeholder="Ville, pays"
            value={formData.author_location}
            onChange={(e) => handleChange('author_location', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie *</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Note importante :</strong> Votre témoignage sera examiné par notre équipe 
          avant publication. Votre email ne sera pas affiché publiquement.
          Les images doivent respecter nos conditions d'utilisation.
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Soumission...
            </>
          ) : (
            "Soumettre mon témoignage"
          )}
        </Button>
      </div>
    </form>
  );
}