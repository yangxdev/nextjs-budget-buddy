import toast from "react-hot-toast";

const copyToClipboard = (event: React.MouseEvent<HTMLDivElement>) => {
    const textToCopy = (event.target as HTMLDivElement).textContent;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard! 📋", {
            style: {
                background: "#fff",
                color: "#000",
            },
        });
    }
};

export default copyToClipboard;
