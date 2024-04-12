import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Key, useEffect, useState } from "react";
import GlobalConfig from "@/app/app.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage]?.payment?.addPayment?.addPaymentWithFile?.addPaymentWithFileModal;

export default function AddPaymentWithFileModal(props: { paymentData: any; isOpen?: any; handleClose?: any }) {
  const { isOpen, handleClose } = props;
  const [checkboxes, setCheckboxes] = useState(new Array(props.paymentData.length).fill(false));
  const [selectedEntries, setSelectedEntries] = useState(0);

  useEffect(() => {
    const count = checkboxes.filter(Boolean).length;
    setSelectedEntries(count);
  }, [checkboxes]);

  const router = useRouter();
  function handleImport() {
    const updatedPaymentData = props.paymentData.map(
      (
        _data: {
          enabled: boolean;
          date: string;
          source: string;
          amount: string;
          currency: string;
          category: string;
          notes: string;
        },
        index: number
      ) => {
        if (props.paymentData[index].enabled && (document.getElementsByName("checkbox")[index] as HTMLInputElement).checked) {
          // const checkbox = (document.getElementsByName("checkbox")[index] as HTMLInputElement).checked;
          const date = `${(document.getElementsByName("month")[index] as HTMLInputElement).value}-${(document.getElementsByName("day")[index] as HTMLInputElement).value}-${(document.getElementsByName("year")[index] as HTMLInputElement).value}`;
          const source = (document.getElementsByName("source")[index] as HTMLInputElement).value;
          const amount = (document.getElementsByName("amount")[index] as HTMLInputElement).value;
          const currency = (document.getElementsByName("currency")[index] as HTMLSelectElement).value;
          const category = (document.getElementsByName("category")[index] as HTMLSelectElement).value;
          const notes = (document.getElementsByName("notes")[index] as HTMLInputElement).value;
          return {
            source: source,
            date: date,
            amount: amount,
            currency: currency,
            category: category,
            notes: notes,
          };
        } else {
          return null;
        }
      }
    );
    const filteredPaymentData = updatedPaymentData.filter((data: any) => data !== null);

    try {
      const responsePromises = filteredPaymentData.map((data: any) =>
        fetch("/api/database/add_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response;
        })
      );

      Promise.all(responsePromises)
        .then(() => {
          router.refresh();
          toast.success("Payment(s) added successfully", {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        })
        .catch(() => {
          toast.error("Error when adding payment(s)", {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
        });
    } catch {
      toast.error("An error occurred while importing the data", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  const widths = {
    checkbox: "w-12",
    date: "w-24",
    source: "w-32",
    amount: "w-20",
    currency: "w-16",
    category: "w-28",
    notes: "w-36",
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center min-h-full justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-darkGrayCustom p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-white select-none uppercase">
                  {gc?.title}
                </Dialog.Title>
                <div className="mt-2">
                  <span className="text-sm text-white opacity-90">
                    <div className="flex flex-row justify-between items-center">
                      <p className="select-none">{gc?.question}</p>
                      <div className="flex flex-row gap-2 items-center">
                        <div>
                          <button
                            className="
                            bg-lightGrayCustom4 
                            px-3 py-2 
                            rounded-md 
                            text-sm 
                            text-white 
                            hover:bg-accentGreenDarker 
                            transition duration-100
                          "
                            onClick={() => {
                              setCheckboxes(new Array(props.paymentData.length).fill(true));
                              toast.success("All entries selected", {
                                style: {
                                  background: "#333",
                                  color: "#fff",
                                },
                              });
                            }}
                          >
                            {gc?.selectAll}
                          </button>
                        </div>
                        <div className="opacity-60 select-none">{"|"}</div>
                        <div>
                          <button
                            className="
                                bg-lightGrayCustom4
                                px-3 py-2 
                                rounded-md 
                                text-sm 
                                text-white 
                                hover:bg-accentRed 
                                transition duration-100
                                "
                            onClick={() => {
                              setCheckboxes(new Array(props.paymentData.length).fill(false));
                              toast.error("All entries unselected", {
                                style: {
                                  background: "#333",
                                  color: "#fff",
                                },
                              });
                            }}
                          >
                            {gc?.unselectAll}
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="border border-[#535353] rounded-md p-2 mt-2 scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-[#8b8b8b] hover:scrollbar-thumb-[#bbbbbb] active:scrollbar-thumb-[#dddddd] overflow-y-scroll">
                      <table className="w-full">
                        <thead>
                          <tr className="font-bold select-none">
                            <td className={`${widths.checkbox} text-center`}></td>
                            <td className={`${widths.date}`}>{gc?.date}</td>
                            <td className={`${widths.source}`}>{gc?.source}</td>
                            <td className={`${widths.amount}`}>{gc?.amount}</td>
                            <td className={`${widths.currency}`}>{gc?.currency}</td>
                            <td className={`${widths.category}`}>{gc?.category}</td>
                            <td className={`${widths.notes}`}>{gc?.notes}</td>
                          </tr>
                        </thead>
                      </table>
                      <div className="max-h-[70vh] transition duration-100">
                        {props.paymentData.map(
                          (
                            data: {
                              enabled: boolean;
                              date: string;
                              source: string;
                              amount: string;
                              currency: string;
                              category: string;
                              notes: string;
                            },
                            index: Key | null | undefined
                          ) => {
                            const dateArray = data.date.split("-");
                            if (data.enabled) {
                              return (
                                <li key={index} className="py-1">
                                  <table className="w-full text-left text-white">
                                    <tbody>
                                      <tr>
                                        {/* checkbox */}
                                        <td className={`${widths.checkbox} items-center text-center`}>
                                          <input
                                            type="checkbox"
                                            name="checkbox"
                                            checked={checkboxes[Number(index)] || false}
                                            onChange={() => {
                                              const newCheckboxes = [...checkboxes];
                                              newCheckboxes[Number(index)] = !newCheckboxes[Number(index)];
                                              setCheckboxes(newCheckboxes);
                                            }}
                                            className="h-[1.1rem] w-[1.1rem] mt-1 accent-accentGreenDarkerer"
                                          />
                                        </td>

                                        {/* date */}
                                        <td className={`${widths.date}`}>
                                          <input type="text" name="month" defaultValue={dateArray[0]} maxLength={2} className="w-5 text-center bg-transparent text-white" readOnly={false} />
                                          <span>-</span>
                                          <input type="text" name="day" defaultValue={dateArray[1]} maxLength={2} className="w-5 text-center bg-transparent text-white" readOnly={false} />
                                          <span>-</span>
                                          <input type="text" name="year" defaultValue={dateArray[2]} maxLength={4} className="w-9 text-center bg-transparent text-white" readOnly={false} />
                                        </td>

                                        {/* source */}
                                        <td className={`${widths.source}`}>
                                          <input name="source" type="text" defaultValue={data.source} maxLength={100} className={`${widths.source} bg-transparent text-white`} readOnly={false} />
                                        </td>

                                        {/* amount */}
                                        <td className={`${widths.amount}`}>
                                          <input
                                            name="amount"
                                            type="text"
                                            defaultValue={data.amount}
                                            maxLength={10}
                                            className={`${widths.amount} bg-transparent text-white`}
                                            readOnly={false}
                                            // onKeyPress={(e) => {
                                            //   const value = (e.target as HTMLInputElement).value + e.key;
                                            //   const regex = /^[0-9]*\.?[0-9]*$/;
                                            //   const decimalSplit = value.split(".");
                                            //   const decimalPart = decimalSplit.length > 1 ? decimalSplit[1] : null;
                                            //   if (!regex.test(value) || (decimalPart?.length ?? 0) > 2 || decimalSplit.length - 1 > 1) {
                                            //     e.preventDefault();
                                            //   }
                                            // }}
                                          />
                                        </td>

                                        {/* currency */}
                                        <td className={`${widths.currency}`}>
                                          <select
                                            name="currency"
                                            defaultValue={data.currency}
                                            className={`${widths.currency} bg-transparent text-white focus:outline-none dark:
                                            [color-scheme:dark]`}
                                          >
                                            {GlobalConfig.currency.currencies.map((currency, index) => {
                                              return (
                                                <option key={index} value={currency} className="bg-[#313131] dark:[color-scheme:dark]">
                                                  {currency}
                                                </option>
                                              );
                                            })}
                                          </select>
                                        </td>

                                        {/* category */}
                                        <td className={`${widths.category} pr-1 break-words`}>
                                          <select
                                            name="category"
                                            onChange={(e) => {
                                              // if the category is updated, set text to white again
                                              if (e.target.value === "Other") {
                                                e.target.classList.remove("text-white");
                                                e.target.classList.add("text-accentOrange");
                                              } else {
                                                e.target.classList.remove("text-accentOrange");
                                                e.target.classList.add("text-white");
                                              }
                                            }}
                                            defaultValue={GlobalConfig.payment.paymentCategories.includes(data.category) ? data.category : "Other"}
                                            className={`${widths.category} bg-transparent focus:outline-none dark:[color-scheme:dark] ${!GlobalConfig.payment.paymentCategories.includes(data.category) ? "text-accentOrange" : "text-white"}`}
                                          >
                                            {GlobalConfig.payment.paymentCategories.map((category, index) => {
                                              return (
                                                <option key={index} value={category} className={`bg-[#313131] dark:[color-scheme:dark]`}>
                                                  {category}
                                                </option>
                                              );
                                            })}
                                          </select>
                                        </td>

                                        {/* notes */}
                                        <td className={`${widths.notes}`}>
                                          <input name="notes" type="text" defaultValue={data.notes} maxLength={1000} className={`${widths.notes} bg-transparent text-white`} readOnly={false} />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </li>
                              );
                            } else {
                              return (
                                <li key={index} className="py-1">
                                  <table className="w-full text-left text-accentOrange line-through">
                                    <tbody>
                                      <tr>
                                        <td className={`${widths.checkbox} text-center`}>
                                          <input type="checkbox" name="checkbox" disabled className="h-[1.1rem] w-[1.1rem]" />
                                        </td>
                                        <td className={`${widths.date}`}>
                                          <div className="hidden">
                                            <input name="month" />
                                            <input name="day" />
                                            <input name="year" />
                                          </div>
                                          {data.date}
                                        </td>
                                        <td className={`${widths.source}`}>
                                          <input name="source" className="hidden" />
                                          {data.source}
                                        </td>
                                        <td className={`${widths.amount}`}>
                                          <input name="amount" className="hidden" />
                                          {data.amount}
                                        </td>
                                        <td className={`${widths.currency}`}>
                                          <input name="currency" className="hidden" />
                                          {data.currency}
                                        </td>
                                        <td className={`${widths.category}`}>
                                          <input name="category" className="hidden" />
                                          {data.category}
                                        </td>
                                        <td className={`${widths.notes}`}>
                                          <input name="notes" className="hidden" />
                                          {data.notes}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </li>
                              );
                            }
                          }
                        )}
                      </div>
                    </ul>
                  </span>
                </div>

                <div className="flex mt-4 justify-between">
                  <div className="text-xs opacity-80 select-none">
                    {/* Note: if the currency is not recognized, it will be imported as &quot;USD&quot;. */}
                    {gc?.bottomNote[0]}
                    <br />
                    {/* If the category is not recognized, it will be imported as &quot;Other&quot;. */}
                    {gc?.bottomNote[1]}
                    <br />
                    {gc?.bottomNote[2]} <span className="text-accentOrange">{gc?.bottomNote[3]}</span>
                    {/* {"."} */}
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <div className="select-none text-nowrap">
                      {gc?.selectedCount}
                      {":"} <span className="font-semibold">{selectedEntries}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-[#434343] px-4 py-2 text-sm font-medium hover:bg-[#565656] transition duration-100 max-h-[2.35rem]" onClick={handleClose}>
                        {gc?.cancelButton}
                      </button>
                      <button
                        className="inline-flex justify-center rounded-md border border-transparent bg-accentGreen px-4 py-2 text-sm font-medium hover:bg-[#067414] transition duration-100 max-h-[2.35rem]"
                        onClick={() => {
                          handleImport();
                          handleClose();
                        }}
                      >
                        {gc?.importButton}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
