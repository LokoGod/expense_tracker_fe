import BudgetRelatedExpenses from "@/components/fetchData/Budgets";

export default function page() {
  return (
    <main>
      <div className="flex justify-center mt-5">
        <BudgetRelatedExpenses />
      </div>
    </main>
  );
}
