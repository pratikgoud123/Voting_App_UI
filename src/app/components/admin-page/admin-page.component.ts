import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Candidate } from '../../model/Candidate';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private backendService:BackendService) { }

  candidates:Candidate[] = [];

  viewAllCandidates(){
    this.backendService.getAllCandidates().subscribe({
      next:data => { this.candidates=data },
      error() {alert ("error occured while loading the Pizza Details")},          
    })

  }

  ngOnInit(): void {
    this.viewAllCandidates();
  }

}
