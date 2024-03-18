import toast from "react-hot-toast";

const copyToClipboard = (event: React.MouseEvent<HTMLDivElement>) => {
    const textToCopy = (event.target as HTMLDivElement).textContent;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard! 📋", {
            style: {
                background: "#333",
                color: "#fff",
            },
        });
    }
};

export default copyToClipboard;
