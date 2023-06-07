import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProposal } from '../Interface,enum/proposals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {

  constructor(private http:HttpClient) { }

  getProposalsByJob(id:any):Observable<IProposal[]>{
    console.log("id",id)
    return this.http.get<IProposal[]>(`http://localhost:5294/api/ProposalsJob/${id}`);
  }
  getProposalDetails(id:any):Observable<IProposal>{
    console.log("id",id)
    return this.http.get<IProposal>(`http://localhost:5294/api/ProposalDetails/${id}`);
  }
}
