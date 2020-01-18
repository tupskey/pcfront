import { Injectable } from '@angular/core';
import { Resolve,  RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PortalService } from '../shared/portal.service';
import {map} from 'rxjs/operators';

@Injectable()

export class CandidateListResolver implements Resolve<any>{

  constructor(private portalService: PortalService){}
  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.portalService.getCandidates().pipe(map(Candidates=> Candidates))
  }

}
