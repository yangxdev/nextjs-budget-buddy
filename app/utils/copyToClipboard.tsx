const copyToClipboard = (event: React.MouseEvent<HTMLDivElement>) => {
    const textToCopy = (event.target as HTMLDivElement).textContent;
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
    }
}

export default copyToClipboard;