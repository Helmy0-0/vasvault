export async function fetchRecentFiles() {
    const res = await fetch("http://localhost:5000/api/files/");
    if (!res.ok) throw new Error("Failed to fetch file");
    return res.json();
}