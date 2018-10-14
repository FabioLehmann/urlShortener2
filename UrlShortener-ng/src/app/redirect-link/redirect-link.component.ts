import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LinksService } from '../links.service';


@Component({
  selector: 'app-redirect-link',
  templateUrl: './redirect-link.component.html',
  styleUrls: ['./redirect-link.component.css']
})
export class RedirectLinkComponent implements OnInit {

	constructor(
	  private route: ActivatedRoute,
	  private linksService: LinksService,
	  private location: Location
	) {}
  

  ngOnInit() {
	  
	  
	   this.redirectLink();
  }
  
  redirectLink(): void {
      const id = this.route.snapshot.params.id;
      this.linksService.redirectLink(id);
    }

}
