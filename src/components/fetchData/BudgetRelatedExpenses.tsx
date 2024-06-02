import { toast } from "sonner";
import SearchBudgets from "../search/SearchBudgets";

async function fetchAllBudgets() {
  const response = await fetch(
    // "http://4.145.113.172api/v1/budget", 
    "http://localhost:5000/api/v1/budget",
    {
    cache: "no-cache",
  });

  if (!response.ok) {
    console.log(Error);
    toast.error("Failed to fetch budgets");
  }
  return response.json();
}

export default async function BudgetRelatedExpenses() {
  const data = await fetchAllBudgets();
  const budgets = data["All Budgets"];

  return (
    <div>
      <div className="relative mb-5">
        <SearchBudgets budgets={budgets} />
      </div>
    </div>
  );
}
