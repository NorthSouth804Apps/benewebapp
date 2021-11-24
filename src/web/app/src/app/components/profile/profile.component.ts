import { Component, OnInit, Input } from '@angular/core';
import { ServiceProvider } from '../../models/ServiceProvider';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() serviceProvider!: ServiceProvider;

  constructor() { }

  ngOnInit(): void {
  }

}
