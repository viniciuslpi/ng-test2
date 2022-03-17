import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators'

@Component({
    selector: 'app-photo-frame',
    templateUrl: './photo-frame.component.html',
    styleUrls: ['./photo-frame.component.scss']
})

export class PhotoFrameComponent implements OnInit, OnDestroy{
    
    @Input() description = '';
    @Input() src = '';
    @Input() likes = 0;
    @Output() liked: EventEmitter<void> = new EventEmitter();
    
    private debouceSubject: Subject<void> = new Subject();
    private unsubscribe: Subject<void> = new Subject();

    public like(){
        this.debouceSubject.next();
    }
    
    ngOnInit(): void {
        this.debouceSubject.asObservable()
        .pipe(debounceTime(500))
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
            this.liked.emit();
        })
    }
    
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
