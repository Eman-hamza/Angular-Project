import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IJob } from '../Interface,enum/IJob';
import { ProposalDTO } from '../Interface,enum/IJob';
import { Proposal } from '../Interface,enum/IJob';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  currentuser: any;//=this.auth.gettokenID();
  constructor(public auth: AuthService, private http: HttpClient) { }

  // postProp(proposal:Proposal)
  // {
  //   return this.http.get<Proposal>(`hhttp://localhost:5294/api/Proposal`)
  // }

  getJop(JobId: number): Observable<IJob> {
    //return this.http.get<IJob>(`http://localhost:5294/api/Job/20`)
    return this.http.get<IJob>(`http://localhost:5294/api/Jobs/${JobId}`)
  }

  addProposal(ProposalData: any): Observable<ProposalDTO> {
    return this.http.post<ProposalDTO>(`http://localhost:5294/api/Proposal`, ProposalData).
      pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }))
  }



}

