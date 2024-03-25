import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Key, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import GlobalConfig from "@/app/app.config";

export default function AddIncomeWithFileModal(props: { incomeData: any; isOpen?: any; handleClose?: any }) {
    const { isOpen, handleClose } = props;
    const [checkboxes, setCheckboxes] = useState(new Array(props.incomeData.length).fill(false));
    const [selectedEntries, setSelectedEntries] = useState(0);

    useEffect(() => {
        const count = checkboxes.filter(Boolean).length;
        setSelectedEntries(count);
    }, [checkboxes]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center min-h-full justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#313131] p-6 text-left align-middle shadow-xl transition-all max-h-80">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white select-none">
                                    Import income data
                                </Dialog.Title>
                                {/* <Dialog.Description> */}
                                <div className="mt-2">
                                    <span className="text-sm text-white opacity-90">
                                        <p className="select-none">Do you want to import the following income data?</p>
                                        <ul className="border border-[#535353] rounded-md p-2 mt-2">
                                            <table>
                                                <tbody>
                                                    <tr className="font-bold select-none">
                                                        <td className="w-24 text-center">
                                                            <button
                                                                onClick={() => {
                                                                    const areAllChecked = checkboxes.every(Boolean);
                                                                    const newCheckboxes = checkboxes.map(() => !areAllChecked);
                                                                    setCheckboxes(newCheckboxes);
                                                                }}
                                                                className="h-[1.1rem] w-fit accent-[#08931f]"
                                                            >
                                                                {checkboxes.every(Boolean) ? "Unselect all" : "Select all"}
                                                            </button>
                                                        </td>
                                                        <td className="w-24">Date</td>
                                                        <td className="w-24">Source</td>
                                                        <td className="w-24">Amount</td>
                                                        <td className="w-24">Currency</td>
                                                        <td className="w-24">Category</td>
                                                        <td className="w-24">Notes</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-[#8b8b8b] hover:scrollbar-thumb-[#bbbbbb] active:scrollbar-thumb-[#dddddd] overflow-y-scroll max-h-[70vh] pr-[0.5rem] transition duration-100">
                                                {props.incomeData.map(
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
                                                        // if (checkInput(data)) {
                                                        if (data.enabled) {
                                                            return (
                                                                <li key={index} className="py-1">
                                                                    <table className="w-full text-left text-white">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="w-24 items-center text-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={checkboxes[Number(index)]}
                                                                                        onChange={() => {
                                                                                            const newCheckboxes = [...checkboxes];
                                                                                            newCheckboxes[Number(index)] = !newCheckboxes[Number(index)];
                                                                                            setCheckboxes(newCheckboxes);
                                                                                        }}
                                                                                        className="h-[1.1rem] w-[1.1rem] mt-1 accent-[#08931f]"
                                                                                    />
                                                                                </td>
                                                                                <td className="w-24">
                                                                                    <input type="text" defaultValue={dateArray[0]} maxLength={2} className="w-5 text-center bg-transparent text-white" readOnly={false} />
                                                                                    <span>-</span>
                                                                                    <input type="text" defaultValue={dateArray[1]} maxLength={2} className="w-5 text-center bg-transparent text-white" readOnly={false} />
                                                                                    <span>-</span>
                                                                                    <input type="text" defaultValue={dateArray[2]} maxLength={4} className="w-9 text-center bg-transparent text-white" readOnly={false} />
                                                                                </td>
                                                                                <td className="w-24">
                                                                                    <input type="text" defaultValue={data.source} maxLength={100} className="w-20 bg-transparent text-white" readOnly={false} />
                                                                                </td>
                                                                                <td className="w-24">
                                                                                    <input
                                                                                        type="text"
                                                                                        defaultValue={data.amount}
                                                                                        maxLength={10}
                                                                                        className="w-20 bg-transparent text-white"
                                                                                        readOnly={false}
                                                                                        onKeyPress={(e) => {
                                                                                            const value = (e.target as HTMLInputElement).value + e.key;
                                                                                            const regex = /^[0-9]*\.?[0-9]*$/;
                                                                                            const decimalSplit = value.split(".");
                                                                                            const decimalPart = decimalSplit.length > 1 ? decimalSplit[1] : null;
                                                                                            if (!regex.test(value) || (decimalPart?.length ?? 0) > 2 || decimalSplit.length - 1 > 1) {
                                                                                                e.preventDefault();
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                </td>
                                                                                <td className="w-24">
                                                                                    <select
                                                                                        defaultValue={data.currency}
                                                                                        className="w-20 bg-transparent text-white
                                                                                            focus:outline-none dark:[color-scheme:dark]"
                                                                                    >
                                                                                        {GlobalConfig.currencies.map((currency, index) => {
                                                                                            return (
                                                                                                <option key={index} value={currency} className="bg-[#313131] dark:[color-scheme:dark]">
                                                                                                    {currency}
                                                                                                </option>
                                                                                            );
                                                                                        })}
                                                                                    </select>
                                                                                </td>
                                                                                <td className="w-24 max-w-24 pr-1 break-words">
                                                                                    <select
                                                                                        onChange={(e) => {
                                                                                            // if the category is updated, set text to white again
                                                                                            if (e.target.value === "Other") {
                                                                                                e.target.classList.remove("text-white");
                                                                                                e.target.classList.add("text-orange-500");
                                                                                            } else {
                                                                                                e.target.classList.remove("text-orange-500");
                                                                                                e.target.classList.add("text-white");
                                                                                            }
                                                                                        }}
                                                                                        defaultValue={GlobalConfig.incomeCategories.includes(data.category) ? data.category : "Other"}
                                                                                        className={`w-20 bg-transparent focus:outline-none dark:[color-scheme:dark] ${!GlobalConfig.incomeCategories.includes(data.category) ? "text-orange-500" : "text-white"}`}
                                                                                    >
                                                                                        {GlobalConfig.incomeCategories.map((category, index) => {
                                                                                            return (
                                                                                                <option key={index} value={category} className={`bg-[#313131] dark:[color-scheme:dark]`}>
                                                                                                    {category}
                                                                                                </option>
                                                                                            );
                                                                                        })}
                                                                                    </select>
                                                                                </td>
                                                                                <td>
                                                                                    {/* {data.notes} */}
                                                                                    <input type="text" defaultValue={data.notes} maxLength={1000} className="w-24 bg-transparent text-white" readOnly={false} />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </li>
                                                            );
                                                        } else {
                                                            return (
                                                                <li key={index} className="py-1">
                                                                    <table className="w-full text-left text-orange-500 line-through">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="w-24 text-center">
                                                                                    <input type="checkbox" className="h-[1.1rem] w-[1.1rem]" disabled />
                                                                                </td>
                                                                                <td className="w-24">{data.date}</td>
                                                                                <td className="w-24">{data.source}</td>
                                                                                <td className="w-24">{data.amount}</td>
                                                                                <td className="w-24">{data.currency}</td>
                                                                                <td className="w-24 max-w-24 pr-1 break-words">{data.category}</td>
                                                                                <td>{data.notes}</td>
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
                                {/* </Dialog.Description> */}

                                <div className="flex mt-4 justify-between">
                                    <div className="text-xs opacity-80 select-none">
                                        Note: if the currency is not recognized, it will be imported as &quot;USD&quot;.
                                        <br />
                                        If the category is not recognized, it will be imported as &quot;Other&quot;.
                                        <br />
                                        Invalid data entries are <span className="text-orange-500">crossed out</span>.
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <div className="select-none">
                                            <div>
                                                Selected: <span>{selectedEntries}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="inline-flex justify-center rounded-md border border-transparent bg-[#434343] px-4 py-2 text-sm font-medium hover:bg-[#565656] transition duration-100 max-h-[2.35rem]" onClick={handleClose}>
                                                Cancel
                                            </button>
                                            <button className="inline-flex justify-center rounded-md border border-transparent bg-[#08931f] px-4 py-2 text-sm font-medium hover:bg-[#067414] transition duration-100 max-h-[2.35rem]" onClick={handleClose}>
                                                Import
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
