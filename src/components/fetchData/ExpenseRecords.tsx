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

import { toast } from "sonner";

async function fetchExpenseRecords() {
  const response = await fetch("http://4.145.113.172/expense", {
    cache: "no-cache",
  });

  if (!response.ok) {
    console.log(Error);
    toast.error("Failed to fetch expense records");
  }
  return response.json();
}

export default async function ExpenseRecords() {
  const data = await fetchExpenseRecords();
  const expenseRecordData = data["All Records"];

  return (
    <div>
      <Card>
        <Table className="w-auto md:w-full">
          <TableCaption>A list of your expense records.</TableCaption>
          <TableHeader>
            <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
              <TableHead>Expense</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="text-right">Amount (LKR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseRecordData.map((record: any) => (
              <TableRow key={record.ID}>
                <TableCell>
                  {record.CreatedAt.slice(0,10)}
                </TableCell>
                <TableCell>
                  {record.CreatedAt.slice(11,19)}
                </TableCell>
                <TableCell className="font-medium">
                  {record.ExpenseTitle}
                </TableCell>
                <TableCell>
                 {record.Budget.BudgetTitle}
                </TableCell>
                <TableCell className="text-right">
                  {record.Amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
