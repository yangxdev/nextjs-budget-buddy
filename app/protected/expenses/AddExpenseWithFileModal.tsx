import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Key, useEffect, useState } from "react";
import GlobalConfig from "@/app/app.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultLanguage = GlobalConfig.i18n.defaultLanguage || "en";
const gc = GlobalConfig.i18n.translations[defaultLanguage as keyof typeof GlobalConfig.i18n.translations]?.expenses?.addExpense?.addExpenseWithFile?.addExpenseWithFileModal;

export default function AddExpenseWithFileModal(props: { expenseData: any; isOpen?: any; handleClose?: any }) {
    const { isOpen, handleClose } = props;
    const [checkboxes, setCheckboxes] = useState(new Array(props.expenseData.length).fill(false));
    const [selectedEntries, setSelectedEntries] = useState(0);

    useEffect(() => {
        const count = checkboxes.filter(Boolean).length;
        setSelectedEntries(count);
    }, [checkboxes]);

    const router = useRouter();
    function handleImport() {
        const updatedExpenseData = props.expenseData.map(
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
                if (props.expenseData[index].enabled && (document.getElementsByName("checkbox")[index] as HTMLInputElement).checked) {
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
        const filteredExpenseData = updatedExpenseData.filter((data: any) => data !== null);

        try {
            const responsePromises = filteredExpenseData.map((data: any) =>
                fetch("/api/database/add_expense", {
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
                    toast.success("Expense(s) added successfully", {
                    });
                })
                .catch(() => {
                    toast.error("Error when adding expense(s)", {
                        style: {
                            background: "#fff",
                            color: "#000",
                        },
                    });
                });
        } catch {
            toast.error("An error occurred while importing the data", {
                style: {
                    background: "#fff",
                    color: "#000",
                },
            });
        }
    }

    const widths = {
        checkbox: "w-12",
        date: "w-24",
        source: "w-32",
        amount: "w-20",
        currency: "w-20",
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-black select-none">
                                    {gc?.title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <span className="text-sm text-black opacity-90">
                                        <div className="flex flex-row justify-between items-center">
                                            <p className="select-none">{gc?.question}</p>
                                            <div className="flex flex-row gap-2 items-center">
                                                <div>
                                                    <button
                                                        className="
                            bg-whiteDarker 
                            shadow-sm
                            hover:shadow-md
                            border-[1px]
                            px-3 py-2 
                            rounded-md 
                            text-sm 
                            text-black
                            hover:bg-newBlue-500
                            hover:text-white
                            transition duration-100
                          "
                                                        onClick={() => {
                                                            setCheckboxes(new Array(props.expenseData.length).fill(true));
                                                            toast.success("All entries selected", {});
                                                        }}
                                                    >
                                                        {gc?.selectAll}
                                                    </button>
                                                </div>
                                                <div className="opacity-60 select-none">{"|"}</div>
                                                <div>
                                                    <button
                                                        className="
                                bg-whiteDarker
                                shadow-sm
                                hover:shadow-md
                                border-[1px]
                                px-3 py-2 
                                rounded-md 
                                text-sm 
                                text-black
                                hover:bg-newRed-500
                                hover:text-white 
                                transition duration-100
                                "
                                                        onClick={() => {
                                                            setCheckboxes(new Array(props.expenseData.length).fill(false));
                                                            toast.error("All entries unselected", {});
                                                        }}
                                                    >
                                                        {gc?.unselectAll}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="border border-lightBorder rounded-md p-2 mt-2 scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-[#8b8b8b] hover:scrollbar-thumb-[#bbbbbb] active:scrollbar-thumb-[#dddddd] overflow-y-scroll">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="font-bold select-none">
                                                        <td className={`${widths.checkbox} text-center`}></td>
                                                        <td className={`${widths.date} px-2`}>{gc?.date}</td>
                                                        <td className={`${widths.source} px-2`}>{gc?.source}</td>
                                                        <td className={`${widths.amount} px-2`}>{gc?.amount}</td>
                                                        <td className={`${widths.currency} px-2`}>{gc?.currency}</td>
                                                        <td className={`${widths.category} px-2`}>{gc?.category}</td>
                                                        <td className={`${widths.notes} px-2`}>{gc?.notes}</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className="max-h-[70vh] transition duration-100">
                                                {props.expenseData.map(
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
                                                                    <table className="w-full text-left text-black">
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
                                                                                        className="h-[1.1rem] w-[1.1rem] mt-1 accent-newBlue-500 cursor-pointer"
                                                                                    />
                                                                                </td>

                                                                                {/* date */}
                                                                                <td className={`${widths.date} bg-white text-black focus:outline-none hover:shadow-md transition duration-100 px-2 py-2 rounded-md cursor-text`}>
                                                                                    <input type="text" name="month" defaultValue={dateArray[0]} maxLength={2} className="w-5 text-center bg-transparent text-black" readOnly={false} />
                                                                                    <span>-</span>
                                                                                    <input type="text" name="day" defaultValue={dateArray[1]} maxLength={2} className="w-5 text-center bg-transparent text-black" readOnly={false} />
                                                                                    <span>-</span>
                                                                                    <input type="text" name="year" defaultValue={dateArray[2]} maxLength={4} className="w-9 text-center bg-transparent text-black" readOnly={false} />
                                                                                </td>

                                                                                {/* source */}
                                                                                <td className={`${widths.source}`}>
                                                                                    <input
                                                                                        name="source"
                                                                                        type="text"
                                                                                        defaultValue={data.source}
                                                                                        maxLength={100}
                                                                                        className={`${widths.source} bg-white text-black focus:outline-none hover:shadow-md transition duration-100 px-2 py-2 rounded-md cursor-text`}
                                                                                        readOnly={false}
                                                                                    />
                                                                                </td>

                                                                                {/* amount */}
                                                                                <td className={`${widths.amount}`}>
                                                                                    <input
                                                                                        name="amount"
                                                                                        type="text"
                                                                                        defaultValue={data.amount}
                                                                                        maxLength={10}
                                                                                        className={`${widths.amount} bg-white text-black focus:outline-none hover:shadow-md transition duration-100 px-2 py-2 rounded-md cursor-text`}
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
                                                                                    <select name="currency" defaultValue={data.currency} className={`${widths.currency} bg-white text-black focus:outline-none hover:shadow-md transition duration-100 py-2 px-2 rounded-md cursor-pointer`}>
                                                                                        {GlobalConfig.currency.currencies.map((currency, index) => {
                                                                                            return (
                                                                                                <option key={index} value={currency} className="">
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
                                                                                                e.target.classList.remove("text-black");
                                                                                                e.target.classList.add("text-accentOrange");
                                                                                            } else {
                                                                                                e.target.classList.remove("text-accentOrange");
                                                                                                e.target.classList.add("text-black");
                                                                                            }
                                                                                        }}
                                                                                        defaultValue={GlobalConfig.expenses.expenseCategories.includes(data.category) ? data.category : "Other"}
                                                                                        className={`${widths.category} bg-white text-black focus:outline-none hover:shadow-md transition duration-100 px-2 py-2 rounded-md cursor-pointer ${
                                                                                            !GlobalConfig.expenses.expenseCategories.includes(data.category) ? "text-newRed-500" : "text-black"
                                                                                        }`}
                                                                                    >
                                                                                        {GlobalConfig.expenses.expenseCategories.map((category, index) => {
                                                                                            return (
                                                                                                <option key={index} value={category} className={``}>
                                                                                                    {category}
                                                                                                </option>
                                                                                            );
                                                                                        })}
                                                                                    </select>
                                                                                </td>

                                                                                {/* notes */}
                                                                                <td className={`${widths.notes}`}>
                                                                                    <input
                                                                                        name="notes"
                                                                                        type="text"
                                                                                        defaultValue={data.notes}
                                                                                        maxLength={1000}
                                                                                        className={`${widths.notes} bg-white text-black focus:outline-none hover:shadow-md transition duration-100 px-2 py-2 rounded-md cursor-text`}
                                                                                        readOnly={false}
                                                                                    />
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
                                    <div className="text-xs opacity-70 select-none">
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
                                            <button className="inline-flex justify-center rounded-md border border-transparent bg-white shadow-sm hover:shadow-md px-4 py-2 text-sm font-medium transition duration-100 max-h-[2.35rem]" onClick={handleClose}>
                                                {gc?.cancelButton}
                                            </button>
                                            <button
                                                className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium hover:bg-newGreen-500 shadow-sm hover:shadow-md hover:text-white transition duration-100 max-h-[2.35rem]"
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
