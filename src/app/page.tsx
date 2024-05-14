import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"


import { DollarSign } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Record</Button>
          </DialogTrigger>
          <DialogContent className=" md: w-auto">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <Input />

          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
