import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
  ) { }
  amount;
  
  ngOnInit(): void {
    const amountArr = this.activatedRouter.snapshot.queryParams['amount'].split('');
    amountArr[amountArr.length - 3] = amountArr[amountArr.length - 3] + '.'
    this.amount = amountArr.join('');
  }

}
