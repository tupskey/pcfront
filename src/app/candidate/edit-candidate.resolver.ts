import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router';
import { PortalService } from '../shared/portal.service';
import { Observable } from 'rxjs';
import { ICandidate } from './candidate.model';
import { map, tap } from 'rxjs/operators';


@Injectable()


export class EdItCandidateResolver implements Resolve<any>{
  cand: ICandidate;
  constructor(private portalService : PortalService){}

    resolve(route: ActivatedRouteSnapshot): Observable<ICandidate> {
      const id = +route.paramMap.get('id')
      return this.portalService.getCandidate(id).pipe(map(candidate => candidate))

    }
}
