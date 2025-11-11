import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexReplacePipe } from './regex-replace.pipe';

@NgModule({
  declarations: [RegexReplacePipe],
  imports: [CommonModule],
  exports: [RegexReplacePipe] // penting, supaya module lain bisa pakai
})
export class PipesModule {}
