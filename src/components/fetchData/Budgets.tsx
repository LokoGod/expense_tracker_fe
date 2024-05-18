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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Ellipsis, Grip, Users } from "lucide-react";

import { toast } from "sonner";
import { RxClock, RxDotsHorizontal } from "react-icons/rx";
import Link from "next/link";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";

async function fetchAllBudgets() {
  const response = await fetch("http://localhost:5000/api/v1/budget", {
    cache: "no-cache",
  });

  if (!response.ok) {
    console.log(Error);
    toast.error("Failed to fetch budgets");
  }
  return response.json();
}

export default async function Budgets() {
  const data = await fetchAllBudgets();
  const budgets = data["All Budgets"];

  return (
    <div>
      <Card>
        <Table className="w-auto md:w-full">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-center">Amount (LKR)</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.map((budget: any) => (
              <TableRow key={budget.ID}>
                <TableCell className="font-medium">
                  {budget.BudgetTitle}
                </TableCell>
                <TableCell className="text-center">
                  {budget.BudgetAmount}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" className="h-8 w-8 p-0">
                    <Link href={`../budgetDetails/${budget.ID}`}>
                      <RxDotsHorizontal className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
