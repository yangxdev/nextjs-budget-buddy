import { getExpenseDataByQuantity } from "@/app/api/database/get_expenses/expenses";
import { getIncomeDataByQuantity } from "@/app/api/database/get_incomes/incomes";
import TransactionsClient from "./TransactionsClient";

export default async function TransactionsServer() {
    const lastFiveIncomes = await getIncomeDataByQuantity(5);
    const lastFiveExpenses = await getExpenseDataByQuantity(5);

    return (
        <div>
            <TransactionsClient lastFiveIncomes={lastFiveIncomes} lastFiveExpenses={lastFiveExpenses} />
        </div>
    );
}
