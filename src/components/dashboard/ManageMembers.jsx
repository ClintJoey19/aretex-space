import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

const ManageMembers = ({
  isManageMembersDialogOpen,
  setIsManageMembersDialogOpen,
  emails,
  setEmails,
  role,
  setRole,
  addMembers,
}) => {
  return (
    <>
      <Dialog
        open={isManageMembersDialogOpen}
        onClose={() => setIsManageMembersDialogOpen(false)}
        onOpenChange={() => setIsManageMembersDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Members</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={addMembers}>
            <div className="grid grid-cols-6 gap-2">
              <Textarea
                id="email"
                placeholder="Add Emails"
                className="col-span-4"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                required
              />
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="reader">Viewer</SelectItem>
                    <SelectItem value="commenter">Commenter</SelectItem>
                    <SelectItem value="writer">Contributor</SelectItem>
                    <SelectItem value="fileOrganizer">
                      Content Manager
                    </SelectItem>
                    <SelectItem value="organizer">Manager</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsManageMembersDialogOpen(false)}
              >
                Close
              </Button>
              <Button type="submit">Add Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageMembers;
