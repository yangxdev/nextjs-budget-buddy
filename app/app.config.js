module.exports = {
    debug: {
        showAddRandomEntriesButton: false,
    },

    currency: {
        baseCurrency: "EUR", // change the base currency here

        currencies: [ // add or remove currencies
            "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD",
            "MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "RUB", "INR", "BRL", "ZAR",
            "TWB", "THB", "IDR", "HUF", "PLN", "PHP", "CZK", "ILS", "CLP", "PKR"
        ],
    },

    income: {
        incomeCategories: [ // add or remove income categories
            "Job",
            "Gift",
            "Crypto",
            "Reward",
            "Savings",
            "Cashback",
            "Investment",
            "Scholarship",
            "Financial assistance",
            "Expense reimbursement",
            "Other"
        ],
    },

    payment: {
        paymentCategories: [
            "Groceries",
            "Car maintenance",
            "Car payment",
            "Car insurance",
            "Clothing",
            "Condo fees",
            "Debt",
            "Electronics",
            "Entertainment",
            "Gas",
            "Gifts",
            "Going out",
            "Gym",
            "Home maintenance",
            "Insurance",
            "Medical",
            "Mortgage",
            "Other",
            "Public transportation",
            "Rent",
            "Restaurant",
            "Phone bills",
            "Travel",
            "Utilities",
            "Work",
            "Lunch/Dinner outside",
            "Personal care",
            "Sport",
            "Café",
            "Snacks",
            "Car rent",
            "Fees",
            "Savings",
            "Amazon",
            "Pension",
            "Cash",
            "Home Bills",
            "ETF",
        ],
    },

    i8n: {
        defaultLanguage: "en", // change the default language here
        languages: [
            "en", "fr", "de", "es", "it", "pt", "ru", "zh", "ja", "ko"
        ],
        greetings: {
            en: {
                basic: [
                    "Hi, {username}!",
                    "Hello, {username}!",
                    "Greetings, {username}!",
                    "Welcome back, {username}!",
                    "Hey, {username}!"
                ],
                timed: {
                    morning: [
                        "Good morning, {username}!",
                        "Rise and shine, {username}!"
                    ],
                    afternoon: [
                        "Good afternoon, {username}!",
                        "How's your day going, {username}?"
                    ],
                    evening: [
                        "Good evening, {username}!",
                        "How was your day, {username}?"
                    ],
                    night: [
                        "Good night, {username}!",
                        "'night, {username}!",
                        "Sleep well, {username}!"
                    ]
                }
            },
            it: {
                basic: [
                    "Ciao, {username}!",
                    "Salve, {username}!",
                    "Ben tornato, {username}!",
                    "Ehi, {username}!"
                ],
                timed: {
                    morning: [
                        "Buongiorno, {username}!",
                        "Ben svegliato, {username}!",
                        "Buona giornata, {username}!"
                    ],
                    afternoon: [
                        "Buon pomeriggio, {username}!",
                        "Pausa caffé, {username}?",
                        "Come va, {username}?"
                    ],
                    evening: [
                        "Buona sera, {username}!",
                        "Come è andata la giornata, {username}?",
                        "Buon riposo, {username}!"
                    ],
                    night: [
                        "Buona notte, {username}!",
                        "Notte, {username}!",
                        "A domani, {username}!"
                    ]
                }
            }
        },
        translations: {
            en: {
                navMenu: {
                    dashboard: "Dashboard",
                    payment: "Payment",
                    income: "Income",
                    debt: "Debt",
                    savings: "Savings",
                    crypto: "Crypto",

                    settings: "Settings",
                    signOut: "Sign out",
                },

                addIncome: {
                    title: "Income",

                    addIncomeForm: {
                        title: "Add income",
                        date: "Date",
                        source: "Source",
                        amount: "Amount",
                        currency: "Currency",
                        category: "Category",
                        notes: "Notes (optional)",

                        reset: "Reset",
                        add: "Add",
                        addRandom: "Add 10 random incomes"
                    },

                    addIncomeWithFile: {
                        title: "Import CSV",
                        chooseFile: "Choose a file",
                        dragHere: "or drag it here",

                        addIncomeWithFileModal: {
                            title: "Import income data",
                            question: "Do you want to import the following income data?",

                            selectAll: "Select all",
                            unselectAll: "Unselect all",
                            date: "Date",
                            source: "Source",
                            amount: "Amount",
                            currency: "Currency",
                            category: "Category",
                            notes: "Notes",

                            bottomNote: [
                                `Note: if the currency is not recognized, it will be imported as the default currency.`,
                                `If the category is not recognized, it will be imported as "Other".`,
                                // "Invalid or unrecognized entries are ",
                                // "highlighted"
                            ],

                            selectedCount: "Selected",
                            cancelButton: "Cancel",
                            importButton: "Import"
                        }
                    }
                },
                incomeInfoSummary: {
                    title: "Summary",

                    noIncomeDataAvailable: "No income data available",

                    thisYear: "This year",
                    thisMonth: "This month",
                    thisWeek: "This week"
                },
                incomeInfoGraph: {
                    title: "Categories",

                    noIncomeDataAvailable: "No income data available",

                    buttonThisWeek: "This week",
                    buttonThisMonth: "This month",
                    buttonThisYear: "This year",

                    buttonDefault: "doughnutYearly"
                },
                incomeInfoHistory: {
                    title: "History",

                    noIncomeDataAvailable: "No income data available",
                },

                addPayment: {
                    title: "Payment",

                    addPaymentForm: {
                        title: "Add payment",
                        date: "Date",
                        source: "Source",
                        amount: "Amount",
                        currency: "Currency",
                        category: "Category",
                        notes: "Notes (optional)",

                        reset: "Reset",
                        add: "Add",
                        addRandom: "Add 10 random payments"
                    },

                    addPaymentWithFile: {
                        title: "Import CSV",
                        chooseFile: "Choose a file",
                        dragHere: "or drag it here",

                        addPaymentWithFileModal: {
                            title: "Import payment data",
                            question: "Do you want to import the following payment data?",

                            selectAll: "Select all",
                            unselectAll: "Unselect all",
                            date: "Date",
                            source: "Source",
                            amount: "Amount",
                            currency: "Currency",
                            category: "Category",
                            notes: "Notes",

                            bottomNote: [
                                `Note: if the currency is not recognized, it will be imported as the default currency.`,
                                `If the category is not recognized, it will be imported as "Other".`,
                                // "Invalid or unrecognized entries are ",
                                // "highlighted"
                            ],

                            selectedCount: "Selected",
                            cancelButton: "Cancel",
                            importButton: "Import"
                        }
                    }
                },
                paymentInfoSummary: {
                    title: "Summary",

                    noPaymentDataAvailable: "No payment data available",

                    thisYear: "This year",
                    thisMonth: "This month",
                    thisWeek: "This week"
                },
                paymentInfoGraph: {
                    title: "Categories",

                    noPaymentDataAvailable: "No payment data available",

                    buttonThisWeek: "This week",
                    buttonThisMonth: "This month",
                    buttonThisYear: "This year",

                    buttonDefault: "doughnutYearly"
                },
                paymentInfoHistory: {
                    title: "History",

                    noPaymentDataAvailable: "No payment data available",
                }
            },
            it: {
                navMenu: {
                    dashboard: "Dashboard",
                    payment: "Pagamenti",
                    income: "Entrate",
                    debt: "Debiti",
                    savings: "Risparmi",
                    crypto: "Criptovalute",

                    settings: "Impostazioni",
                    signOut: "Esci",
                },
                addIncome: {
                    title: "Entrate",

                    addIncomeForm: {
                        title: "Aggiungi entrata",
                        date: "Data",
                        source: "Fonte",
                        amount: "Importo",
                        currency: "Valuta",
                        category: "Categoria",
                        notes: "Note (opzionale)",

                        reset: "Annulla",
                        add: "Aggiungi",
                        addRandom: "Aggiungi 10 entrate casuali"
                    },

                    addIncomeWithFile: {
                        title: "Carica CSV",
                        chooseFile: "Scegli un file",
                        dragHere: "o trascinalo qui",
                    
                        addIncomeWithFileModal: {
                            title: "Caricamento CSV",
                            question: "Vuoi importare i seguenti dati?",
                    
                            selectAll: "Seleziona",
                            unselectAll: "Deseleziona",
                            date: "Data",
                            source: "Fonte",
                            amount: "Importo",
                            currency: "Valuta",
                            category: "Categoria",
                            notes: "Note",
                    
                            bottomNote: [
                                `Nota: se la valuta non è riconosciuta, verrà importata come la valuta di default.`,
                                `Se la categoria non è riconosciuta, verrà importata come "Altro".`,
                                // "Le voci non valide o non riconosciute sono ",
                                // "evidenziate"
                            ],
                    
                            selectedCount: "Selezionato",
                            cancelButton: "Annulla",
                            importButton: "Importa"
                        }
                    }
                    
                },
                incomeInfoSummary: {
                    title: "Sommario",
                
                    noIncomeDataAvailable: "Nessun dato sul reddito disponibile",
                
                    thisYear: "Quest'anno",
                    thisMonth: "Questo mese",
                    thisWeek: "Questa settimana"
                },
                incomeInfoGraph: {
                    title: "Categorie",
                
                    noIncomeDataAvailable: "Nessun dato sul reddito disponibile",

                    buttonThisWeek: "Questa sett.",
                    buttonThisMonth: "Questo mese",
                    buttonThisYear: "Quest'anno",
                },
                incomeInfoHistory: {
                    title: "Cronologia",
                
                    noIncomeDataAvailable: "Nessun dato sul reddito disponibile",
                },

                addPayment: {
                    title: "Pagamento",

                    addPaymentForm: {
                        title: "Aggiungi pagamento",
                        date: "Data",
                        source: "Fonte",
                        amount: "Importo",
                        currency: "Valuta",
                        category: "Categoria",
                        notes: "Note (opzionale)",

                        reset: "Annulla",
                        add: "Aggiungi",
                        addRandom: "Aggiungi 10 pagamenti casuali"
                    },

                    addPaymentWithFile: {
                        title: "Carica CSV",
                        chooseFile: "Scegli un file",
                        dragHere: "o trascinalo qui",
                    
                        addPaymentWithFileModal: {
                            title: "Caricamento CSV",
                            question: "Vuoi importare i seguenti dati?",
                    
                            selectAll: "Seleziona",
                            unselectAll: "Deseleziona",
                            date: "Data",
                            source: "Fonte",
                            amount: "Importo",
                            currency: "Valuta",
                            category: "Categoria",
                            notes: "Note",
                    
                            bottomNote: [
                                `Nota: se la valuta non è riconosciuta, verrà importata come la valuta di default.`,
                                `Se la categoria non è riconosciuta, verrà importata come "Altro".`,
                                // "Le voci non valide o non riconosciute sono ",
                                // "evidenziate"
                            ],
                    
                            selectedCount: "Selezionato",
                            cancelButton: "Annulla",
                            importButton: "Importa"
                        }
                    }
                },
                paymentInfoSummary: {
                    title: "Sommario",
                
                    noPaymentDataAvailable: "Nessun dato sui pagamenti disponibile",
                
                    thisYear: "Quest'anno",
                    thisMonth: "Questo mese",
                    thisWeek: "Questa settimana"
                },
                paymentInfoGraph: {
                    title: "Categorie",
                
                    noPaymentDataAvailable: "Nessun dato sui pagamenti disponibile",

                    buttonThisWeek: "Questa sett.",
                    buttonThisMonth: "Questo mese",
                    buttonThisYear: "Quest'anno",
                },
                paymentInfoHistory: {
                    title: "Cronologia",
                
                    noPaymentDataAvailable: "Nessun dato sui pagamenti disponibile",
                }
            }
        }
    },
}
