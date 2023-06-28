import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces/Note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  @Output() onAddNote = new EventEmitter<Note>();

  success = false;

  form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required]],
    cover_image: ['']
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: any = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('cover_image', this.form.get('cover_image')?.value);
      console.log(this.form.get('cover_image')?.value)
      this.form.reset();
      this.noteService.createNote(formData).subscribe((note) => {
        this.onAddNote.emit(note);
        this.success = true;
      });
    }
  }

  uploadCoverImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        cover_image: file
      });
    }
  }
}
