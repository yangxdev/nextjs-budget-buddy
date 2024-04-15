"use client";
import { HiOutlineRefresh } from "react-icons/hi";
import HistorySkeleton from "@/app/components/skeletons/HistorySkeleton";
import ReactDOM from "react-dom";
import RefreshButtonSkeleton from "../utils/refreshButtonSkeleton";
import { useRouter } from "next/navigation";

export default function HistoryRefreshButton() {
    const router = useRouter();
    const historySkeleton = <HistorySkeleton />;
    const handleRefreshClick = () => {
        RefreshButtonSkeleton(historySkeleton, 2500, "PaymentInfoHistory", router);
    };

    return (
        <div className="cursor-pointer opacity-60 transition duration-300 ease-in-out hover:-rotate-180 hover:opacity-100" onClick={handleRefreshClick}>
            <HiOutlineRefresh size={20} />
        </div>
    );
}
