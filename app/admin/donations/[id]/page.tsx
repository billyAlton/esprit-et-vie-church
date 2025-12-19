// app/admin/donations/[id]/page.tsx

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Calendar, DollarSign, CreditCard, User, FileText } from "lucide-react"
import { DonationService } from "@/src/services/donation.service"

export default async function DonationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const donation = await DonationService.getDonationById(id)

  if (!donation) {
    notFound()
  }

  // Formatage du montant
  const formattedAmount = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: donation.currency || 'EUR'
  }).format(donation.amount)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Détails du don</h1>
          <Badge className="mt-2" variant={donation.payment_status === "completed" ? "default" : "secondary"}>
            {donation.payment_status}
          </Badge>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/donations">Retour aux dons</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations du don</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Montant</p>
                <p className="text-lg font-semibold">{formattedAmount}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Type de don</p>
                <p className="capitalize">{donation.donation_type}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Méthode de paiement</p>
                <p className="capitalize">{donation.payment_method}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {donation.createdAt ? format(new Date(donation.createdAt), "PPpp") : 'N/A'}
                </p>
              </div>
              {donation.notes && (
                <div className="space-y-2 md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p className="whitespace-pre-line">{donation.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations du donateur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{donation.donor_name || 'Anonyme'}</p>
                  {donation.donor_email && (
                    <p className="text-sm text-gray-500">{donation.donor_email}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}