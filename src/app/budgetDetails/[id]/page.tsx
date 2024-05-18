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

  const data = await fetchTotalRelatedRecordAmount();
  const total = data["Total"];

  return (
    <div>
      <h1>This is the total</h1>
      <h2>{total}</h2>
    </div>
  );
}
