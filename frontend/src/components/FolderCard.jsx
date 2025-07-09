'use client';
import { Button } from '../components/ui/button';

export default function FolderCard({ name = "FOLDER NAME", onClick }){
    return (
        <Button variant="outline" className="w-[160px] h-[100px] test-ig" onClick={onClick}>
            {name}
        </Button>
    );
}