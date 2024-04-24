"use client";
// DONE: Add new time filters: "All time", "Last 3 years"
// FIXED: The colors in the legend are not consistent with the colors in the chart

import { useEffect, useState } from "react";
import InfoChartDoughnut from "./charts/IncomeDoughnut";
import GlobalConfig from "@/app/app.config";
import classNames from "classnames";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.income;

export default function IncomeInfoChartDoughnutClient(props: any) {
    function checkEmpty(): boolean {
        if (props.datasets[0] === undefined && props.datasets[1] === undefined && props.datasets[2] === undefined) {
            return true;
        }
        return props.datasets[0].length === 0 && props.datasets[1].length === 0 && props.datasets[2].length === 0;
    }

    const categoriesWeekly = props.categories[0];
    const datasetsDataWeekly = props.datasets[0];

    const categoriesMonthly = props.categories[1];
    const datasetsDataMonthly = props.datasets[1];

    const categoriesYearly = props.categories[2];
    const datasetsDataYearly = props.datasets[2];

    const categoriesThreeYears = props.categories[3];
    const datasetsDataThreeYears = props.datasets[3];

    const categoriesAllTime = props.categories[4];
    const datasetsDataAllTime = props.datasets[4];

    const [selectedOption, setSelectedOption] = useState<string>(gc?.incomeInfoChart?.buttonDefault || "doughnutYearly");

    const dataMapping: { [key: string]: { categories: any; datasetsData: any } } = {
        doughnutWeekly: { categories: categoriesWeekly, datasetsData: datasetsDataWeekly },
        doughnutMonthly: { categories: categoriesMonthly, datasetsData: datasetsDataMonthly },
        doughnutYearly: { categories: categoriesYearly, datasetsData: datasetsDataYearly },
        doughtnutThreeYears: { categories: categoriesThreeYears, datasetsData: datasetsDataThreeYears },
        doughnutAllTime: { categories: categoriesAllTime, datasetsData: datasetsDataAllTime },
    };

    const { categories, datasetsData } = dataMapping[selectedOption];

    return (
        <>
            {!checkEmpty() && (
                <div className="flex gap-0 transition duration-100 justify-start border-[1px] border-lightBorder rounded-xl shadow-sm">
                    <button
                        className={`
                            w-32 ${props.datasets[0] === undefined || props.datasets[0].length === 0 ? "opacity-50" : "hover:bg-newBlue-500 hover:text-white"} rounded-l-xl p-2 duration-100 transition ease-in-out
                            ${selectedOption === "doughnutWeekly" ? "bg-newBlue-500 text-white" : "bg-white"}
                        `}
                        disabled={props.datasets[0] === undefined || props.datasets[0].length === 0}
                        onClick={() => setSelectedOption("doughnutWeekly")}
                        title={props.datasets[1] === undefined || props.datasets[1].length === 0 ? "There's no available data for this date range" : ""}
                    >
                        {gc?.incomeInfoChart?.buttonThisWeek}
                    </button>
                    <button
                        className={`
                            w-32 ${props.datasets[1] === undefined || props.datasets[1].length === 0 ? "opacity-50" : "hover:bg-newBlue-500 hover:text-white"} p-2 duration-100 transition ease-in-out
                            ${selectedOption === "doughnutMonthly" ? "bg-newBlue-500 text-white" : "bg-white"}
                        `}
                        disabled={props.datasets[1] === undefined || props.datasets[1].length === 0}
                        onClick={() => setSelectedOption("doughnutMonthly")}
                        title={props.datasets[1] === undefined || props.datasets[1].length === 0 ? "There's no available data for this date range" : ""}
                    >
                        {gc?.incomeInfoChart?.buttonThisMonth}
                    </button>

                    <button
                        className={`
                            w-32 ${props.datasets[2] === undefined || props.datasets[2].length === 0 ? "opacity-50" : "hover:bg-newBlue-500 hover:text-white"} p-2 duration-100 transition ease-in-out
                            ${selectedOption === "doughnutYearly" ? "bg-newBlue-500 text-white" : "bg-white"}
                        `}
                        disabled={props.datasets[2] === undefined || props.datasets[2].length === 0}
                        onClick={() => setSelectedOption("doughnutYearly")}
                    >
                        {gc?.incomeInfoChart?.buttonThisYear}
                    </button>

                    <button
                        className={`
                                w-32 ${props.datasets[3] === undefined || props.datasets[3].length === 0 ? "opacity-50" : "hover:bg-newBlue-500 hover:text-white"} p-2 duration-100 transition ease-in-out
                                ${selectedOption === "doughtnutThreeYears" ? "bg-newBlue-500 text-white" : "bg-white"}
                            `}
                        disabled={props.datasets[3] === undefined || props.datasets[3].length === 0}
                        onClick={() => setSelectedOption("doughtnutThreeYears")}
                    >
                        {gc?.incomeInfoChart?.buttonThreeYears}
                    </button>

                    <button
                        className={`
                            w-32 ${props.datasets[4] === undefined || props.datasets[4].length === 0 ? "opacity-50" : "hover:bg-newBlue-500 hover:text-white"} rounded-r-xl p-2 duration-100 transition ease-in-out
                            ${selectedOption === "doughnutAllTime" ? "bg-newBlue-500 text-white" : "bg-white"}
                        `}
                        disabled={props.datasets[4] === undefined || props.datasets[4].length === 0}
                        onClick={() => setSelectedOption("doughnutAllTime")}
                    >
                        {gc?.incomeInfoChart?.buttonAllTime}
                    </button>
                </div>
            )}
            {checkEmpty() && <div>{gc?.incomeInfoHistory?.noIncomeDataAvailable}</div>}
            {!checkEmpty() && <InfoChartDoughnut id={selectedOption} categories={categories} datasetsData={datasetsData} />}
        </>
    );
}


// DONE: fix hover when disabled