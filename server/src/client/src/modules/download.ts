export const downloadFile = (fileName: string, src: string) => {
    const a = document.createElement('a');
    a.href = src;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};