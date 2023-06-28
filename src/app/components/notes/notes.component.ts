import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/Note';
import { NoteService } from 'src/app/services/note.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  search = new FormControl();
  loading = false;
  notes: Note[] = [];
  editedNote: Note = {
    id: 0,
    title: '',
    description: '',
    cover_image: '',
  };
  showEditNote: boolean = false;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loading = true;
    this.noteService.getNotes().subscribe((notes) => {
      this.notes = notes;
      this.loading = false;
    });
  }

  onDelete(note: Note): void {
    this.noteService.deleteNote(note.id).subscribe(() => {
      this.notes = this.notes.filter((n) => n.id !== note.id);
    });
  }

  addNote(note: Note): void {
    this.notes.unshift(note);
  }

  updateNote(): void {
    this.showEditNote = false;
  }

  selectNoteToEdit(note: Note): void {
    this.editedNote = note;
    this.showEditNote = true;
  }

  searchNotes(): void {
    this.noteService.getNotes(this.search.value).subscribe((notes) => {
      this.notes = notes;
    });
  }

  resetSearchResults() {
    if (this.search.value) {
      const searchTextLower = this.search.value.toLowerCase();
      this.notes = this.notes.filter((note: { title: string }) =>
        note.title.toLowerCase().includes(searchTextLower)
      );
    } else {
      this.noteService.getNotes().subscribe(notes => (this.notes = notes));
    }
  }
  
  onSearchInputChange() {
    if (this.search.value === '') {
      this.resetSearchResults();
    }
  }
  
}
