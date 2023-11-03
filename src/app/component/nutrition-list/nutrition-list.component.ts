import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nutrition-list',
  templateUrl: './nutrition-list.component.html',
  styleUrls: ['./nutrition-list.component.scss'],
})
export class NutritionListComponent  implements OnInit {

  @Input() name?: any;
  @Input() nutriment?: any;
  @Input() unit?: any;
  @Input() tab_cell?: any;

  constructor() { }

  ngOnInit() {}

}
