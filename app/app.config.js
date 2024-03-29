module.exports = {
    
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
                        "Morning, {username}!",
                        "Rise and shine, {username}!"
                    ],
                    afternoon: [
                        "Good afternoon, {username}!",
                        "Afternoon, {username}!",
                        "How's your day going, {username}?"
                    ],
                    evening: [
                        "Good evening, {username}!",
                        "Evening, {username}!",
                        "How was your day, {username}?"
                    ],
                    night: [
                        "Good night, {username}!",
                        "Night, {username}!",
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
                    }

                    // TODO: add translations for addIncomeWithFile + modal
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
                    }
                }
            }
        }
    },

    debug: {
        showAddRandomIncomeButton: false,
    }
}
