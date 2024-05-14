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
  const response = await fetch("http://localhost:5000/api/v1/expense", {
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
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Expense</TableHead>
            <TableHead>Cateogory</TableHead>
            <TableHead className="text-right">Amount (LKR)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseRecordData.slice(0, 5).map((record: any) => (
            <TableRow key={record.ID}>
              <TableCell className="font-medium">
                {record.ExpenseTitle}
              </TableCell>
              <TableCell>{record.ExpenseCategoryID}</TableCell>
              <TableCell className="text-right">{record.Amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Card>
    </div>
  );
}
