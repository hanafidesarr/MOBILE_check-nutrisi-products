import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslationService } from 'src/app/api/translation.service';

@Component({
  selector: 'app-nutrition-facts',
  templateUrl: './nutrition-facts.component.html',
  styleUrls: ['./nutrition-facts.component.scss'],
})
export class NutritionFactsComponent  implements OnChanges {

  akg_lists_anak:any;
  akg_lists_pria:any;
  akg_lists_wanita:any;

  akg_energy: any;
  akg_protein: any;
  akg_fat: any;
  akg_carbo: any;
  akg_fiber: any;


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

  custom_serving: any = 0;
  currentLanguage: any;
  constructor(public _translation_service: TranslationService) {


  this.akg_lists_anak = [
    {
      id: 'anak_1-3',
      name: _translation_service.translateKey('children') + " 1-3 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'anak_4-6',
      name: _translation_service.translateKey('children') + " 4-6 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'anak_7-9',
      name: _translation_service.translateKey('children') + " 7-9 " + _translation_service.translateKey('year_old')
    },
  ];

  this.akg_lists_pria = [
    {
      id: 'pria_10-12',
      name: _translation_service.translateKey('male') + " 10-12 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'pria_13-15',
      name: _translation_service.translateKey('male') + " 13-15 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'pria_16-18',
      name: _translation_service.translateKey('male') + " 16-18 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'pria_19-29',
      name: _translation_service.translateKey('male') + " 19-29 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'pria_30-49',
      name: _translation_service.translateKey('male') + " 30-49 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'pria_50-64',
      name: _translation_service.translateKey('male') + " 50-64 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'pria_65-80',
      name: _translation_service.translateKey('male') + " 65-80 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'pria_80_plus',
      name: _translation_service.translateKey('male') + " 80+ " + _translation_service.translateKey('year_old')
    },
  ];

  this.akg_lists_wanita = [
    {
      id: 'wanita_10-12',
      name: _translation_service.translateKey('female') + " 10-12 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'wanita_13-15',
      name: _translation_service.translateKey('female') + " 13-15 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'wanita_16-18',
      name: _translation_service.translateKey('female') + " 16-18 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'wanita_19-29',
      name: _translation_service.translateKey('female') + " 19-29 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'wanita_30-49',
      name: _translation_service.translateKey('female') + " 30-49 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'wanita_50-64',
      name: _translation_service.translateKey('female') + " 50-64 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'wanita_65-80',
      name: _translation_service.translateKey('female') + " 65-80 " + _translation_service.translateKey('year_old')
    },
    {
      id: 'wanita_80_plus',
      name: _translation_service.translateKey('female') + " 80+ " + _translation_service.translateKey('year_old')
    },
  ];

  }

  ngOnInit() {


    this._translation_service.init();
    this.currentLanguage = this._translation_service.getCurrentLanguage();
  }

  ngOnChanges(changes: any): void {
    if (changes.product && !changes.product.firstChange) {
      // The product input has changed, and it's not the initial change.
      // You can perform actions here based on the new value of 'product'.
      console.log('Product has changed:', this.product);
      this.takaran_per = this.product?.serving_size ? 'serving' : '100g'
      this.dynamic(this.takaran_per, null);

      this.akg_energy = (this.energy_kcal / 2550) * 100;
      this.akg_protein = (this.proteins / 65) * 100;
      this.akg_fat = (this.fat / 70) * 100;
      this.akg_carbo = (this.carbohydrates / 415) * 100;
      this.akg_fiber = (this.fiber / 36) * 100;
    }
  }


  ionViewDidEnter() {

  }

  customCalculateNutrition(e: any) {
    this.dynamic('100g', e.target.value);
    console.log(e.target.value)
  }

  calculateAKG(e: any) {
    this.akg_formula(e.target.value);
  }

  akg_formula(umur: string) {
    switch (umur) {

      case 'anak_1-3':
        this.akg_energy = (this.energy_kcal / 1350) * 100;
        this.akg_protein = (this.proteins / 20) * 100;
        this.akg_fat = (this.fat / 45) * 100;
        this.akg_carbo = (this.carbohydrates / 215) * 100;
        this.akg_fiber = (this.fiber / 19) * 100;
        break;
      case 'anak_4-6':
        this.akg_energy = (this.energy_kcal / 1400) * 100;
        this.akg_protein = (this.proteins / 25) * 100;
        this.akg_fat = (this.fat / 50) * 100;
        this.akg_carbo = (this.carbohydrates / 220) * 100;
        this.akg_fiber = (this.fiber / 20) * 100;
        break;
      case 'anak_7-9':
        this.akg_energy = (this.energy_kcal / 1650) * 100;
        this.akg_protein = (this.proteins / 40) * 100;
        this.akg_fat = (this.fat / 55) * 100;
        this.akg_carbo = (this.carbohydrates / 250) * 100;
        this.akg_fiber = (this.fiber / 23) * 100;
        break;

      case 'pria_10-12':
        this.akg_energy = (this.energy_kcal / 2000) * 100;
        this.akg_protein = (this.proteins / 50) * 100;
        this.akg_fat = (this.fat / 65) * 100;
        this.akg_carbo = (this.carbohydrates / 300) * 100;
        this.akg_fiber = (this.fiber / 28) * 100;
        break;
      case 'pria_13-15':
        this.akg_energy = (this.energy_kcal / 2400) * 100;
        this.akg_protein = (this.proteins / 70) * 100;
        this.akg_fat = (this.fat / 80) * 100;
        this.akg_carbo = (this.carbohydrates / 350) * 100;
        this.akg_fiber = (this.fiber / 34) * 100;
        break;
      case 'pria_16-18':
        this.akg_energy = (this.energy_kcal / 2650) * 100;
        this.akg_protein = (this.proteins / 75) * 100;
        this.akg_fat = (this.fat / 85) * 100;
        this.akg_carbo = (this.carbohydrates / 400) * 100;
        this.akg_fiber = (this.fiber / 37) * 100;
        break;
      case 'pria_19-29':
        this.akg_energy = (this.energy_kcal / 2650) * 100;
        this.akg_protein = (this.proteins / 65) * 100;
        this.akg_fat = (this.fat / 75) * 100;
        this.akg_carbo = (this.carbohydrates / 430) * 100;
        this.akg_fiber = (this.fiber / 37) * 100;
        break;
      case 'pria_30-49':
        this.akg_energy = (this.energy_kcal / 2550) * 100;
        this.akg_protein = (this.proteins / 65) * 100;
        this.akg_fat = (this.fat / 70) * 100;
        this.akg_carbo = (this.carbohydrates / 415) * 100;
        this.akg_fiber = (this.fiber / 36) * 100;
        break;
      case 'pria_50-64':
        this.akg_energy = (this.energy_kcal / 2150) * 100;
        this.akg_protein = (this.proteins / 65) * 100;
        this.akg_fat = (this.fat / 60) * 100;
        this.akg_carbo = (this.carbohydrates / 340) * 100;
        this.akg_fiber = (this.fiber / 30) * 100;
        break;
      case 'pria_65-80':
        this.akg_energy = (this.energy_kcal / 1800) * 100;
        this.akg_protein = (this.proteins / 64) * 100;
        this.akg_fat = (this.fat / 50) * 100;
        this.akg_carbo = (this.carbohydrates / 275) * 100;
        this.akg_fiber = (this.fiber / 25) * 100;
        break;
      case 'pria_80_plus':
        this.akg_energy = (this.energy_kcal / 1600) * 100;
        this.akg_protein = (this.proteins / 64) * 100;
        this.akg_fat = (this.fat / 45) * 100;
        this.akg_carbo = (this.carbohydrates / 235) * 100;
        this.akg_fiber = (this.fiber / 22) * 100;
        break;


      case 'wanita_10-12':
        this.akg_energy = (this.energy_kcal / 1900) * 100;
        this.akg_protein = (this.proteins / 55) * 100;
        this.akg_fat = (this.fat / 65) * 100;
        this.akg_carbo = (this.carbohydrates / 280) * 100;
        this.akg_fiber = (this.fiber / 27) * 100;
        break;
      case 'wanita_13-15':
        this.akg_energy = (this.energy_kcal / 2050) * 100;
        this.akg_protein = (this.proteins / 65) * 100;
        this.akg_fat = (this.fat / 70) * 100;
        this.akg_carbo = (this.carbohydrates / 300) * 100;
        this.akg_fiber = (this.fiber / 29) * 100;
        break;
      case 'wanita_16-18':
        this.akg_energy = (this.energy_kcal / 2100) * 100;
        this.akg_protein = (this.proteins / 65) * 100;
        this.akg_fat = (this.fat / 70) * 100;
        this.akg_carbo = (this.carbohydrates / 300) * 100;
        this.akg_fiber = (this.fiber / 29) * 100;
        break;
      case 'wanita_19-29':
        this.akg_energy = (this.energy_kcal / 2250) * 100;
        this.akg_protein = (this.proteins / 65) * 100;
        this.akg_fat = (this.fat / 65) * 100;
        this.akg_carbo = (this.carbohydrates / 360) * 100;
        this.akg_fiber = (this.fiber / 32) * 100;
        break;
      case 'wanita_30-49':
        this.akg_energy = (this.energy_kcal / 2150) * 100;
        this.akg_protein = (this.proteins / 60) * 100;
        this.akg_fat = (this.fat / 60) * 100;
        this.akg_carbo = (this.carbohydrates / 340) * 100;
        this.akg_fiber = (this.fiber / 30) * 100;
        break;
      case 'wanita_50-64':
        this.akg_energy = (this.energy_kcal / 1800) * 100;
        this.akg_protein = (this.proteins / 60) * 100;
        this.akg_fat = (this.fat / 50) * 100;
        this.akg_carbo = (this.carbohydrates / 280) * 100;
        this.akg_fiber = (this.fiber / 25) * 100;
        break;
      case 'wanita_65-80':
        this.akg_energy = (this.energy_kcal / 1550) * 100;
        this.akg_protein = (this.proteins / 58) * 100;
        this.akg_fat = (this.fat / 45) * 100;
        this.akg_carbo = (this.carbohydrates / 230) * 100;
        this.akg_fiber = (this.fiber / 22) * 100;
        break;
      case 'wanita_80_plus':
        this.akg_energy = (this.energy_kcal / 1400) * 100;
        this.akg_protein = (this.proteins / 58) * 100;
        this.akg_fat = (this.fat / 40) * 100;
        this.akg_carbo = (this.carbohydrates / 200) * 100;
        this.akg_fiber = (this.fiber / 20) * 100;
        break;

      default:
        this.akg_energy = null
        this.akg_protein = null
        this.akg_fat = null
        this.akg_carbo = null
        this.akg_fiber = null
        break;
    }
  }
  dynamic(data: any, custom_value:any) {
    

    this.akg_energy = null
    this.akg_fat = null
    this.akg_protein = null;
    this.akg_carbo = null;
    this.akg_fiber = null;

    const exclusionList = ['100g', 'serving'];
    if (custom_value) {
      custom_value = custom_value / 100
    } else {
      custom_value = 1
    }
    this.energy_kj = this.product?.nutriments["energy_" + data] * custom_value
    if (this.product?.nutriments["energy-kcal_" + data] == undefined) {
      this.energy_kcal = (this.energy_kj / 4.184 ) * custom_value
    } else {
      this.energy_kcal = this.product?.nutriments["energy-kcal_" + data] * custom_value
    }
    this.fat = this.product?.nutriments["fat_" + data] * custom_value
    this.saturated_fat = this.product?.nutriments["saturated-fat_" + data] * custom_value
    this.butyric_acid = this.product?.nutriments["butyric-acid_" + data] * custom_value
    this.caproic_acid = this.product?.nutriments["caproic-acid_" + data] * custom_value
    this.caprylic_acid = this.product?.nutriments["caprylic-acid_" + data] * custom_value
    this.capric_acid = this.product?.nutriments["capric-acid_" + data] * custom_value
    this.lauric_acid = this.product?.nutriments["lauric-acid_" + data] * custom_value
    this.myristic_acid = this.product?.nutriments["myristic-acid_" + data] * custom_value
    this.palmitic_acid = this.product?.nutriments["palmitic-acid_" + data] * custom_value
    this.stearic_acid = this.product?.nutriments["stearic-acid_" + data] * custom_value
    this.arachidic_acid = this.product?.nutriments["arachidic-acid_" + data] * custom_value
    this.behenic_acid = this.product?.nutriments["behenic-acid_" + data] * custom_value
    this.lignoceric_acid = this.product?.nutriments["lignoceric-acid_" + data] * custom_value
    this.cerotic_acid = this.product?.nutriments["cerotic-acid_" + data] * custom_value
    this.montanic_acid = this.product?.nutriments["montanic-acid_" + data] * custom_value
    this.melissic_acid = this.product?.nutriments["melissic-acid_" + data] * custom_value
    this.monounsaturated_fat = this.product?.nutriments["monounsaturated-fat_" + data] * custom_value
    this.polyunsaturated_fat = this.product?.nutriments["polyunsaturated-fat_" + data] * custom_value

    this.omega_3_fat = this.product?.nutriments["omega-3-fat_" + data] * custom_value
    this.alpha_linolenic_acid = this.product?.nutriments["alpha-linolenic-acid_" + data] * custom_value
    this.eicosapentaenoic_acid = this.product?.nutriments["eicosapentaenoic-acid_" + data] * custom_value
    this.docosahexaenoic_acid = this.product?.nutriments["docosahexaenoic-acid_" + data] * custom_value

    this.omega_6_fat = this.product?.nutriments["omega-6-fat_" + data] * custom_value
    this.linoleic_acid = this.product?.nutriments["linoleic-acid_" + data] * custom_value
    this.arachidonic_acid = this.product?.nutriments["arachidonic-acid_" + data] * custom_value
    this.gamma_linolenic_acid = this.product?.nutriments["gamma-linolenic-acid_" + data] * custom_value
    this.dihomo_gamma_linolenic_acid = this.product?.nutriments["dihomo-gamma-linolenic-acid_" + data] * custom_value

    this.omega_9_fat = this.product?.nutriments["omega-9-fat_" + data] * custom_value
    this.oleic_acid = this.product?.nutriments["oleic-acid_" + data] * custom_value
    this.elaidic_acid = this.product?.nutriments["elaidic-acid_" + data] * custom_value
    this.gondoic_acid = this.product?.nutriments["gondoic-acid_" + data] * custom_value
    this.mead_acid = this.product?.nutriments["mead-acid_" + data] * custom_value
    this.erucic_acid = this.product?.nutriments["erucic-acid_" + data] * custom_value
    this.nervonic_acid = this.product?.nutriments["nervonic-acid_" + data] * custom_value


    this.trans_fat = this.product?.nutriments["trans-fat_" + data] * custom_value
    this.cholesterol = this.product?.nutriments["cholesterol_" + data] * custom_value
    
    this.carbohydrates = this.product?.nutriments["carbohydrates_" + data] * custom_value
    this.sugars = this.product?.nutriments["sugars_" + data] * custom_value
    this.sucrose = this.product?.nutriments["sucrose_" + data] * custom_value
    this.glucose = this.product?.nutriments["glucose_" + data] * custom_value
    this.fructose = this.product?.nutriments["fructose_" + data] * custom_value
    this.lactose = this.product?.nutriments["lactose_" + data] * custom_value
    this.maltose = this.product?.nutriments["maltose_" + data] * custom_value
    this.maltodextrins = this.product?.nutriments["maltodextrins_" + data] * custom_value
    this.starch = this.product?.nutriments["starch_" + data] * custom_value
    this.polyols = this.product?.nutriments["polyols_" + data] * custom_value
    
    this.fiber = this.product?.nutriments["fiber_" + data] * custom_value
    this.proteins = this.product?.nutriments["proteins_" + data] * custom_value
    this.casein = this.product?.nutriments["casein_" + data] * custom_value
    this.serum_proteins = this.product?.nutriments["serum-proteins_" + data] * custom_value
    this.nucleotides = this.product?.nutriments["nucleotides_" + data] * custom_value
    this.salt = this.product?.nutriments["salt_" + data] * custom_value
    this.sodium = this.product?.nutriments["sodium_" + data] * custom_value
    this.alcohol = this.product?.nutriments["alcohol_" + data] * custom_value


    this.vitamin_a = this.product?.nutriments["vitamin-a_" + data] * custom_value
    this.beta_carotene = this.product?.nutriments["beta-carotene_" + data] * custom_value
    this.vitamin_d = this.product?.nutriments["vitamin-d_" + data] * custom_value
    this.vitamin_e = this.product?.nutriments["vitamin-e_" + data] * custom_value
    this.vitamin_k = this.product?.nutriments["vitamin-k_" + data] * custom_value
    this.vitamin_c = this.product?.nutriments["vitamin-c_" + data] * custom_value
    this.vitamin_b1 = this.product?.nutriments["vitamin-b1_" + data] * custom_value
    this.vitamin_b2 = this.product?.nutriments["vitamin-b2_" + data] * custom_value
    this.vitamin_pp = this.product?.nutriments["vitamin-pp_" + data] * custom_value
    this.vitamin_b6 = this.product?.nutriments["vitamin-b6_" + data] * custom_value
    this.vitamin_b9 = this.product?.nutriments["vitamin-b9_" + data] * custom_value
    this.vitamin_b12 = this.product?.nutriments["vitamin-b12_" + data] * custom_value
    
    this.biotin = this.product?.nutriments["biotin_" + data] * custom_value
    this.pantothenic_acid = this.product?.nutriments["pantothenic-acid_" + data] * custom_value
    this.silica = this.product?.nutriments["silica_" + data] * custom_value
    this.bicarbonate = this.product?.nutriments["bicarbonate_" + data] * custom_value
    this.potassium = this.product?.nutriments["potassium_" + data] * custom_value
    this.chloride = this.product?.nutriments["chloride_" + data] * custom_value
    this.calcium = this.product?.nutriments["calcium_" + data] * custom_value
    this.phosphorus = this.product?.nutriments["phosphorus_" + data] * custom_value
    this.iron = this.product?.nutriments["iron_" + data] * custom_value
    this.magnesium = this.product?.nutriments["magnesium_" + data] * custom_value
    this.zinc = this.product?.nutriments["zinc_" + data] * custom_value
    this.copper = this.product?.nutriments["copper_" + data] * custom_value
    this.manganese = this.product?.nutriments["manganese_" + data] * custom_value
    this.fluoride = this.product?.nutriments["fluoride_" + data] * custom_value
    this.selenium = this.product?.nutriments["selenium_" + data] * custom_value
    this.chromium = this.product?.nutriments["chromium_" + data] * custom_value
    this.molybdenum = this.product?.nutriments["molybdenum_" + data] * custom_value
    this.iodine = this.product?.nutriments["iodine_" + data] * custom_value
    this.caffeine = this.product?.nutriments["caffeine_" + data] * custom_value
    this.taurine = this.product?.nutriments["taurine_" + data] * custom_value
    this.ph = this.product?.nutriments["ph_" + data] * custom_value
    this.fruits_vegetables_nuts = this.product?.nutriments["fruits-vegetables-nuts_" + data] * custom_value
    this.collagen_meat_protein_ratio = this.product?.nutriments["collagen-meat-protein-ratio_" + data] * custom_value
    this.cocoa = this.product?.nutriments["cocoa_" + data] * custom_value
    this.chlorophyl = this.product?.nutriments["chlorophyl_" + data] * custom_value
    this.carbon_footprint = this.product?.nutriments["carbon_footprint_" + data] * custom_value

  }

  formatAKGEnergi(): string {
    if (this.akg_energy !== undefined && this.akg_energy !== null && !Number.isNaN(this.akg_energy) ) {
      return this.akg_energy.toFixed(2) + '%';
    } else {
      return ''; // Tampilkan pesan atau nilai default jika nutriment tidak terdefinisi
    }
  }
}
