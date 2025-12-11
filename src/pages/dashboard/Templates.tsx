import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Search,
  FileText,
  Edit,
  Trash2,
  Copy,
  Eye,
  MoreHorizontal,
  MessageSquare,
  Tag,
  Globe,
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface Template {
  id: string
  name: string
  description: string | null
  category: string | null
  content: string
  variables: string[]
  media_url: string | null
  media_type: string | null
  language: string
  status: 'draft' | 'active' | 'archived'
  created_at: string
  updated_at: string
}

interface TemplateFormData {
  name: string
  description: string
  category: string
  content: string
  variables: string[]
  language: string
  status: string
}

const TEMPLATE_CATEGORIES = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'transactional', label: 'Transactional' },
  { value: 'notification', label: 'Notification' },
  { value: 'support', label: 'Support' },
  { value: 'sales', label: 'Sales' },
]

const TEMPLATE_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'sw', label: 'Swahili' },
  { value: 'fr', label: 'French' },
]

export default function Templates() {
  const { organization, user } = useAuth()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  // Form state
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: '',
    category: 'marketing',
    content: '',
    variables: [],
    language: 'en',
    status: 'draft',
  })

  useEffect(() => {
    if (organization) {
      fetchTemplates()
    }
  }, [organization])

  const fetchTemplates = async () => {
    if (!organization) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('whatsapp_campaign_templates')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTemplates(data || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
      toast.error('Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g
    const matches = content.matchAll(regex)
    const variables = new Set<string>()

    for (const match of matches) {
      variables.add(match[1])
    }

    return Array.from(variables)
  }

  const handleContentChange = (content: string) => {
    const variables = extractVariables(content)
    setFormData(prev => ({
      ...prev,
      content,
      variables,
    }))
  }

  const handleCreateTemplate = async () => {
    if (!organization || !user) return

    if (!formData.name.trim()) {
      toast.error('Please enter a template name')
      return
    }

    if (!formData.content.trim()) {
      toast.error('Please enter template content')
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase
        .from('whatsapp_campaign_templates')
        .insert({
          organization_id: organization.id,
          created_by: user.id,
          name: formData.name,
          description: formData.description || null,
          category: formData.category,
          content: formData.content,
          variables: formData.variables,
          language: formData.language,
          status: formData.status,
        })

      if (error) throw error

      toast.success('Template created successfully')
      setCreateDialogOpen(false)
      resetForm()
      await fetchTemplates()
    } catch (error) {
      console.error('Error creating template:', error)
      toast.error('Failed to create template')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTemplate = async () => {
    if (!editingTemplate) return

    if (!formData.name.trim()) {
      toast.error('Please enter a template name')
      return
    }

    if (!formData.content.trim()) {
      toast.error('Please enter template content')
      return
    }

    try {
      setLoading(true)
      const { error } = await supabase
        .from('whatsapp_campaign_templates')
        .update({
          name: formData.name,
          description: formData.description || null,
          category: formData.category,
          content: formData.content,
          variables: formData.variables,
          language: formData.language,
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingTemplate.id)

      if (error) throw error

      toast.success('Template updated successfully')
      setEditingTemplate(null)
      resetForm()
      await fetchTemplates()
    } catch (error) {
      console.error('Error updating template:', error)
      toast.error('Failed to update template')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      const { error } = await supabase
        .from('whatsapp_campaign_templates')
        .delete()
        .eq('id', templateId)

      if (error) throw error

      toast.success('Template deleted successfully')
      fetchTemplates()
    } catch (error) {
      console.error('Error deleting template:', error)
      toast.error('Failed to delete template')
    }
  }

  const handleDuplicateTemplate = async (template: Template) => {
    if (!organization || !user) return

    try {
      const { error } = await supabase
        .from('whatsapp_campaign_templates')
        .insert({
          organization_id: organization.id,
          created_by: user.id,
          name: `${template.name} (Copy)`,
          description: template.description,
          category: template.category,
          content: template.content,
          variables: template.variables,
          language: template.language,
          status: 'draft',
        })

      if (error) throw error

      toast.success('Template duplicated successfully')
      fetchTemplates()
    } catch (error) {
      console.error('Error duplicating template:', error)
      toast.error('Failed to duplicate template')
    }
  }

  const openEditDialog = (template: Template) => {
    setEditingTemplate(template)
    setFormData({
      name: template.name,
      description: template.description || '',
      category: template.category || 'marketing',
      content: template.content,
      variables: template.variables,
      language: template.language,
      status: template.status,
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'marketing',
      content: '',
      variables: [],
      language: 'en',
      status: 'draft',
    })
  }

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('template-content') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = formData.content
    const before = text.substring(0, start)
    const after = text.substring(end)
    const newContent = before + `{{${variable}}}` + after

    handleContentChange(newContent)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + variable.length + 4,
        start + variable.length + 4
      )
    }, 0)
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'archived':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'marketing':
        return 'bg-blue-100 text-blue-800'
      case 'transactional':
        return 'bg-purple-100 text-purple-800'
      case 'notification':
        return 'bg-yellow-100 text-yellow-800'
      case 'support':
        return 'bg-green-100 text-green-800'
      case 'sales':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading templates...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Templates</h1>
          <p className="text-gray-600 mt-1">
            Create and manage reusable message templates for campaigns
          </p>
        </div>
        <Dialog
          open={createDialogOpen || editingTemplate !== null}
          onOpenChange={(open) => {
            if (!open) {
              setCreateDialogOpen(false)
              setEditingTemplate(null)
              resetForm()
            }
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? 'Edit Template' : 'Create New Template'}
              </DialogTitle>
              <DialogDescription>
                {editingTemplate
                  ? 'Update your template details and content'
                  : 'Create a reusable message template with variables'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Template Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Welcome Message, Order Confirmation"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of when to use this template"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Category and Language */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEMPLATE_CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEMPLATE_LANGUAGES.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Template Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="template-content">Template Content *</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertVariable('name')}
                    >
                      Insert {'{{name}}'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertVariable('company')}
                    >
                      Insert {'{{company}}'}
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="template-content"
                  placeholder="Hi {{name}}! Welcome to {{company}}..."
                  value={formData.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  rows={6}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  Use {'{{variable}}'} syntax for dynamic values. Detected variables:{' '}
                  {formData.variables.length > 0 ? (
                    <span className="font-medium">{formData.variables.join(', ')}</span>
                  ) : (
                    'none'
                  )}
                </p>
              </div>

              {/* Preview */}
              {formData.content && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="text-sm whitespace-pre-wrap">
                        {formData.content.replace(/\{\{(\w+)\}\}/g, (_, v) => `[${v}]`)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setCreateDialogOpen(false)
                  setEditingTemplate(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
              >
                {editingTemplate ? 'Update Template' : 'Create Template'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {templates.filter(t => t.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Drafts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {templates.filter(t => t.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Archived
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {templates.filter(t => t.status === 'archived').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {TEMPLATE_CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Templates</CardTitle>
          <CardDescription>
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No templates found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || selectedCategory !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first template'}
              </p>
              {!searchQuery && selectedCategory === 'all' && (
                <div className="mt-6">
                  <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Template
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Variables</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        {template.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {template.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getCategoryColor(template.category)}>
                        {template.category || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.length > 0 ? (
                          template.variables.map((variable) => (
                            <Badge key={variable} variant="secondary" className="text-xs">
                              {`{{${variable}}}`}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400">None</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <Globe className="mr-1 h-3 w-3" />
                        {template.language.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(template.status)}>
                        {template.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {format(new Date(template.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setPreviewTemplate(template)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(template)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={previewTemplate !== null} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
            <DialogDescription>
              {previewTemplate?.description || 'Template preview'}
            </DialogDescription>
          </DialogHeader>
          {previewTemplate && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="outline" className={getCategoryColor(previewTemplate.category)}>
                  {previewTemplate.category}
                </Badge>
                <Badge variant="outline" className={getStatusColor(previewTemplate.status)}>
                  {previewTemplate.status}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium">Content:</Label>
                <Card className="mt-2 bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm whitespace-pre-wrap font-mono">
                      {previewTemplate.content}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {previewTemplate.variables.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Variables:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {previewTemplate.variables.map((variable) => (
                      <Badge key={variable} variant="secondary">
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Preview with sample data:</Label>
                <Card className="mt-2 bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="text-sm whitespace-pre-wrap">
                      {previewTemplate.content.replace(/\{\{(\w+)\}\}/g, (_, v) => {
                        // Sample data for preview
                        const sampleData: Record<string, string> = {
                          name: 'John Doe',
                          customer_name: 'John Doe',
                          company: 'Acme Corp',
                          product: 'Premium Plan',
                          amount: 'KES 5,000',
                          date: format(new Date(), 'MMM d, yyyy'),
                          time: '2:00 PM',
                        }
                        return sampleData[v] || `[${v}]`
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              Close
            </Button>
            {previewTemplate && (
              <Button onClick={() => {
                openEditDialog(previewTemplate)
                setPreviewTemplate(null)
              }}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Template
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
