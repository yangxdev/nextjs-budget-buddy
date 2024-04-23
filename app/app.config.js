module.exports = {
    debug: {
        showAddRandomEntriesButton: true,
    },

    currency: {
        baseCurrency: "EUR", // change the base currency here

        currencies: [
            // add or remove currencies
            "USD",
            "EUR",
            "JPY",
            "GBP",
            "AUD",
            "CAD",
            "CHF",
            "CNY",
            "SEK",
            "NZD",
            "MXN",
            "SGD",
            "HKD",
            "NOK",
            "KRW",
            "TRY",
            "RUB",
            "INR",
            "BRL",
            "ZAR",
            "TWB",
            "THB",
            "IDR",
            "HUF",
            "PLN",
            "PHP",
            "CZK",
            "ILS",
            "CLP",
            "PKR",
        ],
    },

    income: {
        incomeCategories: [
            // add or remove income categories
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
            "Other",
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

    i18n: {
        defaultLanguage: "en", // <<< change the default language here, remember to refresh the page after changing it

        languages: ["en", "it"],
        greetings: {
            en: {
                basic: ["Hi, {username}!", "Hello, {username}!", "Greetings, {username}!", "Welcome back, {username}!", "Hey, {username}!"],
                timed: {
                    morning: ["Good morning, {username}!", "Rise and shine, {username}!"],
                    afternoon: ["Good afternoon, {username}!", "How's your day going, {username}?"],
                    evening: ["Good evening, {username}!", "How was your day, {username}?"],
                    night: ["Good night, {username}!", "'night, {username}!", "Sleep well, {username}!"],
                },
            },
            it: {
                basic: ["Ciao, {username}!", "Salve, {username}!", "Ben tornato, {username}!", "Ehi, {username}!"],
                timed: {
                    morning: ["Buongiorno, {username}!", "Ben svegliato, {username}!", "Buona giornata, {username}!"],
                    afternoon: ["Buon pomeriggio, {username}!", "Pausa caffé, {username}?", "Come va, {username}?"],
                    evening: ["Buona sera, {username}!", "Come è andata la giornata, {username}?", "Buon riposo, {username}!"],
                    night: ["Buona notte, {username}!", "Notte, {username}!", "A domani, {username}!"],
                },
            },
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

                dashboard: {
                    title: "Dashboard",
                    subtitle: "Summary of your data in the last month",
                },

                income: {
                    title: "Income",
                    addIncome: {
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
                            addRandom: "+10 entries",
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
                                importButton: "Import",
                            },
                        },
                    },
                    incomeInfoSummary: {
                        title: "Summary",

                        noIncomeDataAvailable: "No income data available",

                        thisYear: "This year",
                        thisMonth: "This month",
                        thisWeek: "This week",
                    },
                    incomeInfoChart: {
                        title: "Categories",

                        noPaymentDataAvailable: "No income data available",

                        // buttonThisWeek: "This week",
                        // buttonThisMonth: "This month",
                        // buttonThisYear: "This year",
                        buttonThisWeek: "1w",
                        buttonThisMonth: "1M",
                        buttonThisYear: "1y",
                        buttonThreeYears: "3y",
                        buttonAllTime: "All",

                        buttonDefault: "doughnutYearly",
                    },
                    incomeInfoHistory: {
                        title: "History",

                        noIncomeDataAvailable: "No income data available",
                    },
                },

                payment: {
                    title: "Payments",
                    addPayment: {
                        addPaymentForm: {
                            title: "Add payment",
                            date: "Date",
                            source: "Store / Vendor",
                            amount: "Amount",
                            currency: "Currency",
                            category: "Category",
                            notes: "Notes (optional)",

                            reset: "Reset",
                            add: "Add",
                            addRandom: "+10 entries",
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
                                source: "Store / Vendor",
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
                                importButton: "Import",
                            },
                        },
                    },
                    paymentInfoSummary: {
                        title: "Summary",

                        noPaymentDataAvailable: "No payment data available",

                        thisYear: "This year",
                        thisMonth: "This month",
                        thisWeek: "This week",
                    },
                    paymentInfoChart: {
                        title: "Categories",

                        noPaymentDataAvailable: "No payment data available",

                        // buttonThisWeek: "This week",
                        // buttonThisMonth: "This month",
                        // buttonThisYear: "This year",
                        buttonThisWeek: "1w",
                        buttonThisMonth: "1M",
                        buttonThisYear: "1y",
                        buttonThreeYears: "3y",
                        buttonAllTime: "All",

                        buttonDefault: "doughnutYearly",
                    },
                    paymentInfoHistory: {
                        title: "History",

                        noPaymentDataAvailable: "No payment data available",
                    },
                    paymentInfoInsights: {
                        title: "Insights ( this year )",

                        mostExpensivePayment: "Most expensive payment",
                        mostExpensiveCategory: "Most expensive category",
                        mostExpensiveMonth: "Most expensive month",
                        mostFrequentPayment: "Most frequent payment",
                        cheapestPayment: "Cheapest payment",
                        averagePaymentAmount: "Average payment amount",
                        totalPaymentsMade: "Total payments made",

                        at: "@",
                        times: "times",
                        spent: "spent",
                        payments: "payments",
                        payment: "payment",

                        noPaymentDataAvailable: "No payment data available",
                    },
                },
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

                dashboard: {
                    title: "Dashboard",
                    subtitle: "Sommario dei tuoi dati nell'ultimo mese",
                },

                income: {
                    title: "Entrate",
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
                            addRandom: "Aggiungi 10 entrate casuali",
                        },

                        addIncomeWithFile: {
                            title: "Carica CSV",
                            chooseFile: "Scegli un file",
                            dragHere: "o trascinalo qui",

                            addIncomeWithFileModal: {
                                title: "Caricamento CSV",
                                question: "Vuoi importare i seguenti dati?",

                                selectAll: "Seleziona tutto",
                                unselectAll: "Deseleziona tutto",
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

                                selectedCount: "Selezionati",
                                cancelButton: "Annulla",
                                importButton: "Importa",
                            },
                        },
                    },
                    incomeInfoSummary: {
                        title: "Sommario",

                        noIncomeDataAvailable: "Nessun dato sul reddito disponibile",

                        thisYear: "Quest'anno",
                        thisMonth: "Questo mese",
                        thisWeek: "Questa settimana",
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
                },

                payment: {
                    title: "Pagamenti",
                    addPayment: {
                        title: "Pagamento",

                        addPaymentForm: {
                            title: "Aggiungi pagamento",
                            date: "Data",
                            source: "Negozio / Venditore",
                            amount: "Importo",
                            currency: "Valuta",
                            category: "Categoria",
                            notes: "Note (opzionale)",

                            reset: "Annulla",
                            add: "Aggiungi",
                            addRandom: "Aggiungi 10 pagamenti casuali",
                        },

                        addPaymentWithFile: {
                            title: "Carica CSV",
                            chooseFile: "Scegli un file",
                            dragHere: "o trascinalo qui",

                            addPaymentWithFileModal: {
                                title: "Caricamento CSV",
                                question: "Vuoi importare i seguenti dati?",

                                selectAll: "Seleziona tutto",
                                unselectAll: "Deseleziona tutto",
                                date: "Data",
                                source: "Negozio / Venditore",
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

                                selectedCount: "Selezionati",
                                cancelButton: "Annulla",
                                importButton: "Importa",
                            },
                        },
                    },
                    paymentInfoSummary: {
                        title: "Sommario",

                        noPaymentDataAvailable: "Nessun dato sui pagamenti disponibile",

                        thisYear: "Quest'anno",
                        thisMonth: "Questo mese",
                        thisWeek: "Questa settimana",
                    },
                    paymentInfoChart: {
                        title: "Categorie",

                        noPaymentDataAvailable: "Nessun dato sui pagamenti disponibile",

                        // buttonThisWeek: "Questa sett.",
                        // buttonThisMonth: "Questo mese",
                        // buttonThisYear: "Quest'anno",
                        buttonThisWeek: "1w",
                        buttonThisMonth: "1M",
                        buttonThisYear: "1y",
                        buttonThreeYears: "3y",
                        buttonAllTime: "Tutto",
                    },
                    paymentInfoHistory: {
                        title: "Cronologia",

                        noPaymentDataAvailable: "Nessun dato sui pagamenti disponibile",
                    },
                    paymentInfoInsights: {
                        title: "Insights",

                        mostExpensivePayment: "Pagamento più costoso",
                        mostExpensiveCategory: "Categoria più costosa",
                        mostExpensiveMonth: "Mese più costoso",
                        mostFrequentPayment: "Pagamento più frequente",
                        cheapestPayment: "Pagamento meno costoso",
                        averagePaymentAmount: "Media dei pagamenti",
                        totalPaymentsMade: "Pagamenti totali",

                        at: "@",
                        times: "volte",
                        spent: "spesi",
                        payments: "pagamenti",
                        payment: "pagamento",

                        noPaymentDataAvailable: "Nessun dato sui pagamenti disponibile",
                    },
                },
            },
        },
    },
};
