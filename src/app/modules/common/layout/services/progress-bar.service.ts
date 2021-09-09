import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProgressBarService {
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public get loading$(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }

    public show(): void {
        this.loadingSubject.next(true);
    }

    public hide(): void {
        this.loadingSubject.next(false);
    }
}
