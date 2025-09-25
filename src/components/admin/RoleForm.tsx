
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from 'react';
import { Card } from "../ui/card";

const permissionMatrix = {
  'Users': ['read', 'write', 'delete'],
  'Roles': ['read', 'write', 'delete'],
  'Projects': ['read', 'write', 'delete'],
  'Finance': ['read', 'write', 'delete'],
  'Tasks': ['read', 'write', 'delete'],
  'Billing': ['read', 'write'],
  'Reports': ['read', 'write'],
};

export const RoleForm = ({ isOpen, onOpenChange, onSave, role }) => {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (role) {
      setName(role.name);
      // In a real app, you would parse the flat permission strings into the matrix structure
      // For this mock, we'll just initialize it simply
      const initialPermissions = {};
      Object.keys(permissionMatrix).forEach(resource => {
        initialPermissions[resource] = [];
        role.permissions.forEach(p => {
          if (p.toLowerCase().includes(resource.toLowerCase().slice(0, -1))) {
            if (p.toLowerCase().startsWith('full')) {
                initialPermissions[resource] = permissionMatrix[resource];
            } else {
                permissionMatrix[resource].forEach(action => {
                    if(p.toLowerCase().includes(action)) {
                        initialPermissions[resource].push(action);
                    }
                })
            }
          }
        });
      });
      setSelectedPermissions(initialPermissions);
    } else {
      setName('');
      const emptyPermissions = {};
      Object.keys(permissionMatrix).forEach(r => emptyPermissions[r] = []);
      setSelectedPermissions(emptyPermissions);
    }
  }, [role]);

  const handlePermissionChange = (resource, action) => {
    const currentActions = selectedPermissions[resource] || [];
    const newActions = currentActions.includes(action)
      ? currentActions.filter(a => a !== action)
      : [...currentActions, action];
    setSelectedPermissions({ ...selectedPermissions, [resource]: newActions });
  };

  const handleSubmit = () => {
    // Flatten permissions for saving
    const flatPermissions = Object.entries(selectedPermissions).flatMap(([resource, actions]) => 
        actions.map(action => `${action.charAt(0).toUpperCase() + action.slice(1)} ${resource}`)
    );
    onSave({ name, permissions: flatPermissions });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit Role' : 'Create New Role'}</DialogTitle>
          <DialogDescription>
            Define the role name and select permissions from the matrix below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input id="role-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Permissions</Label>
            <Card className="h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource</TableHead>
                    {['read', 'write', 'delete'].map(action => (
                      <TableHead key={action} className="text-center">{action.charAt(0).toUpperCase() + action.slice(1)}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(permissionMatrix).map(([resource, actions]) => (
                    <TableRow key={resource}>
                      <TableCell className="font-medium">{resource}</TableCell>
                      {['read', 'write', 'delete'].map(action => (
                        <TableCell key={action} className="text-center">
                          {actions.includes(action) ? (
                            <Checkbox 
                              checked={selectedPermissions[resource]?.includes(action)}
                              onCheckedChange={() => handlePermissionChange(resource, action)}
                            />
                          ) : null}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
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
