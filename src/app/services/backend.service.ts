import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Candidate } from '../model/Candidate';
import { User } from '../model/User';
import { VoteDTO } from '../model/VoteDTO';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private HttpClientObj: HttpClient) { }

  registerURL:string = "http://localhost:8089/registerUser";
  loginURL:string = "http://localhost:8089/login";
  getUserByEmailIdURL:string = "http://localhost:8089/getUserByEmailId";
  voteURL:string = "http://localhost:8089/api/v1/vote";
  getAllCandidatesURL:string = "http://localhost:8089/api/v1/getAllCandidates"
  getCandidateDetailsURL:string = "http://localhost:8089/api/v1/candidateDetails";

  registerUser(userData:User):Observable<any>{
    return this.HttpClientObj.post<any>(this.registerURL, userData);
  }

  login(userdata:User):Observable<any>{
    return this.HttpClientObj.post<any>(this.loginURL, userdata);
  }

  getUserByEmailId(userdata:User):Observable<User>{
    return this.HttpClientObj.get<User>(this.getUserByEmailIdURL + "/" + userdata.emailId)
  }

  vote(voteDTO:VoteDTO){
    return this.HttpClientObj.put<any>(this.voteURL, voteDTO);
  }

  getAllCandidates():Observable<any>{
    return this.HttpClientObj.get<any>(this.getAllCandidatesURL);
  }

  getCandidateDetails():Observable<Candidate[]>{
    return this.HttpClientObj.get<Candidate[]>(this.getCandidateDetailsURL)
  }

  emailId:any ;
  hasVoted:any;
  captureEmail(emailId: any, hasVoted:any) {
    this.emailId = emailId;
    this.hasVoted = hasVoted;
  }
  
}
