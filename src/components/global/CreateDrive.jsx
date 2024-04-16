import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const CreateDrive = ({ handleSubmitDrive, title, templates }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <form action={(e) => handleSubmitDrive(e)}>
          <DialogTitle>{title}</DialogTitle>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Input id="name" className="col-span-3" placeholder={title} />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Templates</SelectLabel>
                    {templates.map((temp) => (
                      <SelectItem key={temp.id} value={temp.name}>
                        {temp.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogHeader>
    </DialogContent>
  );
};
