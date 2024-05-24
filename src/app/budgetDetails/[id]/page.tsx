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

import { CreditCard, PiggyBank, Receipt, Wallet } from "lucide-react";
import BudgetDetailsPieChart from "@/components/charts/BudgetDetailsPieChart";
import { Badge } from "@/components/ui/badge";

type Params = {
  params: {
    ID: string;
  };
};

export default async function page({ params: { ID } }: Params) {
  async function fetchTotalRelatedRecordAmount() {
    const response = await fetch(
      `http://localhost:5000/api/v1/totalRelatedRecordAmount/${ID}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      console.log(Error);
      toast.error("Failed to fetch budgets");
    }
    return response.json();
  }

  async function fetchAllBudgetRelatedExpenseRecords() {
    const response = await fetch(
      `http://localhost:5000/api/v1/relatedExpenseRecord/${ID}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      console.log(Error);
      toast.error("Failed to fetch related records");
    }
    return response.json();
  }

  async function fetchCalBudgetRemaining() {
    const response = await fetch(
      `http://localhost:5000/api/v1/calBudgetRemaining/${ID}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      console.log(Error);
      toast.error("Failed to fetch remaining budget");
    }
    return response.json();
  }

  const totalRelatedRecordAmountData = await fetchTotalRelatedRecordAmount();
  const totalRecordAmount = totalRelatedRecordAmountData["Total"];

  const allBudgetRelatedExpenseRecords =
    await fetchAllBudgetRelatedExpenseRecords();
  const relatedExpenseRecords =
    allBudgetRelatedExpenseRecords["All related records"];

  const calculatedBudgetRemaining = await fetchCalBudgetRemaining();
  const budgetRemaining = calculatedBudgetRemaining["Remaining amount"];

  return (
    <main className="sm:px-6">
  <div className="flex flex-col sm:flex-row justify-evenly mb-5">
    <Card className="w-full sm:w-[300px] mb-4 sm:mb-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total spent
        </CardTitle>
        <Receipt className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Rs {totalRecordAmount.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">
          <Badge variant={"customSuccessGreen"}>+20.1%</Badge> from last month
        </div>
      </CardContent>
    </Card>

    <Card className="w-full sm:w-[300px] mb-4 sm:mb-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Remaining budget
        </CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Rs {budgetRemaining.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">
          <Badge variant={"destructive"}>+19%</Badge> from last month
        </div>
      </CardContent>
    </Card>

    <Card className="w-full sm:w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Remaining budget
        </CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Rs {budgetRemaining.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">
          <Badge variant={"destructive"}>+19%</Badge> from last month
        </div>
      </CardContent>
    </Card>
  </div>

  <div className="flex flex-col sm:flex-row justify-evenly gap-4">
    <Card className="w-full sm:w-auto mb-4 sm:mb-0">
      {/* passing data variables as props */}
      <BudgetDetailsPieChart totalRecordAmount={totalRecordAmount} budgetRemaining={budgetRemaining}/>
    </Card>

    <Card className="w-full sm:w-[400px]">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Expense</TableHead>
            <TableHead className="text-center">Category</TableHead>
            {/* <TableHead className="text-right">Amount (LKR)</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {relatedExpenseRecords.map((record: any) => (
            <TableRow key={record.ID}>
              <TableCell className="font-medium">
                {record.RelatedBudgetID}
              </TableCell>
              <TableCell>{record.RelatedExpenseID}</TableCell>
              {/* <TableCell className="text-right">{record.Amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </div>
</main>

  );
}
