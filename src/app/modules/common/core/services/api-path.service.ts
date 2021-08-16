import {Inject, Injectable} from "@angular/core";
import {EnvironmentProvider, IEnvironment} from "./environment.provider";

@Injectable()
export class ApiPathService {
    constructor(
        @Inject(EnvironmentProvider)
        private readonly environment: IEnvironment
    ) {}

    public build(paths: (string | number)[]): string {
        return [
            this.environment.apiUrl,
            ...paths.map(path => path.toString())
        ].join('/');
    }
}
