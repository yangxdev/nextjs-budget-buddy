"use client";
// TODO: Add new time filters: "All time", "Last 3 years"
// FIXED: The colors in the legend are not consistent with the colors in the chart

import { useEffect, useState } from "react";
import PaymentDoughnut from "./charts/PaymentDoughnut";
import GlobalConfig from "@/app/app.config";
import classNames from "classnames";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage]?.payment?.paymentInfoGraph;

export default function PaymentInfoGraphMain(props: any) {
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

    const [selectedOption, setSelectedOption] = useState<string>(gc?.buttonDefault || "doughnutYearly");

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
                <div className="flex gap-2 transition duration-100 justify-evenly">
                    <button
                        className={`
                            hover:bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2
                            ${props.datasets[0] === undefined || props.datasets[0].length === 0 ? "opacity-50 hover:bg-lightGrayCustom" : ""}
                            ${selectedOption === "doughnutWeekly" ? "bg-darkGrayCustom2" : "bg-lightGrayCustom"}
                        `}
                        disabled={props.datasets[0] === undefined || props.datasets[0].length === 0}
                        onClick={() => setSelectedOption("doughnutWeekly")}
                        title={props.datasets[1] === undefined || props.datasets[1].length === 0 ? "There's no available data for this date range" : ""}
                    >
                        {gc?.buttonThisWeek}
                    </button>
                    <button
                        className={`
                            hover:bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2 
                            ${props.datasets[1] === undefined || props.datasets[1].length === 0 ? "opacity-50 hover:bg-lightGrayCustom" : ""}
                            ${selectedOption === "doughnutMonthly" ? "bg-darkGrayCustom2" : "bg-lightGrayCustom"}
                        `}
                        disabled={props.datasets[1] === undefined || props.datasets[1].length === 0}
                        onClick={() => setSelectedOption("doughnutMonthly")}
                        title={props.datasets[1] === undefined || props.datasets[1].length === 0 ? "There's no available data for this date range" : ""}
                    >
                        {gc?.buttonThisMonth}
                    </button>

                    <button
                        className={`
                            hover:bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2
                            ${selectedOption === "doughnutYearly" ? "bg-darkGrayCustom2" : "bg-lightGrayCustom"}
                        `}
                        disabled={props.datasets[2] === undefined || props.datasets[2].length === 0}
                        onClick={() => setSelectedOption("doughnutYearly")}
                    >
                        {gc?.buttonThisYear}
                    </button>

                    <button
                        className={`
                                hover:bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2
                                ${selectedOption === "doughtnutThreeYears" ? "bg-darkGrayCustom2" : "bg-lightGrayCustom"}
                            `}
                            disabled={props.datasets[3] === undefined || props.datasets[3].length === 0}
                        onClick={() => setSelectedOption("doughtnutThreeYears")}
                    >
                        {gc?.buttonThreeYears}
                    </button>

                    <button
                        className={`
                            hover:bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md p-2
                            ${selectedOption === "doughnutAllTime" ? "bg-darkGrayCustom2" : "bg-lightGrayCustom"}
                        `}
                        disabled={props.datasets[4] === undefined || props.datasets[4].length === 0}
                        onClick={() => setSelectedOption("doughnutAllTime")}
                    >
                        {gc?.buttonAllTime}
                    </button>
                </div>
            )}
            {checkEmpty() && <div>{gc?.noPaymentDataAvailable}</div>}
            {!checkEmpty() && <PaymentDoughnut id={selectedOption} categories={categories} datasetsData={datasetsData} />}
        </>
    );
}
