import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url="http://localhost:3000/categories";
  constructor(private http:HttpClient) { }
  getCategory(){
    return this.http.get(this.url)
  }
  createM(movie:any){
    return this.http.post(this.url,movie)
  }
}
