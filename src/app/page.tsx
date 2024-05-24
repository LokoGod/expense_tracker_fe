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
import { AddRecordForm } from "@/components/forms/AddRecordForm";
import ExpenseRecords from "@/components/fetchData/ExpenseRecords";

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

            <AddRecordForm />

          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
