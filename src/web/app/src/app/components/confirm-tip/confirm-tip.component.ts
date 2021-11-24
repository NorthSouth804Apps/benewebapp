import { Component, OnInit, Input } from '@angular/core';
import { ServiceProvider } from '../../models/ServiceProvider';

@Component({
  selector: 'app-confirm-tip',
  templateUrl: './confirm-tip.component.html',
  styleUrls: ['./confirm-tip.component.scss']
})
export class ConfirmTipComponent implements OnInit {

  @Input() serviceProvider!: ServiceProvider;

  constructor() { }

  ngOnInit(): void {
  }

}
