import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestRequestsService {

  constructor(private http: HttpClient) {}

  get(link: string){
    return this.http.get(link);
  }
  post(link: string, obj: Object){
    return this.http.post(link, obj);
  }
  put(link: string, obj: Object){
    return this.http.put(link, obj);
  }
  delete(link: string){
    return this.http.delete(link);
  }
}
