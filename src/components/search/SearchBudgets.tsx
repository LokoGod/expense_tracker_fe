"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function SearchBudgets({ budgets }: any) {
  const [query, setQuery] = useState("");

  const filteredBudgets = budgets.filter((budget: any) =>
    budget.BudgetTitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="relative mb-4 flex justify-center">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search budgets..."
          className="pl-8 w-auto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBudgets.map((budget: any) => (
          <Card key={budget.ID} className="col-span-1">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="flex justify-between items-center md:pt-0 pt-4">
                <div className="text-lg md:text-xl">
                  {budget.BudgetTitle}{" "}
                  <Badge variant="accentBlue">Rs {budget.BudgetAmount}</Badge>
                </div>
                <div className="flex items-center">
                  <RxDotsVertical className="h-4 w-4 ml-2" />
                </div>
              </CardTitle>

              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <div className="flex justify-center">
                <Button asChild className="w-full md:w-full">
                  <Link href={`../budgetDetails/${budget.ID}`}>
                    Further Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
