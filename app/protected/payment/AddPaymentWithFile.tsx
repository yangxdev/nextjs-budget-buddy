"use client";
import React, { useRef, useState } from "react";
import AddPaymentWithFileModal from "./AddPaymentWithFileModal";
import DOMPurify from "dompurify";
import GlobalConfig from "@/app/app.config";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage]?.payment?.addPayment?.addPaymentWithFile;

export default function AddPaymentWithFile() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [paymentData, setPaymentData] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  function checkInput(data: { date: string; source: string; amount: string; currency: string; category: string; notes: string }) {
    function dateCheck(date: string) {
      if (date === undefined || date === null || date === "") {
        return false;
      }

      const purifiedDate = DOMPurify.sanitize(date);
      if (purifiedDate !== date) {
        return false;
      }

      if (date.length > 10) {
        return false;
      }

      const dateArray = date.split("-");
      if (dateArray.length !== 3) {
        return false;
      }
      const month = parseInt(dateArray[0]);
      const day = parseInt(dateArray[1]);
      const year = parseInt(dateArray[2]);

      if (month < 1 || month > 12) {
        return false;
      }
      if (day < 1 || day > 31) {
        return false;
      }
      if (year < 2000 || year > 2100) {
        return false;
      }
      const monthsWith30Days = [4, 6, 9, 11];
      if ((month === 2 && day > 28) || (monthsWith30Days.includes(month) && day > 30)) {
        return false;
      }

      return true;
    }
    function sourceCheck(source: string) {
      if (source === undefined || source === null || source === "") {
        return false;
      }

      const purifiedSource = DOMPurify.sanitize(source);
      if (purifiedSource !== source) {
        return false;
      }

      if (source.length > 100) {
        return false;
      }

      return true;
    }
    function amountCheck(amount: string) {
      if (amount === undefined || amount === null || amount === "") {
        return false;
      }

      const purifiedAmount = DOMPurify.sanitize(amount);
      if (purifiedAmount !== amount) {
        return false;
      }

      if (amount.length > 10) {
        return false;
      }

      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber)) {
        return false;
      }

      if (amountNumber < 0) {
        return false;
      }

      return true;
    }
    function currencyCheck(currency: string) {
      if (currency === undefined || currency === null || currency === "") {
        return false;
      }

      const purifiedCurrency = DOMPurify.sanitize(currency);
      if (purifiedCurrency !== currency) {
        return false;
      }

      if (currency.length !== 1 && currency.length !== 3) {
        return false;
      }

      return true;
    }
    function categoryCheck(category: string) {
      if (category === undefined || category === null || category === "") {
        return false;
      }

      const purifiedCategory = DOMPurify.sanitize(category);
      if (purifiedCategory !== category) {
        return false;
      }

      if (category.length > 100) {
        return false;
      }

      return true;
    }
    function notesCheck(notes: string) {
      if (notes === undefined || notes === null || notes === "") {
        return true;
      }

      const purifiedNotes = DOMPurify.sanitize(notes);
      if (purifiedNotes !== notes) {
        return false;
      }

      if (notes.length > 1000) {
        return false;
      }

      return true;
    }

    const date = data.date;
    const source = data.source;
    const amount = data.amount;
    const currency = data.currency;
    const category = data.category;
    const notes = data.notes;

    if (!dateCheck(date) || !sourceCheck(source) || !amountCheck(amount) || !currencyCheck(currency) || !categoryCheck(category) || !notesCheck(notes)) {
      return false;
    }

    return true;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        let paymentData = [];
        for (let line of lines) {
          // data entry example:
          /* 
                            ,11-07-2022,Govrnmt,$200.00,Expense reimbursement,
                            ,12-12-2022,Company,$469.39,Job,First month
                            ,12-22-2022,University,"$2,041.00",Job,22-23 First rate
                            ,01-03-2023,Family,"$11,000.00",Financial assistance,Parents
                            ,01-12-2023,Company,"$1,031.58",Job,Second month 
                            ,02-10-2023,Company,$535.60,Job,Third last month 
                    */

          // Replaces commas within quotes
          line = line.replace(/"([^"]*)"/g, function (match) {
            return match.replace(/,/g, "");
          });
          if (!line) continue;

          const data = line.split(",");
          const date = data[1];
          const source = data[2];
          const amount = data[3].replace(/[^0-9.]/g, "");

          const currencyMatch = data[3].match(/^\D+/); // matches the first non-digit character
          const currencyMatch2 = currencyMatch?.[0]?.replace(/[\\"']/g, "") || ""; // removes backslashes and double quotes
          const currencySymbol = currencyMatch2 ? currencyMatch2[0] : "";
          const currency = currencySymbol === "$" ? "USD" : "EUR";
          const category = data[4];
          const notes = data[5];
          if (checkInput({ date, source, amount, currency, category, notes })) {
            const enabled = true;
            paymentData.push({ enabled, date, source, amount, currency, category, notes });
          } else {
            // console.log("Invalid input: " + line);
            const enabled = false;
            paymentData.push({ enabled, date, source, amount, currency, category, notes });
          }
        }
        // console.log(paymentData);
        setPaymentData(paymentData);
        setOpenDialog(true);
      };
      reader.readAsText(file);
    }
  };

  function handleFile(file: File) {
    handleFileUpload({ target: { files: file } } as any);
  }

  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };
  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };
  const onButtonClick = function () {
    inputRef.current?.click();
  };

  return (
    <div className="p-5 bg-lightGrayCustom3 border-[1px] border-[#383b40] max-w-80 rounded-2xl text-sm select-none h-min">
      <AddPaymentWithFileModal
        isOpen={openDialog}
        paymentData={paymentData}
        handleClose={() => {
          setOpenDialog(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      />
      <div className="font-bold pb-3 text-lg">{gc?.title}</div>

      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input className="hidden" ref={fileInputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={` w-full ${dragActive ? "drag-active" : ""}`} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          <div
            className="transition ease-in-out duration-200 bg-darkGrayCustom2 border-[1px] border-[#383b40] rounded-md 
                        hover:bg-accentRedDarker p-5 cursor-pointer text-center"
          >
            <button className="upload-button font-bold" onClick={onButtonClick}>
              {gc?.chooseFile}
            </button>
            <p>{gc?.dragHere}</p>
          </div>
        </label>
        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
      </form>
    </div>
  );
}

// Credits:
// https://www.codemzy.com/blog/react-drag-drop-file-upload

// DONE: recolor the import csv modal
