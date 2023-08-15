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
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

export function EditBio({user, btnTitle}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"className="rounded-full bg-gray-300 ">edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit bio</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
          
          <div className="flex flex-col items-start  gap-4">
            <Label htmlFor="number" className="text-right">
              Bio
            </Label>
            <Textarea id="number" rows={10} className="col-span-3" />
          </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
