"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Props {
  fileId: string;
  alt: string;
  token: string;
}

export function FileImage({ fileId, alt, token }: Props) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/files/${fileId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          }
        );
        const blobUrl = URL.createObjectURL(res.data);
        setUrl(blobUrl);
      } catch (err) {
        console.error("Gagal ambil gambar", err);
      }
    };

    fetchImage();

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [fileId]);

  if (!url) return <p className="text-sm text-neutral-400">Memuat gambar...</p>;

  return (
    <Image
      src={url}
      alt={alt}
      width={600}
      height={300}
      className="w-full h-auto mt-2 rounded-md"
    />
  );
}
