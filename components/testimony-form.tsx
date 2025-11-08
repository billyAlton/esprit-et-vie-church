// components/testimony-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await TestimonyService.submitTestimony(formData);
      setSubmitted(true);
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