// app/admin/donations/page.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, DollarSign, Calendar, CreditCard, Pencil, Trash2, Eye } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { DonationService } from "@/src/services/donation.service"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useDonations } from "@/src/hooks/useDonations";

export default function DonationsPage() {
  const router = useRouter()
 const { data: donations = [], isLoading, error, refetch } = useDonations();

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce don ?")) {
      try {
        await DonationService.deleteDonation(id)
        toast({
          title: "Succès",
          description: "Le don a été supprimé avec succès",
          variant: "default",
        })
        refetch()
      } catch (error) {
        toast({
          title: "ErrUSD",
          description: "Une errUSD est survenue lors de la suppression du don",
          variant: "destructive",
        })
      }
    }
  }

  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount), 0)
  const completedDonations = donations.filter((d) => d.payment_status === "completed")
  const completedAmount = completedDonations.reduce((sum, d) => sum + Number(d.amount), 0)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dons</h1>
          <p className="text-gray-600 mt-2">Gérez les dons de l'église</p>
        </div>
        <Button asChild>
          <Link href="/admin/donations/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau don
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des dons</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('fr-FR', { 
                  style: 'currency', 
                  currency: 'USD' 
                }).format(totalAmount)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dons complétés</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat('fr-FR', { 
                  style: 'currency', 
                  currency: 'USD' 
                }).format(completedAmount)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total des dons</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donations.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dons récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {donations.map((donation) => (
                <div key={donation._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {new Intl.NumberFormat('fr-FR', { 
                          style: 'currency', 
                          currency: donation.currency || 'USD' 
                        }).format(donation.amount)}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {donation.createdAt ? format(new Date(donation.createdAt), "PP", { locale: fr }) : 'Date inconnue'}
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {donation.donation_type}
                        </Badge>
                        {donation.payment_method && (
                          <Badge variant="outline" className="capitalize">
                            {donation.payment_method}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        donation.payment_status === "completed"
                          ? "default"
                          : donation.payment_status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {donation.payment_status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/donations/${donation._id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => donation._id && handleDelete(donation._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {donations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucun don trouvé
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}