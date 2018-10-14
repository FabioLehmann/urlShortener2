import { Component, OnInit } from '@angular/core';
import { LinkInfo } from './link';
import { LinksService } from '../links.service';
// import { LINKS } from './link';


@Component({
	selector: 'app-link-input',
	templateUrl: './link-input.component.html',
	styleUrls: ['./link-input.component.css']
})
export class LinkInputComponent implements OnInit {
		
	
	link: LinkInfo = {
		id:null,
		source: null,
		target:null
	};
	
	
	
	onSubmit(): void {
		name = this.link.source;
  	  this.linksService.createUrl({ name } as Link)
        .subscribe((res)=>{
			if(res[0] != false){
				location.reload();
			}
    });
	  
	
	}
	

    constructor(private linksService: LinksService) { }
	

	ngOnInit() {
	}
  

}
