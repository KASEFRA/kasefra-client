"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Edit,
  Save,
  X,
  Calendar,
  Building,
  CreditCard,
  Tag,
  FileText,
  Trash2,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { mockTransactions, mockAccounts } from "@/lib/mock-data"

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Bills & Utilities",
  "Healthcare",
  "Entertainment",
  "Travel",
  "Education",
  "Groceries",
  "Gas",
  "Income",
  "Transfer",
  "Other"
]

export default function TransactionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const transactionId = params.id as string

  const [transaction, setTransaction] = useState(mockTransactions.find(t => t.id === transactionId))
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    description: "",
    category: "",
    amount: "",
    notes: ""
  })

  useEffect(() => {
    if (transaction) {
      setEditForm({
        description: transaction.description,
        category: transaction.category,
        amount: transaction.amount.toString(),
        notes: transaction.notes || ""
      })
    }
  }, [transaction])

  if (!transaction) {
    return (
      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] px-3 sm:px-6">
        <div className="text-center max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Transaction Not Found</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">The transaction you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link href="/dashboard/transactions">
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Back to Transactions</span>
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const account = mockAccounts.find(acc => acc.id === transaction.accountId)

  const handleSave = () => {
    // Update transaction
    const updatedTransaction = {
      ...transaction,
      description: editForm.description,
      category: editForm.category,
      amount: parseFloat(editForm.amount),
      notes: editForm.notes
    }

    setTransaction(updatedTransaction)
    setIsEditing(false)

    // In a real app, this would make an API call
    console.log("Updated transaction:", updatedTransaction)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      // In a real app, this would make an API call
      console.log("Deleted transaction:", transactionId)
      router.push("/dashboard/transactions")
    }
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'expense': return 'bg-red-100 text-red-800 hover:bg-red-100'
      case 'transfer': return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:gap-4">
          <Button variant="outline" size="sm" asChild className="w-fit">
            <Link href="/dashboard/transactions">
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Back</span>
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{transaction.description}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Transaction Details</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="flex-1 sm:flex-none">
                <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Edit</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 flex-1 sm:flex-none">
                <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Delete</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none">
                <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Cancel</span>
              </Button>
              <Button size="sm" onClick={handleSave} className="flex-1 sm:flex-none">
                <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Save</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Transaction Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
            <CardTitle className="text-base sm:text-lg">Transaction Details</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {isEditing ? "Edit transaction information" : "Complete transaction information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6 pb-3 sm:pb-6">
            {!isEditing ? (
              <>
                {/* Read-only view */}
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Description</Label>
                    <p className="text-sm sm:text-base lg:text-lg font-medium">{transaction.description}</p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Amount</Label>
                    <p className={`text-xl sm:text-2xl font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount.toLocaleString('en-AE', {
                        style: 'currency',
                        currency: transaction.currency
                      })}
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Category</Label>
                    <Badge className={getTransactionTypeColor(transaction.type)} variant="secondary">
                      {transaction.category}
                    </Badge>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Type</Label>
                    <Badge variant="outline" className="text-xs sm:text-sm">{transaction.type}</Badge>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Merchant</Label>
                    <p className="text-sm sm:text-base font-medium">{transaction.merchant}</p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Date</Label>
                    <p className="text-sm sm:text-base font-medium">{transaction.date}</p>
                  </div>
                </div>

                {transaction.notes && (
                  <div className="space-y-1 sm:space-y-2">
                    <Label className="text-xs sm:text-sm text-muted-foreground">Notes</Label>
                    <p className="p-2 sm:p-3 bg-muted rounded-lg text-xs sm:text-sm">{transaction.notes}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Edit form */}
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
                    <Input
                      id="description"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="text-sm h-8 sm:h-9"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="amount" className="text-xs sm:text-sm">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      className="text-sm h-8 sm:h-9"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2 col-span-1 sm:col-span-2">
                    <Label htmlFor="category" className="text-xs sm:text-sm">Category</Label>
                    <Select
                      value={editForm.category}
                      onValueChange={(value) => setEditForm({ ...editForm, category: value })}
                    >
                      <SelectTrigger className="text-sm h-8 sm:h-9">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category} className="text-sm">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="notes" className="text-xs sm:text-sm">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add notes about this transaction..."
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    className="text-sm min-h-[80px] sm:min-h-[100px]"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Transaction Metadata */}
        <div className="space-y-4 sm:space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Building className="h-4 w-4 sm:h-5 sm:w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
              {account && (
                <>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center text-base sm:text-lg">
                      {account.type === 'checking' && '💳'}
                      {account.type === 'savings' && '🏦'}
                      {account.type === 'credit' && '💰'}
                      {account.type === 'investment' && '📈'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-medium truncate">{account.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{account.bank}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Account Type:</span>
                      <Badge variant="outline" className="text-xs">{account.type}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Account Number:</span>
                      <span className="font-mono text-xs truncate ml-2">{account.accountNumber}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Transaction Metadata */}
          <Card>
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-xs sm:text-sm px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-[10px] sm:text-xs truncate ml-2">{transaction.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Currency:</span>
                <span>{transaction.currency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="default" className="text-xs">Completed</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Created:</span>
                <span>{transaction.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Tag className="h-4 w-4 sm:h-5 sm:w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-3 sm:px-6 pb-3 sm:pb-6">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9">
                <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                View Similar Transactions
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9">
                <CreditCard className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                View Account History
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm h-8 sm:h-9">
                <AlertTriangle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}