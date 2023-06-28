import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interfaces/Note';

@Pipe({
  name: 'filterNotes'
})
export class FilterNotesPipe implements PipeTransform {

  transform(notes: Note[], search: string): Note[] {
    return notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));
  }

}
