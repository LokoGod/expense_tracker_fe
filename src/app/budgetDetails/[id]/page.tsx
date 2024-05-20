import { toast } from "sonner";

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

  const totalRelatedRecordAmountData = await fetchTotalRelatedRecordAmount();
  const total = totalRelatedRecordAmountData["Total"];

  const allBudgetRelatedExpenseRecords =
    await fetchAllBudgetRelatedExpenseRecords();
  const relatedExpenseRecords =
    allBudgetRelatedExpenseRecords["All related records"];

  return (
    <div>
      <h1>This is the total</h1>
      <h2>{total}</h2>

      {relatedExpenseRecords.map((records: any) => (
        <ul key={records.ID}>
          <li>
            {records.RelatedBudgetID}|{records.RelatedExpenseID}
          </li>
        </ul>
      ))}
    </div>
  );
}
