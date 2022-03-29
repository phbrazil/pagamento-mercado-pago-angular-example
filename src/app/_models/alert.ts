export class Alert {
    id: string = '';
    type: AlertType = {} as AlertType;
    message: any;
    subText: string = '';
    autoClose: boolean = true;
    keepAfterRouteChange: boolean = true;
    fade: boolean= true;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
