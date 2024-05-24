"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const formSchema = z.object({
  ExpenseTitle: z.string().min(2, {
    message: "ExpenseTitle must be at least 2 characters.",
  }),
  Amount: z.coerce.number().positive({
    message: "Enter a positive number",
  }),
  RelatedBudgetID: z.coerce.number().positive({
    message: "Please select a valid budget",
  }),
});

interface Budget {
  ID: number;
  BudgetTitle: string;
  BudgetAmount: number;
}

export function AddRecordForm() {
  // const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [budgetData, setBudgetData] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/budget");
        const budgets = response.data["All Budgets"];
        setBudgetData(budgets);
        console.log(response);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load budgets");
      }
    };
    fetchBudgets();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ExpenseTitle: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();
    console.log("Form data submitted:", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/expense",
        values
      );

      toast.success("Record Submit Success");
    } catch (error) {
      console.error();
      toast.error("Cannot submit record at the moment");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name="ExpenseTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Give an approriate summarization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="Amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="Rs." type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="RelatedBudgetID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Choose" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetData.map((budget) => (
                              <SelectItem
                                key={budget.ID}
                                value={budget.ID.toString()}
                              >
                                {budget.BudgetTitle}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button className="mt-4 w-full" type="submit">
              Add to record
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
