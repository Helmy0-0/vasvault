'use client';

import { useEffect, useState } from 'react';
import ProfileButton from '@/components/ProfileButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
const base_url = process.env.NEXT_PUBLIC_API_BASE_URL

export default function DashboardPage() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const fetchFiles = async () => {
    try {
      
      const token = localStorage.getItem('token');
      const res = await fetch(`${base_url}/api/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await fetch(`${base_url}/api/files/upload`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      setFile(null);
      fetchFiles(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${base_url}/api/files/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-end">
        <ProfileButton />
      </div>

      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Upload File</h1>
        <div className="flex gap-2">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </section>

      <section className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold">Your Files</h2>
        {files.length === 0 && <p className="text-muted">No files uploaded.</p>}
        {files.map((f, idx) => (
          <Card key={idx} className="p-4 flex justify-between items-center">
            <span>{f.filename}</span>
            <Button variant="destructive" onClick={() => handleDelete(f.id)}>
              Delete
            </Button>
          </Card>
        ))}
      </section>
    </main>
  );
}
