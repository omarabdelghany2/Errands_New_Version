import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, Loader2, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactInfoApi, type ContactInfo } from "@/lib/api";

const ContactInfoManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    type: 'phone' as 'phone' | 'email',
    value: "",
    label: "",
    display_order: 0,
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch contact info
  const { data: contactInfo = [], isLoading } = useQuery<ContactInfo[]>({
    queryKey: ['contact-info'],
    queryFn: contactInfoApi.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: contactInfoApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
      toast({ title: "Success", description: "Contact info added successfully" });
      setForm({ type: 'phone', value: "", label: "", display_order: 0 });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add contact info", variant: "destructive" });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof form }) =>
      contactInfoApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
      toast({ title: "Success", description: "Contact info updated successfully" });
      setForm({ type: 'phone', value: "", label: "", display_order: 0 });
      setEditingId(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update contact info", variant: "destructive" });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: contactInfoApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
      toast({ title: "Success", description: "Contact info deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete contact info", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (item: ContactInfo) => {
    setForm({
      type: item.type,
      value: item.value,
      label: item.label || "",
      display_order: item.display_order,
    });
    setEditingId(item.id);
  };

  const handleCancel = () => {
    setForm({ type: 'phone', value: "", label: "", display_order: 0 });
    setEditingId(null);
  };

  const phones = contactInfo.filter(item => item.type === 'phone');
  const emails = contactInfo.filter(item => item.type === 'email');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? "Edit Contact Info" : "Add Contact Info"}
          </CardTitle>
          <CardDescription>
            {editingId ? "Update contact information" : "Add phone numbers or email addresses to display on the site"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(value: 'phone' | 'email') => setForm({ ...form, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Phone Number</SelectItem>
                  <SelectItem value="email">Email Address</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">
                {form.type === 'phone' ? 'Phone Number' : 'Email Address'}
              </Label>
              <Input
                id="value"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder={form.type === 'phone' ? '01234567890' : 'email@example.com'}
                type={form.type === 'email' ? 'email' : 'text'}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Label (optional)</Label>
              <Input
                id="label"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="e.g., Sales, Support, Main Office"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingId ? "Update" : "Add"} Contact Info
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Numbers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Numbers
            </CardTitle>
            <CardDescription>Manage phone numbers displayed on the site</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : phones.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No phone numbers added yet.</p>
            ) : (
              <div className="space-y-3">
                {phones.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.value}</p>
                      {item.label && <p className="text-sm text-muted-foreground">{item.label}</p>}
                      <p className="text-xs text-muted-foreground">Order: {item.display_order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Addresses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Addresses
            </CardTitle>
            <CardDescription>Manage email addresses displayed on the site</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : emails.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No email addresses added yet.</p>
            ) : (
              <div className="space-y-3">
                {emails.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium break-all">{item.value}</p>
                      {item.label && <p className="text-sm text-muted-foreground">{item.label}</p>}
                      <p className="text-xs text-muted-foreground">Order: {item.display_order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactInfoManager;
