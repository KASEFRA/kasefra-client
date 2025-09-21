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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Transaction Not Found</h2>
          <p className="text-muted-foreground mb-4">The transaction you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild>
            <Link href="/dashboard/transactions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Transactions
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
    <div className="space-y-6 px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/transactions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{transaction.description}</h1>
            <p className="text-muted-foreground">Transaction Details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transaction Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              {isEditing ? "Edit transaction information" : "Complete transaction information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isEditing ? (
              <>
                {/* Read-only view */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Description</Label>
                    <p className="text-lg font-medium">{transaction.description}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Amount</Label>
                    <p className={`text-2xl font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      {transaction.amount.toLocaleString('en-AE', {
                        style: 'currency',
                        currency: transaction.currency
                      })}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Category</Label>
                    <Badge className={getTransactionTypeColor(transaction.type)}>
                      {transaction.category}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Type</Label>
                    <Badge variant="outline">{transaction.type}</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Merchant</Label>
                    <p className="font-medium">{transaction.merchant}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Date</Label>
                    <p className="font-medium">{transaction.date}</p>
                  </div>
                </div>
                
                {transaction.notes && (
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Notes</Label>
                    <p className="p-3 bg-muted rounded-lg">{transaction.notes}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Edit form */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={editForm.category}
                      onValueChange={(value) => setEditForm({...editForm, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add notes about this transaction..."
                    value={editForm.notes}
                    onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Transaction Metadata */}
        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {account && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-lg">
                      {account.type === 'checking' && '💳'}
                      {account.type === 'savings' && '🏦'}
                      {account.type === 'credit' && '💰'}
                      {account.type === 'investment' && '📈'}
                    </div>
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.bank}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Type:</span>
                      <Badge variant="outline">{account.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Number:</span>
                      <span>{account.accountNumber}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Transaction Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-xs">{transaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency:</span>
                <span>{transaction.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="default">Completed</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span>{transaction.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                View Similar Transactions
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                View Account History
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}