import { ChangeEvent, useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

interface Note {
    id: string;
    date: Date;
    content: string;
}

export function App() {
    const [notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorage = localStorage.getItem("notes");

        if(notesOnStorage) {
            return JSON.parse(notesOnStorage);
        }
        
        return [];
    });

    const [search, setSearch] = useState("");

    function onNoteCreated(content: string) {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content
        };

        const newNotes = [newNote, ...notes];

        setNotes(newNotes);

        localStorage.setItem("notes", JSON.stringify(newNotes));
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    const filteredNotes = search !== "" ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase())) : notes;

    return (
        <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
            <img src={logo} alt="NLW Expert" />
            
            <form className="w-full">
                <input
                    className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
                    type="text"
                    placeholder="Busque suas notas"
                    onChange={handleSearch}
                />
            </form>

            <div className="h-px bg-slate-700" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[15rem]">
                <NewNoteCard onNoteCreated={onNoteCreated} />

                {filteredNotes.map(note => <NoteCard key={note.id} date={note.date} content={note.content} />)}
            </div>
        </div>
    );
}
