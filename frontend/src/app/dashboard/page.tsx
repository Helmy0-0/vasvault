import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, Inbox } from "lucide-react";
import { FileImage } from "./FileImage";

interface File {
  id: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
  userId: number;
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  let user = null;

  if (session?.user?.id) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/auth/users/${session.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      user = res.data;
    } catch (error) {
      console.error("Gagal memuat data user:", error);
    }
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-semibold text-neutral-800 dark:text-white">Profil</h1>

      <Card className="p-6 shadow-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
        <p className="text-sm text-neutral-500 mb-1">Email:</p>
        <p className="text-base font-medium text-neutral-800 dark:text-white">
          {user?.email ?? "Tidak tersedia"}
        </p>
      </Card>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">File Upload</h2>

        {user?.files?.length > 0 ? (
          <ScrollArea className="max-h-80 pr-2 scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-transparent">
            <div className="space-y-4 pr-2">
              {user.files.map((file: File) => (
                <Card
                  key={file.id}
                  className="p-4 flex gap-4 items-start shadow-sm border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                >
                  <FileIcon className="w-5 h-5 mt-1 text-neutral-500" />
                  <div className="space-y-1 w-full">
                    <p className="font-medium text-neutral-800 dark:text-white">{file.filename}</p>
                    <p className="text-sm text-neutral-500">
                      Ukuran: {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <Badge variant="secondary" className="mt-1 w-fit">
                      {file.mimetype}
                    </Badge>

                    <FileImage
                      fileId={file.id.toString()}
                      alt={file.filename}
                      token={session?.user?.token ?? ""}
                    />

                    <p className="text-xs text-neutral-400">
                      Diupload: {new Date(file.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center gap-3 text-neutral-500 text-sm mt-4">
            <Inbox className="w-5 h-5" />
            Belum ada file yang diupload.
          </div>
        )}
      </section>
    </main>
  );
}
