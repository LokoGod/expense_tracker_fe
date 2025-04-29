import AddRecord from "@/components/add-record";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Record</Button>
          </DialogTrigger>
          <DialogContent className=" md:w-full">
            <DialogHeader>
              <DialogTitle>Record an expense</DialogTitle>
            </DialogHeader>

           <AddRecord />

          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
