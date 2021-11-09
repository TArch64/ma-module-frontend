import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Invitation } from '../entities';
import { JoinFacade } from '../join.facade';

@Injectable({ providedIn: 'root' })
export class InvitationResolver implements Resolve<Invitation> {
    constructor(private readonly facade: JoinFacade) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<Invitation> {
        const id = route.queryParamMap.get('iid')!;
        return this.facade.loadInvitation(id);
    }
}
