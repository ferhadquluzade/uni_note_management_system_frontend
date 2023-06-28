import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/interfaces/Note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  private router: any;
  loading: boolean = false
  note: Note = {
    id: 0,
    title: '',
  }

  constructor(private noteService: NoteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router = this.route.params.subscribe(params => {
      this.loading = true
      this.noteService.getNote(+params['id']).subscribe(note => {
        this.note = note
        this.loading = false
      })
    });
  }

}
