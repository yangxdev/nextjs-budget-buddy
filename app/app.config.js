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

    expenses: {
        expenseCategories: [
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
                    expenses: "Expenses",
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

                        noExpenseDataAvailable: "No income data available",

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

                expenses: {
                    title: "Expenses",
                    addExpense: {
                        addExpenseForm: {
                            title: "Add expense",
                            date: "Date",
                            source: "Store / Vendor",
                            amount: "Amount",
                            currency: "Currency",
                            category: "Category",
                            notes: "Notes",

                            reset: "Reset",
                            add: "Add",
                            addRandom: "+10 entries",
                        },

                        addExpenseWithFile: {
                            title: "Import CSV",
                            chooseFile: "Choose a file",
                            dragHere: "or drag it here",

                            addExpenseWithFileModal: {
                                title: "Import expense data",
                                question: "Do you want to import the following expense data?",

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
                    expenseInfoSummary: {
                        title: "Summary",

                        noExpenseDataAvailable: "No expense data available",

                        thisYear: "This year",
                        thisMonth: "This month",
                        thisWeek: "This week",
                    },
                    expenseInfoChart: {
                        title: "Categories",

                        noExpenseDataAvailable: "No expense data available",

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
                    expenseInfoHistory: {
                        title: "History",

                        noExpenseDataAvailable: "No expense data available",
                    },
                    expenseInfoInsights: {
                        title: "Insights ( this year )",

                        mostExpensiveExpense: "Most expensive expense",
                        mostExpensiveCategory: "Most expensive category",
                        mostExpensiveMonth: "Most expensive month",
                        mostFrequentExpense: "Most frequent expense",
                        cheapestExpense: "Cheapest expense",
                        averageExpenseAmount: "Average expense amount",
                        totalExpensesMade: "Total expenses made",

                        at: "@",
                        times: "times",
                        spent: "spent",
                        expenses: "expenses",
                        expense: "expense",

                        noExpenseDataAvailable: "No expense data available",
                    },
                },
            },
            it: {
                navMenu: {
                    dashboard: "Dashboard",
                    expenses: "Spese",
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

                expenses: {
                    title: "Spese",
                    addExpense: {
                        title: "Pagamento",

                        addExpenseForm: {
                            title: "Aggiungi spesa",
                            date: "Data",
                            source: "Negozio / Venditore",
                            amount: "Importo",
                            currency: "Valuta",
                            category: "Categoria",
                            notes: "Note",

                            reset: "Annulla",
                            add: "Aggiungi",
                            addRandom: "Aggiungi 10 spese casuali",
                        },

                        addExpenseWithFile: {
                            title: "Carica CSV",
                            chooseFile: "Scegli un file",
                            dragHere: "o trascinalo qui",

                            addExpenseWithFileModal: {
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
                    expenseInfoSummary: {
                        title: "Sommario",

                        noExpenseDataAvailable: "Nessun dato sulle spese disponibile",

                        thisYear: "Quest'anno",
                        thisMonth: "Questo mese",
                        thisWeek: "Questa settimana",
                    },
                    expenseInfoChart: {
                        title: "Categorie",

                        noExpenseDataAvailable: "Nessun dato sulle spese disponibile",

                        // buttonThisWeek: "Questa sett.",
                        // buttonThisMonth: "Questo mese",
                        // buttonThisYear: "Quest'anno",
                        buttonThisWeek: "1w",
                        buttonThisMonth: "1M",
                        buttonThisYear: "1y",
                        buttonThreeYears: "3y",
                        buttonAllTime: "Tutto",

                        buttonDefault: "doughnutYearly",
                    },
                    expenseInfoHistory: {
                        title: "Cronologia",

                        noExpenseDataAvailable: "Nessun dato sulle spese disponibile",
                    },
                    expenseInfoInsights: {
                        title: "Insights",

                        mostExpensiveExpense: "Pagamento più costoso",
                        mostExpensiveCategory: "Categoria più costosa",
                        mostExpensiveMonth: "Mese più costoso",
                        mostFrequentExpense: "Pagamento più frequente",
                        cheapestExpense: "Pagamento meno costoso",
                        averageExpenseAmount: "Media delle spese",
                        totalExpensesMade: "Spese totali",

                        at: "@",
                        times: "volte",
                        spent: "spesi",
                        expenses: "spese",
                        expense: "spesa",

                        noExpenseDataAvailable: "Nessun dato sulle spese disponibile",
                    },
                },
            },
        },
    },
};
