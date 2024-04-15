import { Skeleton } from "@/components/ui/skeleton";

export default function HistorySkeleton() {
    return (
            <div className="flex flex-col mb-2 gap-2 w-80">
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
    );
}
