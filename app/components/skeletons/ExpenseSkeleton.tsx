import { Skeleton } from "@/components/ui/skeleton";
import GlobalConfig from "@/app/app.config";

const gc = GlobalConfig.i18n.translations[GlobalConfig.i18n.defaultLanguage || "en"]?.expenses;

export default function ExpenseSkeleton() {
    return (
        <>
            <div className="font-bold text-3xl pb-6 select-none">{gc?.title}</div>
            <div className="flex flex-row gap-8 justify-between h-full">
                <>
                    <div className="flex flex-row gap-8">
                        {/* First column [AddExpense, AddExpenseWithFile] */}
                        <div className="flex flex-col gap-8 max-w-80">
                            <Skeleton className="h-[470px] w-80 rounded-xl" />
                            <Skeleton className="h-[156px] w-80 rounded-xl" />
                        </div>

                        {/* Second column [ExpenseInfoSummary, ExpenseInfoChartDoughnut] */}
                        <div className="flex flex-col gap-8">
                            <Skeleton className="h-[158px] w-80 rounded-xl" />
                            <Skeleton className="h-[500px] w-80 rounded-xl" />
                        </div>

                        {/* Third column [ExpenseInfoInsights] */}
                        <div className="flex flex-col gap-8">
                            <Skeleton className="h-[474px] min-w-60 rounded-xl" />
                        </div>
                    </div>

                    {/* ExpenseInfoHistory */}
                    <div className="flex flex-col mb-2 gap-2 w-80">
                        <div className="flex flex-row justify-between items-center pb-2">
                            <Skeleton className="h-8 w-36" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="section flex flex-col gap-4">
                                <div className="flex w-full">
                                    <Skeleton className="h-6 w-36" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                            </div>
                            <div className="section flex flex-col gap-4">
                                <div className="flex w-full">
                                    <Skeleton className="h-6 w-36" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                            </div>
                            <div className="section flex flex-col gap-4">
                                <div className="flex w-full">
                                    <Skeleton className="h-6 w-36" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                            </div>
                            <div className="section flex flex-col gap-4">
                                <div className="flex w-full">
                                    <Skeleton className="h-6 w-36" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                                <div className="flex flex-row w-full pl-2 justify-between h-[70px] items-center">
                                    <Skeleton className="rounded-full h-[44px] w-[44px]" />
                                    <Skeleton className="w-[260px] h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
}
