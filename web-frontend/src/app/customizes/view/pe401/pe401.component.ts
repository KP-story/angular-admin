import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'PE-401',
  templateUrl: './pe401.component.html',
  styleUrls: ['./pe401.component.scss']
})
export class PE401Component implements OnInit {

  constructor(public router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  back() {

    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.router.navigate([returnUrl]);

  }

}
