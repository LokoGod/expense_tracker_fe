"use client";
import { DiamondPlus, SearchIcon, Trash2 } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast } from "sonner";
import axios from "axios";

export default function SearchBudgets({ budgets }: any) {
  const [query, setQuery] = useState("");

  const filteredBudgets = budgets.filter((budget: any) =>
    budget.BudgetTitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleDeleteJob = async (ID: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/budget/${ID}`);
      toast.success("Job deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };

  return (
    <>
      <div className="relative mb-4 flex items-center">
        <SearchIcon className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search budgets..."
          className="pl-8 w-auto h-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex-grow"></div>
        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} className="h-8">
                <DiamondPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add budget</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {filteredBudgets.length === 0 ? (
        <>
        <div className="text-center mb-10">
          <Badge variant={"destructive"}>No budgets found.</Badge>
        </div>
        </>
        
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBudgets.map((budget: any) => (
            <Card key={budget.ID} className="col-span-1">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle className="flex justify-between items-center md:pt-0 pt-4">
                  <div className="text-lg md:text-xl">
                    {budget.BudgetTitle}{" "}
                    <Badge variant="accentBlue">Rs {budget.BudgetAmount.toLocaleString()}</Badge>
                  </div>
                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <RxDotsVertical className="h-4 w-4 ml-2" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteJob(budget.ID)}
                        >
                          <Trash2 className="mr-5" />
                          Delete job
                        </DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardTitle>

                <CardDescription>
                  {budget.BudgetDetail}
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
      )}
    </>
  );
}
