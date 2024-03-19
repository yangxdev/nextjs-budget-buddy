// get all the income from prisma and display it in a table

import React from "react";
import { getIncomeData } from "@/app/api/database/get_incomes/incomes";

export default async function IncomeList() {
    const incomeData = await getIncomeData();
    return (
        <div>
            <table className="max-w-80">
                <thead>
                    <tr>
                        <th className="text-left">Source</th>
                        <th className="text-left">Amount</th>
                        <th className="text-left">Currency</th>
                        <th className="text-left">Category</th>
                        <th className="text-left">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {incomeData.incomes.map((income) => (
                        <tr key={income.id}>
                            <td>{income.source}</td>
                            <td>{income.amount}</td>
                            <td>{income.currency}</td>
                            <td>{income.category}</td>
                            <td>{income.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
