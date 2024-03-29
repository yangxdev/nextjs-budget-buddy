module.exports = {
    
    currency: {
        baseCurrency: "EUR",
        currencies: [
            "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD",
            "MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "RUB", "INR", "BRL", "ZAR",
            "TWB", "THB", "IDR", "HUF", "PLN", "PHP", "CZK", "ILS", "CLP", "PKR"
        ],
    },

    income: {
        incomeCategories: [
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
        defaultLanguage: "it",
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
        }
    },

    debug: {
        showAddRandomIncomeButton: false,
    }
}
