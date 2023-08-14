import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EditNumber() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"className="rounded-full bg-gray-300 ">edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit number</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input id="number" type="number" className="col-span-3" />
          </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
