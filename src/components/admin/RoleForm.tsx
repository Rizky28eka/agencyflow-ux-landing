
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from 'react';

const allPermissions = [
  'User Management', 'System Settings', 'Reports', 'Security', 
  'Project Management', 'Team Coordination', 'Client Communication',
  'Team Management', 'Task Assignment', 'Performance Reviews',
  'Task Management', 'Time Tracking', 'Basic Reports',
  'Financial Management', 'Invoicing', 'Budget Planning',
  'Project Viewing', 'File Access'
];

export const RoleForm = ({ isOpen, onOpenChange, onSave, role }) => {
  // In a real app, you'd use a form library like react-hook-form
  const [name, setName] = useState(role?.name || '');
  const [selectedPermissions, setSelectedPermissions] = useState(role?.permissions || []);

  const handlePermissionChange = (permission) => {
    setSelectedPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission) 
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    onSave({ name, permissions: selectedPermissions });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Create New Role'}</DialogTitle>
          <DialogDescription>
            Define the role name and select the permissions to be granted.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input id="role-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-md border p-4 h-64 overflow-y-auto">
              {allPermissions.map(permission => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox 
                    id={permission}
                    checked={selectedPermissions.includes(permission)}
                    onCheckedChange={() => handlePermissionChange(permission)}
                  />
                  <Label htmlFor={permission} className="font-normal">{permission}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
