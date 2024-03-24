import { Dialog, Transition } from '@headlessui/react'
import { Fragment, Key } from 'react'

export default function AddIncomeWithFileModal(props: { incomeData: any; isOpen?: any; handleClose?: any; }) {
    const { isOpen, handleClose } = props;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#313131] p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white select-none">
                                    Import income data
                                </Dialog.Title>
                                <Dialog.Description>
                                    <div className="mt-2">
                                        <p className='text-sm text-white opacity-90'>
                                            <div className="select-none">Do you want to import the following income data?</div>
                                            <ul className='border border-[#535353] rounded-md p-2 mt-2'>
                                                <table>
                                                    <tbody>
                                                        <tr className='font-bold select-none'>
                                                            <td className='w-24'>Date</td>
                                                            <td className='w-24'>Source</td>
                                                            <td className='w-24'>Amount</td>
                                                            <td className='w-24'>Currency</td>
                                                            <td className='w-24'>Category</td>
                                                            <td>Notes</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                {props.incomeData.map((data: {
                                                    date: string;
                                                    source: string;
                                                    amount: string;
                                                    currency: string;
                                                    category: string;
                                                    notes: string;
                                                }, index: Key | null | undefined) => (
                                                    <li key={index} className='py-1'>
                                                        <table className='w-full text-left text-white'>
                                                            <tbody>
                                                                <tr>
                                                                    <td className='w-24'>{data.date}</td>
                                                                    <td className='w-24'>{data.source}</td>
                                                                    <td className='w-24'>{data.amount}</td>
                                                                    <td className='w-24'>{data.currency}</td>
                                                                    <td className='w-24 max-w-24 pr-1 break-words'>{data.category}</td>
                                                                    <td>{data.notes}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </li>
                                                ))}</ul>
                                        </p>
                                    </div>
                                </Dialog.Description>

                                <div className="flex mt-4 justify-between">
                                    <div className='text-xs opacity-80 select-none'>Note: if the currency is not USD, it will be imported as EUR.<br />
                                                    If the category is not recognized, it will be imported as &quot;Other&quot;.
                                    </div>
                                    <div className="flex gap-2">
                                        <button className='inline-flex justify-center rounded-md border border-transparent bg-[#434343] px-4 py-2 text-sm font-medium hover:bg-[#565656] transition duration-100' onClick={handleClose}>Cancel</button>
                                        <button className='inline-flex justify-center rounded-md border border-transparent bg-[#08931f] px-4 py-2 text-sm font-medium hover:bg-[#067414] transition duration-100' onClick={handleClose}>Import</button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}