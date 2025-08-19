import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import Dashboard from "./dashboard";

export default async function FileManager() {
  const session = await getServerSession(authOptions);
  
  let token = null;

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
      token = session.user.token;
    } catch (error) {
      console.error("Gagal memuat data user:", error);
    }
  }

  return <Dashboard user={user} token={token as string} />
}
