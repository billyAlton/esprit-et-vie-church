// components/share-album.tsx
"use client";

import { useState } from "react";
import { Share2, Check, Copy, Facebook, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface ShareAlbumProps {
  album: {
    _id: string;
    title: string;
    description: string;
  };
}

export default function ShareAlbum({ album }: ShareAlbumProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/galerie/albums/${album._id}`
    : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: "Le lien de l'album a été copié dans le presse-papier.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
    }
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `Découvrez l'album "${album.title}"`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareByEmail = () => {
    const subject = `Album photo : ${album.title}`;
    const body = `Découvrez cet album photo : ${album.description}\n\n${url}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleCopyLink}>
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copié !" : "Copier le lien"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnFacebook}>
          <Facebook className="mr-2 h-4 w-4" />
          Partager sur Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnTwitter}>
          <Twitter className="mr-2 h-4 w-4" />
          Partager sur Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareByEmail}>
          <Mail className="mr-2 h-4 w-4" />
          Partager par email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}