"use client";

import { useEffect, useState } from "react";
import IncomeDoughnut from "./charts/IncomeDoughnut";
import GlobalConfig from "@/app/app.config";
import classNames from "classnames";

const defaultLanguage = GlobalConfig.i8n.defaultLanguage || "en";
const gc = GlobalConfig.i8n.translations[defaultLanguage]?.incomeInfoGraph;

export default function IncomeInfoGraphMain(props: any) {
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

  const [selectedOption, setSelectedOption] = useState<string>(gc?.buttonDefault || "doughnutYearly");

  const dataMapping: { [key: string]: { categories: any; datasetsData: any } } = {
    doughnutWeekly: { categories: categoriesWeekly, datasetsData: datasetsDataWeekly },
    doughnutMonthly: { categories: categoriesMonthly, datasetsData: datasetsDataMonthly },
    doughnutYearly: { categories: categoriesYearly, datasetsData: datasetsDataYearly },
  };

  const { categories, datasetsData } = dataMapping[selectedOption];

  return (
    <>
      <div className="flex gap-2 transition duration-100 justify-evenly">
        <button
          className={` hover:bg-[#434343] rounded-md p-2
            ${selectedOption === "doughnutWeekly" ? "bg-[#434343]" : "bg-[#565656]"}
          `}
          disabled={props.datasets[0] === undefined || props.datasets[0].length === 0}
          onClick={() => setSelectedOption("doughnutWeekly")}
        >
          {gc?.buttonThisWeek}
        </button>
        <button
          className={`
         hover:bg-[#434343] rounded-md p-2 
          ${selectedOption === "doughnutMonthly" ? "bg-[#434343]" : "bg-[#565656]"}
          `}
          disabled={props.datasets[1] === undefined || props.datasets[1].length === 0}
          onClick={() => setSelectedOption("doughnutMonthly")}
        >
          {gc?.buttonThisMonth}
        </button>
        <button
          className={`
           hover:bg-[#434343] rounded-md p-2
          ${selectedOption === "doughnutYearly" ? "bg-[#434343]" : "bg-[#565656]"}
          `}
          disabled={props.datasets[2] === undefined || props.datasets[2].length === 0}
          onClick={() => setSelectedOption("doughnutYearly")}
        >
          {gc?.buttonThisYear}
        </button>
      </div>
      {checkEmpty() && <div>{gc?.noIncomeDataAvailable}</div>}
      <IncomeDoughnut id={selectedOption} categories={categories} datasetsData={datasetsData} />
    </>
  );
}
