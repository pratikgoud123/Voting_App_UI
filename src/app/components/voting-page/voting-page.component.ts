import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate } from 'src/app/model/Candidate';
import { BackendService } from 'src/app/services/backend.service';
import { VoteDTO } from '../../model/VoteDTO';

@Component({
  selector: 'app-voting-page',
  templateUrl: './voting-page.component.html',
  styleUrls: ['./voting-page.component.css']
})
export class VotingPageComponent implements OnInit {

  candidateForm = this.fb.group({
    candidateId:['', [Validators.required]]
  })

  constructor(private backendService:BackendService, private _snackBar: MatSnackBar, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.viewCandidates();
  }

  candidates:Candidate[]=[];
  

  viewCandidates(){
    this.backendService.getAllCandidates().subscribe({
      next:data => { this.candidates=data },
      error() {alert ("error occured while loading the Candidate Details")},          
    })
  }

  voteDTO:VoteDTO = {};
  selectedCandidate:Candidate={};
  voteSuccess:boolean=false;

  voteFunction(){
    console.log(this.backendService.emailId);
    console.log(this.backendService.hasVoted);
    console.log(this.selectedCandidate.candidateId);
    this.voteDTO.emailId = this.backendService.emailId;
    this.voteDTO.candidateId = this.selectedCandidate.candidateId;
    if(!this.backendService.hasVoted){
      this.backendService.vote(this.voteDTO).subscribe((response:any)=>{
        console.log(response);
        this.voteSuccess = response
        if(this.voteSuccess){
          this._snackBar.open('You have voted !!', 'successfully',{
            duration: 1800,
            panelClass: ['mat-toolbar', 'mat-primary']
          })
        }else if (!this.voteSuccess) {
          this._snackBar.open('Voting', 'unsuccessful',{
            duration: 1800,
            panelClass: ['mat-toolbar', 'mat-primary']
          })
        } else {
          this._snackBar.open('You have already voted!', '',{
            duration: 1800,
            panelClass: ['mat-toolbar', 'mat-primary']
          })
        }
      }, (error)=>{
        console.log(error);
        this._snackBar.open('You have already voted!', '',{
          duration: 1800,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      })
    }else if(this.backendService.hasVoted){
      this._snackBar.open('You have already voted!', '',{
        duration: 1800,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    }
  }
  
}
