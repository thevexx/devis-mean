import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  getArchive() {
    return this.http.get('http://localhost:3000/archive/all')
  }
  deleteItem(id) {
    return this.http.get('http://localhost:3000/archive/delete/' + id);
  }
}
