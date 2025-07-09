'use client';
import { Card } from "../components/ui/card";

export default function RecentFileItem({ label }){
    return (
        <Card className="w-full py-3 px-5 rounded-xl test-lg mb-2">
            {label}
        </Card>
    );
}