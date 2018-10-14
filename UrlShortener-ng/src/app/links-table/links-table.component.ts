import { Component, OnInit } from '@angular/core';
import { LinkInfo } from '../link';
import { LinksService } from '../links.service';


@Component({
	selector: 'app-links-table',
	templateUrl: './links-table.component.html',
	styleUrls: ['./links-table.component.css']
})
export class LinksTableComponent implements OnInit {
	
	links: Link[];
	heroes: Hero[];
	
    constructor(private linksService: LinksService) { }
	

	ngOnInit() {
	    this.getLinks();
		 // this.getHeroes();
	}
	
    // getLinks(): void {
//       this.linksService.getLinks()
//           .subscribe(links => this.links = links);
//     }
getLinks(): void {
  this.linksService.getLinks()
      .subscribe(links => this.links = links);
}
	
}
