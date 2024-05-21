
import BudgetRelatedExpenses from "@/components/fetchData/BudgetRelatedExpenses";
import SearchBudgets from "@/components/search/SearchBudgets";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function page() {


  return (
    <main>
      

      <div className="flex justify-center mt-5">
        <BudgetRelatedExpenses />
      </div>
    </main>
  );
}
