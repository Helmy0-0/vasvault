'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Bell, Grid, LayoutGrid, Plus, Search, Inbox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg",
        active && "bg-gray-100"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function FolderItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <span>{children}</span>
    </Link>
  );
}


interface User {
    id: number;
    email: string;
    files: File[];
}


function Dashboard({user, token}: {user : User, token: string}) {
    const [modal, setModal] = useState();
  return (
    <div className="flex h-screen bg-white">
      <div className="w-64 border-r bg-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">VASVAULT</h1>
        </div>
        <nav className="space-y-1 px-2">
          <NavItem href="#" icon={<LayoutGrid className="h-4 w-4" />} active>
            All content
          </NavItem>

          <div className="py-3">
            <div className="px-3 text-xs font-medium uppercase text-gray-500">
              Collections
            </div>
            <div className="mt-2">
              <FolderItem href="#">Product Demos</FolderItem>
              <FolderItem href="#">Case Studies</FolderItem>
              <FolderItem href="#">Sales Collateral</FolderItem>
              <FolderItem href="#">Training Materials</FolderItem>
            </div>
          </div>
        </nav>
      </div>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search files..." className="pl-9" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg"
                alt="Avatar"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Upload
            </Button>
            <Button variant="outline" className="gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download
            </Button>
            <Button variant="outline" className="gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Create folder
            </Button>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {user?.files?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {user.files.map((file: File) => (
                <div key={file.id} className="group relative overflow-hidden rounded-lg border bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <FileImage
                      fileId={file.id.toString()}
                      alt={file.filename}
                      token={token ?? ""}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{file.filename}</h3>
                    <p className="text-sm text-gray-500">
                      Ukuran: {(file.size / 1024).toFixed(1)} KB • {file.mimetype}
                    </p>
                    <p className="text-xs text-gray-400">
                      Diupload: {new Date(file.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 text-neutral-500 text-sm mt-4">
              <Inbox className="w-5 h-5" />
              Belum ada file yang diupload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard
