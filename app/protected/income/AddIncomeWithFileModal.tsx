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
                    <div className="fixed inset-0 bg-black/25" />
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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-[#313131] p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white">
                                    Load imported income data
                                </Dialog.Title>
                                <Dialog.Description>
                                    <div className="mt-2">
                                        <p className='text-sm text-white opacity-90'>
                                            Do you want to load the following income data?
                                            <ul>
                                                {props.incomeData.map((data: {
                                                    date: string;
                                                    source: string;
                                                    amount: string;
                                                    category: string;
                                                    notes: string;
                                                }, index: Key | null | undefined) => (
                                                    <li key={index}>
                                                        {data.date} - {data.source} - {data.amount} - {data.category} - {data.notes}
                                                    </li>
                                                ))}</ul>
                                        </p>
                                    </div>
                                </Dialog.Description>

                                <div className="flex mt-4 gap-4">
                                    <button className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' onClick={handleClose}>Load</button>
                                    <button className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' onClick={handleClose}>Cancel</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}