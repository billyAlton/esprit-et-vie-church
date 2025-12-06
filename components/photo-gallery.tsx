// components/photo-gallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Photo {
  _id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  width: number;
  height: number;
  exif?: {
    camera?: string;
    lens?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
    focalLength?: string;
  };
  uploadedAt: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const openPhoto = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    setShowInfo(false);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const handleDownload = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `${photo.title || 'photo'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Grille des photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo._id}
            className="group relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openPhoto(photo, index)}
          >
            <div className="aspect-square relative">
              <Image
                src={photo.thumbnailUrl || photo.url || "/placeholder.svg"}
                alt={photo.title || `Photo ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Overlay au hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 p-3 bg-black/70 rounded-full">
                  <ZoomIn className="h-5 w-5 text-white" />
                  <span className="text-white text-sm font-medium">Voir</span>
                </div>
              </div>
            </div>
            
            {/* Titre de la photo */}
            {photo.title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-white text-sm font-medium truncate">{photo.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de visualisation */}
      <Dialog open={!!selectedPhoto} onOpenChange={closePhoto}>
        <DialogContent className="max-w-7xl h-[90vh] p-0 overflow-hidden">
          {selectedPhoto && (
            <div className="flex h-full">
              {/* Photo principale */}
              <div className="flex-1 relative bg-black flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedPhoto.url || "/placeholder.svg"}
                    alt={selectedPhoto.title || "Photo"}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>

                {/* Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Compteur */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentIndex + 1} / {photos.length}
                </div>

                {/* Actions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 hover:bg-black/70 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(selectedPhoto);
                    }}
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 hover:bg-black/70 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInfo(!showInfo);
                    }}
                  >
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Panel d'informations */}
              {showInfo && (
                <div className="w-96 border-l bg-background overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{selectedPhoto.title || "Sans titre"}</h3>
                        {selectedPhoto.description && (
                          <p className="text-muted-foreground">{selectedPhoto.description}</p>
                        )}
                      </div>

                      {/* Métadonnées EXIF */}
                      {selectedPhoto.exif && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-semibold mb-3">Informations techniques</h4>
                            <div className="grid gap-2 text-sm">
                              {selectedPhoto.exif.camera && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Appareil</span>
                                  <span className="font-medium">{selectedPhoto.exif.camera}</span>
                                </div>
                              )}
                              {selectedPhoto.exif.lens && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Objectif</span>
                                  <span className="font-medium">{selectedPhoto.exif.lens}</span>
                                </div>
                              )}
                              {selectedPhoto.exif.aperture && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Ouverture</span>
                                  <span className="font-medium">ƒ/{selectedPhoto.exif.aperture}</span>
                                </div>
                              )}
                              {selectedPhoto.exif.shutterSpeed && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Vitesse</span>
                                  <span className="font-medium">{selectedPhoto.exif.shutterSpeed}</span>
                                </div>
                              )}
                              {selectedPhoto.exif.iso && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">ISO</span>
                                  <span className="font-medium">{selectedPhoto.exif.iso}</span>
                                </div>
                              )}
                              {selectedPhoto.exif.focalLength && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Focale</span>
                                  <span className="font-medium">{selectedPhoto.exif.focalLength}mm</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Informations de base */}
                      <Separator />
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dimensions</span>
                          <span className="font-medium">
                            {selectedPhoto.width} × {selectedPhoto.height}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Uploadé le</span>
                          <span className="font-medium">
                            {new Date(selectedPhoto.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}