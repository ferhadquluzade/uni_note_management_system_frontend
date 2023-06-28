import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/interfaces/Note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  @Input() note: Note = {
    id: 0,
    title: '',
    description: '',
    cover_image: ''
  };

  @Output() onUpdateNote = new EventEmitter();

  success = false;
  isCardVisible!: boolean;

  form = this.formBuilder.group({
    title: [this.note.title, [Validators.required, Validators.maxLength(255)]],
    description: new FormControl('', [Validators.required]),
    cover_image: new FormControl(''),
  });

  get title() {
    return this.form.controls.title as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form.patchValue({
      title: changes.note.currentValue.title,
      description: changes.note.currentValue.description,
    });
  }

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.isCardVisible = true;
  }

  onSubmit() {
    if (this.form.valid) {
      const formData: any = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('cover_image', this.form.get('cover_image')?.value);
      this.noteService.updateNote(this.note, formData).subscribe((note) => {
        this.onUpdateNote.emit(note);
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

  closeForm() {
    this.isCardVisible = false;
    this.onUpdateNote.emit();
  }
}
