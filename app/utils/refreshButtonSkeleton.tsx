"use client";
import ReactDOM from "react-dom";
import { DASHBOARD_PADDING } from "@/app/_styles/styles";

export default function RefreshButtonSkeleton(SkeletonCard: any, timeout: number, targetPageId: string, router: any) {
    const targetPage = document.getElementById(targetPageId);
    const skeleton = document.createElement("div");
    skeleton.id = "skeleton";
    skeleton.style.position = "absolute";
    skeleton.style.top = "0";
    skeleton.style.left = "0";
    skeleton.style.width = "100%";
    skeleton.style.height = "100%";
    skeleton.style.zIndex = "1000";
    // skeleton.style.padding = DASHBOARD_PADDING;

    // const targetPageContent = document.getElementById(targetPageId)?.firstChild as HTMLElement;
    // targetPageContent!.style.display = "none";

    // ReactDOM.render(SkeletonCard, skeleton);
    // targetPage!.appendChild(skeleton);
    router.refresh();

    // setTimeout(() => {
    //     targetPage!.removeChild(skeleton);
    //     targetPageContent!.style.display = "block";
    // }, timeout);
    return <></>;
}
