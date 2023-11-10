import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nutrition-facts',
  templateUrl: './nutrition-facts.component.html',
  styleUrls: ['./nutrition-facts.component.scss'],
})
export class NutritionFactsComponent  implements OnChanges {
  @Input() name?: string;
  @Input() product?: any;

  sajian: any;
  energy_kj: any;
  energy_kcal: any;

  fat: any;
  saturated_fat: any;
  butyric_acid: any;
  caproic_acid: any;
  caprylic_acid: any;
  capric_acid: any;
  lauric_acid: any;
  myristic_acid: any;
  palmitic_acid: any;
  stearic_acid:any;
  arachidic_acid:any
  behenic_acid:any;
  lignoceric_acid:any;
  cerotic_acid:any;
  montanic_acid:any;
  melissic_acid:any;
  monounsaturated_fat: any;
  polyunsaturated_fat: any;

  omega_3_fat: any;
  alpha_linolenic_acid: any;
  eicosapentaenoic_acid: any;
  docosahexaenoic_acid: any;
  omega_6_fat:any;
  linoleic_acid: any;
  arachidonic_acid: any;
  gamma_linolenic_acid: any;
  dihomo_gamma_linolenic_acid: any;

  omega_9_fat:any;
  oleic_acid: any;
  elaidic_acid: any;
  gondoic_acid: any;
  mead_acid: any;
  erucic_acid: any
  nervonic_acid: any;

  trans_fat: any;
  cholesterol: any;
  
  carbohydrates: any;
  sugars: any;
  sucrose: any;
  glucose: any;
  fructose: any;
  lactose: any;
  maltose: any;
  maltodextrins: any;
  starch: any;
  polyols: any;

  fiber: any;
  proteins: any;
  casein: any;
  serum_proteins: any;
  nucleotides: any;
  salt: any;
  sodium: any;
  alcohol: any;

  vitamin_a: any;
  beta_carotene: any;
  vitamin_d: any;
  vitamin_e: any;
  vitamin_k: any;
  vitamin_c: any;
  vitamin_b1: any;
  vitamin_b2: any;
  vitamin_pp: any;
  vitamin_b6: any;
  vitamin_b9: any;
  vitamin_b12: any;
  
  biotin: any;
  pantothenic_acid: any;
  silica: any;
  bicarbonate: any;
  potassium: any;
  chloride: any;
  calcium: any;
  phosphorus: any;
  iron: any;
  magnesium: any;
  zinc: any;
  copper: any;
  manganese: any;
  fluoride: any;
  selenium: any;
  chromium: any;
  molybdenum: any;
  iodine: any;
  caffeine: any;
  taurine: any;
  ph: any
  fruits_vegetables_nuts: any;
  collagen_meat_protein_ratio: any;
  cocoa: any;
  chlorophyl: any;
  carbon_footprint: any;

  takaran_per: any;
  constructor() {

  }
  ngOnChanges(changes: any): void {
    if (changes.product && !changes.product.firstChange) {
      // The product input has changed, and it's not the initial change.
      // You can perform actions here based on the new value of 'product'.
      console.log('Product has changed:', this.product);
      this.takaran_per = this.product?.serving_size ? 'serving' : '100g'
      this.dynamic(this.takaran_per);
    }
  }


  ionViewDidLeave() {

  }

  calculateNutrition(e: any) {
    this.dynamic(e.detail.value);
  }

  dynamic(data: any) {
    this.energy_kj = this.product?.nutriments["energy_" + data]
    this.energy_kcal = this.product?.nutriments["energy-kcal_" + data]

    this.fat = this.product?.nutriments["fat_" + data]
    this.saturated_fat = this.product?.nutriments["saturated-fat_" + data]
    this.butyric_acid = this.product?.nutriments["butyric-acid_" + data]
    this.caproic_acid = this.product?.nutriments["caproic-acid_" + data]
    this.caprylic_acid = this.product?.nutriments["caprylic-acid_" + data]
    this.capric_acid = this.product?.nutriments["capric-acid_" + data]
    this.lauric_acid = this.product?.nutriments["lauric-acid_" + data]
    this.myristic_acid = this.product?.nutriments["myristic-acid_" + data]
    this.palmitic_acid = this.product?.nutriments["palmitic-acid_" + data]
    this.stearic_acid = this.product?.nutriments["stearic-acid_" + data]
    this.arachidic_acid = this.product?.nutriments["arachidic-acid_" + data]
    this.behenic_acid = this.product?.nutriments["behenic-acid_" + data]
    this.lignoceric_acid = this.product?.nutriments["lignoceric-acid_" + data]
    this.cerotic_acid = this.product?.nutriments["cerotic-acid_" + data]
    this.montanic_acid = this.product?.nutriments["montanic-acid_" + data]
    this.melissic_acid = this.product?.nutriments["melissic-acid_" + data]
    this.monounsaturated_fat = this.product?.nutriments["monounsaturated-fat_" + data]
    this.polyunsaturated_fat = this.product?.nutriments["polyunsaturated-fat_" + data]

    this.omega_3_fat = this.product?.nutriments["omega-3-fat_" + data]
    this.alpha_linolenic_acid = this.product?.nutriments["alpha-linolenic-acid_" + data]
    this.eicosapentaenoic_acid = this.product?.nutriments["eicosapentaenoic-acid_" + data]
    this.docosahexaenoic_acid = this.product?.nutriments["docosahexaenoic-acid_" + data]

    this.omega_6_fat = this.product?.nutriments["omega-6-fat_" + data]
    this.linoleic_acid = this.product?.nutriments["linoleic-acid_" + data]
    this.arachidonic_acid = this.product?.nutriments["arachidonic-acid_" + data]
    this.gamma_linolenic_acid = this.product?.nutriments["gamma-linolenic-acid_" + data]
    this.dihomo_gamma_linolenic_acid = this.product?.nutriments["dihomo-gamma-linolenic-acid_" + data]

    this.omega_9_fat = this.product?.nutriments["omega-9-fat_" + data]
    this.oleic_acid = this.product?.nutriments["oleic-acid_" + data]
    this.elaidic_acid = this.product?.nutriments["elaidic-acid_" + data]
    this.gondoic_acid = this.product?.nutriments["gondoic-acid_" + data]
    this.mead_acid = this.product?.nutriments["mead-acid_" + data]
    this.erucic_acid = this.product?.nutriments["erucic-acid_" + data]
    this.nervonic_acid = this.product?.nutriments["nervonic-acid_" + data]


    this.trans_fat = this.product?.nutriments["trans-fat_" + data]
    this.cholesterol = this.product?.nutriments["cholesterol_" + data]
    
    this.carbohydrates = this.product?.nutriments["carbohydrates_" + data]
    this.sugars = this.product?.nutriments["sugars_" + data]
    this.sucrose = this.product?.nutriments["sucrose_" + data]
    this.glucose = this.product?.nutriments["glucose_" + data]
    this.fructose = this.product?.nutriments["fructose_" + data]
    this.lactose = this.product?.nutriments["lactose_" + data]
    this.maltose = this.product?.nutriments["maltose_" + data]
    this.maltodextrins = this.product?.nutriments["maltodextrins_" + data]
    this.starch = this.product?.nutriments["starch_" + data]
    this.polyols = this.product?.nutriments["polyols_" + data]
    
    this.fiber = this.product?.nutriments["fiber_" + data]
    this.proteins = this.product?.nutriments["proteins_" + data]
    this.casein = this.product?.nutriments["casein_" + data]
    this.serum_proteins = this.product?.nutriments["serum-proteins_" + data]
    this.nucleotides = this.product?.nutriments["nucleotides_" + data]
    this.salt = this.product?.nutriments["salt_" + data]
    this.sodium = this.product?.nutriments["sodium_" + data]
    this.alcohol = this.product?.nutriments["alcohol_" + data]


    this.vitamin_a = this.product?.nutriments["vitamin-a_" + data]
    this.beta_carotene = this.product?.nutriments["beta-carotene_" + data]
    this.vitamin_d = this.product?.nutriments["vitamin-d_" + data]
    this.vitamin_e = this.product?.nutriments["vitamin-e_" + data]
    this.vitamin_k = this.product?.nutriments["vitamin-k_" + data]
    this.vitamin_c = this.product?.nutriments["vitamin-c_" + data]
    this.vitamin_b1 = this.product?.nutriments["vitamin-b1_" + data]
    this.vitamin_b2 = this.product?.nutriments["vitamin-b2_" + data]
    this.vitamin_pp = this.product?.nutriments["vitamin-pp_" + data]
    this.vitamin_b6 = this.product?.nutriments["vitamin-b6_" + data]
    this.vitamin_b9 = this.product?.nutriments["vitamin-b9_" + data]
    this.vitamin_b12 = this.product?.nutriments["vitamin-b12_" + data]
    
    this.biotin = this.product?.nutriments["biotin_" + data]
    this.pantothenic_acid = this.product?.nutriments["pantothenic-acid_" + data]
    this.silica = this.product?.nutriments["silica_" + data]
    this.bicarbonate = this.product?.nutriments["bicarbonate_" + data]
    this.potassium = this.product?.nutriments["potassium_" + data]
    this.chloride = this.product?.nutriments["chloride_" + data]
    this.calcium = this.product?.nutriments["calcium_" + data]
    this.phosphorus = this.product?.nutriments["phosphorus_" + data]
    this.iron = this.product?.nutriments["iron_" + data]
    this.magnesium = this.product?.nutriments["magnesium_" + data]
    this.zinc = this.product?.nutriments["zinc_" + data]
    this.copper = this.product?.nutriments["copper_" + data]
    this.manganese = this.product?.nutriments["manganese_" + data]
    this.fluoride = this.product?.nutriments["fluoride_" + data]
    this.selenium = this.product?.nutriments["selenium_" + data]
    this.chromium = this.product?.nutriments["chromium_" + data]
    this.molybdenum = this.product?.nutriments["molybdenum_" + data]
    this.iodine = this.product?.nutriments["iodine_" + data]
    this.caffeine = this.product?.nutriments["caffeine_" + data]
    this.taurine = this.product?.nutriments["taurine_" + data]
    this.ph = this.product?.nutriments["ph_" + data]
    this.fruits_vegetables_nuts = this.product?.nutriments["fruits-vegetables-nuts_" + data]
    this.collagen_meat_protein_ratio = this.product?.nutriments["collagen-meat-protein-ratio_" + data]
    this.cocoa = this.product?.nutriments["cocoa_" + data]
    this.chlorophyl = this.product?.nutriments["chlorophyl_" + data]
    this.carbon_footprint = this.product?.nutriments["carbon_footprint_" + data]

  }
}
