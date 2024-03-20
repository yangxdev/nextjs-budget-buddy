"use client";
import { useRouter } from "next/navigation";
import { HiOutlineRefresh } from "react-icons/hi";

export default function IncomeRefreshButton() {
    const router = useRouter();

    const handleRefreshClick = () => {
        router.refresh();
    };

    return (
        <div
            className="cursor-pointer opacity-60 transition duration-300 ease-in-out hover:-rotate-180 hover:opacity-100"
            onClick={handleRefreshClick}
        >
            <HiOutlineRefresh size={20} />
        </div>
    );
}
