import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
   
    this.router.params.subscribe(params=>{
    console.log(params)   })
    this.router.queryParams.subscribe(params=>{
    console.log(params)   })
  }

}
