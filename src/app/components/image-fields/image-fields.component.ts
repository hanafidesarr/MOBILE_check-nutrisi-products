import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-fields',
  templateUrl: './image-fields.component.html',
  styleUrls: ['./image-fields.component.scss']
})
export class ImageFieldsComponent {

  @Input() product: any;
  @Input() imageLoading: any;
  @Input() allImages: any;

  @Input() onImageSelected!: (e: any, field: string) => void;
  @Input() onImageLoaded!: (field: string) => void;
  @Input() onImageError!: (field: string) => void;
  @Input() setMainPreview!: (field: string, url: string) => void;
}
