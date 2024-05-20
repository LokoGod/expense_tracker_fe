import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import { CreditCard } from "lucide-react";
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
    <main className="">
      <div className="flex justify-evenly">
        <Card className="w-[300px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expenses so far...
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {totalRecordAmount}</div>
            <div className="text-xs text-muted-foreground">
            <Badge variant={"customSuccessGreen"}>+20.1%</Badge> from last month
            </div>
          </CardContent>
        </Card>

        <Card className="w-[300px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Remaining budget
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {budgetRemaining}</div>
            <div className="text-xs text-muted-foreground">
             <Badge variant={"destructive"}>+19%</Badge> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card>
          {/* passing data variables as props */}
          <BudgetDetailsPieChart totalRecordAmount={totalRecordAmount} budgetRemaining={budgetRemaining}/>
        </Card>
      </div>

      {/* <h1>This is the total</h1>
      <h2></h2>

      <h1>Table thinamaboo</h1>
      {relatedExpenseRecords.map((records: any) => (
        <ul key={records.ID}>
          <li>
            {records.RelatedBudgetID}|{records.RelatedExpenseID}
          </li>
        </ul>
      ))}

      <h1>Remaining: </h1> */}
    </main>
  );
}
