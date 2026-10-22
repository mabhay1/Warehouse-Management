import { Service } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Service()
export class CommonService {
    showLoader$:Subject<boolean>=new Subject<boolean>()
    subscriptionArray:Subscription[]=[]
    takeUntilSubject$:Subject<void>=new Subject<void>()

    unsubscribeSubscriptions(){
        this.subscriptionArray.forEach((subs)=>{
            subs.unsubscribe()
        })
        this.subscriptionArray=[]
    }
}
