import GlobalConfig from "@/app/app.config"

const addRandomIncomes = async () => {
    const sources = ["Job", "Investment", "Other"]; 
    const categories = GlobalConfig.income.incomeCategories; 
    const currencies = ["USD", "EUR"]; 
    for (let i = 0; i < 10; i++) {
        const source = sources[Math.floor(Math.random() * sources.length)];
        const date = new Date(2020 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString();
        const amount = (Math.random() * 1000).toFixed(2);
        const currency = currencies[Math.floor(Math.random() * currencies.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const notes = `Random note ${i + 1}`;

        const responsePromise = fetch("/api/database/add_income", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source,
                date,
                amount,
                currency,
                category,
                notes,
            }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response;
        });

        await responsePromise;
    }
};

export default addRandomIncomes;