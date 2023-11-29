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
  @Input() akg?: any;

  constructor() {
    
  }

  ngOnInit() {}

  formatNutriment(): string {
    if (this.nutriment !== undefined && this.nutriment !== null && !Number.isNaN(this.nutriment) ) {
      return this.nutriment.toFixed(2);
    } else {
      return 'N/A'; // Tampilkan pesan atau nilai default jika nutriment tidak terdefinisi
    }
  }

  formatAKG(): string {
    if (this.akg !== undefined && this.akg !== null && !Number.isNaN(this.nutriment) ) {
      return this.akg.toFixed(2) + '%';
    } else {
      return ''; // Tampilkan pesan atau nilai default jika nutriment tidak terdefinisi
    }
  }
}
