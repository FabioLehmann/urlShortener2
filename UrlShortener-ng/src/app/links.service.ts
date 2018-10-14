import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// import { Link } from './link';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'Basic';

	})

	@Injectable({
		providedIn: 'root';
	})
	export class LinksService {
		
		private linksUrl = environment.baseUrl+'/links';
		
		constructor(
			private http: HttpClient,
	  
  
		) { }
		/** GET links from the server */
		getLinks (): Observable<Link[]> {
			return this.http.get<Link[]>(this.linksUrl)
	   
		}
	
		
		/** POST: add a new link to the server */
		createUrl (link: Link): Observable<Link> {
			return this.http.post<Link>(this.linksUrl, link,httpOptions)
		}
			
		redirectLink(id: string): Observable<Link> {
			const url = `${this.linksUrl}/${id}`;
			return this.http.get<Link>(url).subscribe((res)=>{
				window.location.href = res.url;
    });
		}

		}