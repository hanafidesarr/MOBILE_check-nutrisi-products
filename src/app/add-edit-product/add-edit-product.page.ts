import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/api/product.service';
import { LoadingService } from 'src/app/api/loading.service';
import { AlertController, AlertInput } from '@ionic/angular';
import { TranslationService } from 'src/app/api/translation.service';
import { AdmobService } from '../services/admob/admob.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.page.html',
  styleUrls: ['./add-edit-product.page.scss'],
})
export class AddEditProductPage implements OnInit {

  productData: any;
  is_add_product = true;
  is_redirect_to_bookmark = false;

  product: any = {};
  // allFields: string[] = [];
  isSubmitting = false;
  image_packaging_url: any;

  // fixed list of fields we treat as image fields
  imageFields = [
    'image_url',
    'image_front_url',
    'image_ingredients_url',
    'image_nutrition_url',
    'image_packaging_url'
  ];

  // per-field loader flags
  imageLoading: { [key: string]: boolean } = {};

  // gallery per-field, filled from OFF product.images
  allImages: { [key: string]: string[] } = {};

  // mapping local field -> OFF base field (we append _en for English)
  private offMapping: any = {
    image_front_url: 'front',
    image_url: 'front',
    image_ingredients_url: 'ingredients',
    image_nutrition_url: 'nutrition',
    image_packaging_url: 'packaging'
  };
  editableNutrients: {
    key: string;
    label: string;
    unit: string;
  }[] = [];
  customNutritionFields: {
    key: string;
    label: string;
  }[] = [];

  newNutrientKey = '';
  newNutrientLabel = '';
  nutrimentList: any[] = [];

  defaultNutriments = [ 
    { key: 'energy-kcal', value: null, unit: 'kcal' },
    { key: 'energy-from-fat', label: 'Energy from fat', unit: 'kcal' },
    { key: 'fat', value: null, unit: 'g' },
    { key: 'saturated-fat', value: null, unit: 'g' },
    { key: 'carbohydrates', value: null, unit: 'g' },
    { key: 'sugars', value: null, unit: 'g' },
    { key: 'fiber', label: 'Fiber', unit: 'g' },
    { key: 'proteins', value: null, unit: 'g' },
    { key: 'salt', value: null, unit: 'g' },
    { key: 'sodium', label: 'Sodium', unit: 'g' },
    { key: 'alcohol', label: 'Alcohol', unit: '%' }
  ];

  additionalNutriments = [
    // Lemak detail
    { key: 'monounsaturated-fat', label: 'Monounsaturated fat', unit: 'g' },
    { key: 'polyunsaturated-fat', label: 'Polyunsaturated fat', unit: 'g' },
    { key: 'trans-fat', label: 'Trans fat', unit: 'g' },
    { key: 'cholesterol', label: 'Cholesterol', unit: 'mg' },

    // Asam lemak jenuh detail
    { key: 'butyric-acid', label: 'Butyric acid', unit: 'g' },
    { key: 'caproic-acid', label: 'Caproic acid', unit: 'g' },
    { key: 'caprylic-acid', label: 'Caprylic acid', unit: 'g' },
    { key: 'capric-acid', label: 'Capric acid', unit: 'g' },
    { key: 'lauric-acid', label: 'Lauric acid', unit: 'g' },
    { key: 'myristic-acid', label: 'Myristic acid', unit: 'g' },
    { key: 'palmitic-acid', label: 'Palmitic acid', unit: 'g' },
    { key: 'stearic-acid', label: 'Stearic acid', unit: 'g' },
    { key: 'arachidic-acid', label: 'Arachidic acid', unit: 'g' },
    { key: 'behenic-acid', label: 'Behenic acid', unit: 'g' },
    { key: 'lignoceric-acid', label: 'Lignoceric acid', unit: 'g' },
    { key: 'cerotic-acid', label: 'Cerotic acid', unit: 'g' },
    { key: 'montanic-acid', label: 'Montanic acid', unit: 'g' },
    { key: 'melissic-acid', label: 'Melissic acid', unit: 'g' },

    // Omega fats
    { key: 'omega-3-fat', label: 'Omega 3 fat', unit: 'g' },
    { key: 'alpha-linolenic-acid', label: 'Alpha-linolenic acid', unit: 'g' },
    { key: 'eicosapentaenoic-acid', label: 'EPA', unit: 'g' },
    { key: 'docosahexaenoic-acid', label: 'DHA', unit: 'g' },

    { key: 'omega-6-fat', label: 'Omega 6 fat', unit: 'g' },
    { key: 'linoleic-acid', label: 'Linoleic acid', unit: 'g' },
    { key: 'arachidonic-acid', label: 'Arachidonic acid', unit: 'g' },
    { key: 'gamma-linolenic-acid', label: 'Gamma-linolenic acid', unit: 'g' },
    { key: 'dihomo-gamma-linolenic-acid', label: 'Dihomo-gamma-linolenic acid', unit: 'g' },

    { key: 'omega-9-fat', label: 'Omega 9 fat', unit: 'g' },
    { key: 'oleic-acid', label: 'Oleic acid', unit: 'g' },
    { key: 'elaidic-acid', label: 'Elaidic acid', unit: 'g' },
    { key: 'gondoic-acid', label: 'Gondoic acid', unit: 'g' },
    { key: 'mead-acid', label: 'Mead acid', unit: 'g' },
    { key: 'erucic-acid', label: 'Erucic acid', unit: 'g' },
    { key: 'nervonic-acid', label: 'Nervonic acid', unit: 'g' },

    // Karbohidrat detail
    { key: 'sucrose', label: 'Sucrose', unit: 'g' },
    { key: 'glucose', label: 'Glucose', unit: 'g' },
    { key: 'fructose', label: 'Fructose', unit: 'g' },
    { key: 'lactose', label: 'Lactose', unit: 'g' },
    { key: 'maltose', label: 'Maltose', unit: 'g' },
    { key: 'maltodextrins', label: 'Maltodextrins', unit: 'g' },
    { key: 'starch', label: 'Starch', unit: 'g' },
    { key: 'polyols', label: 'Polyols', unit: 'g' },

    // Protein detail
    { key: 'casein', label: 'Casein', unit: 'g' },
    { key: 'serum-proteins', label: 'Serum proteins', unit: 'g' },
    { key: 'nucleotides', label: 'Nucleotides', unit: 'g' },

    // Mineral
    { key: 'potassium', label: 'Potassium', unit: 'mg' },
    { key: 'calcium', label: 'Calcium', unit: 'mg' },
    { key: 'iron', label: 'Iron', unit: 'mg' },
    { key: 'magnesium', label: 'Magnesium', unit: 'mg' },
    { key: 'zinc', label: 'Zinc', unit: 'mg' },
    { key: 'phosphorus', label: 'Phosphorus', unit: 'mg' },
    { key: 'copper', label: 'Copper', unit: 'mg' },
    { key: 'manganese', label: 'Manganese', unit: 'mg' },
    { key: 'fluoride', label: 'Fluoride', unit: 'mg' },
    { key: 'selenium', label: 'Selenium', unit: 'µg' },
    { key: 'chromium', label: 'Chromium', unit: 'µg' },
    { key: 'molybdenum', label: 'Molybdenum', unit: 'µg' },
    { key: 'iodine', label: 'Iodine', unit: 'µg' },
    { key: 'chloride', label: 'Chloride', unit: 'mg' },

    // Vitamin utama
    { key: 'vitamin-a', label: 'Vitamin A', unit: 'µg' },
    { key: 'beta-carotene', label: 'Beta carotene', unit: 'µg' },
    { key: 'vitamin-c', label: 'Vitamin C', unit: 'mg' },
    { key: 'vitamin-d', label: 'Vitamin D', unit: 'µg' },
    { key: 'vitamin-e', label: 'Vitamin E', unit: 'mg' },
    { key: 'vitamin-k', label: 'Vitamin K', unit: 'µg' },

    // Vitamin B complex
    { key: 'vitamin_b1', label: 'Vitamin B1 (Thiamin)', unit: 'mg' },
    { key: 'vitamin_b2', label: 'Vitamin B2 (Riboflavin)', unit: 'mg' },
    { key: 'vitamin_pp', label: 'Vitamin B3 (Niacin)', unit: 'mg' },
    { key: 'vitamin_b6', label: 'Vitamin B6', unit: 'mg' },
    { key: 'vitamin-b9', label: 'Vitamin B9 (Folate)', unit: 'µg' },
    { key: 'vitamin-b12', label: 'Vitamin B12', unit: 'µg' },
    { key: 'biotin', label: 'Biotin', unit: 'µg' },
    { key: 'pantothenic-acid', label: 'Pantothenic acid', unit: 'mg' },

    // Lainnya
    { key: 'caffeine', label: 'Caffeine', unit: 'mg' },
    { key: 'taurine', label: 'Taurine', unit: 'mg' },
    { key: 'silica', label: 'Silica', unit: 'mg' },
    { key: 'bicarbonate', label: 'Bicarbonate', unit: 'mg' },
    { key: 'ph', label: 'pH', unit: '' },
    { key: 'fruits-vegetables-nuts', label: 'Fruits/vegetables/nuts', unit: '%' },
    { key: 'collagen-meat-protein-ratio', label: 'Collagen/meat protein ratio', unit: '%' },
    { key: 'cocoa', label: 'Cocoa', unit: '%' },
    { key: 'chlorophyl', label: 'Chlorophyll', unit: 'mg' },
    { key: 'carbon-footprint', label: 'Carbon footprint', unit: 'g' }
  ];


  nutrimentUnits: { [key: string]: string[] } = {
    // Energy
    'energy-kcal': ['kcal'],
    'energy-from-fat': ['kcal'],

    // Lemak utama
    fat: ['g', 'mg', 'µg'],
    'saturated-fat': ['g', 'mg', 'µg'],
    'monounsaturated-fat': ['g', 'mg', 'µg'],
    'polyunsaturated-fat': ['g', 'mg', 'µg'],
    'trans-fat': ['g', 'mg', 'µg'],
    cholesterol: ['mg', 'µg', 'g'],

    // Asam lemak
    'butyric-acid': ['g', 'mg', 'µg'],
    'caproic-acid': ['g', 'mg', 'µg'],
    'caprylic-acid': ['g', 'mg', 'µg'],
    'capric-acid': ['g', 'mg', 'µg'],
    'lauric-acid': ['g', 'mg', 'µg'],
    'myristic-acid': ['g', 'mg', 'µg'],
    'palmitic-acid': ['g', 'mg', 'µg'],
    'stearic-acid': ['g', 'mg', 'µg'],
    'arachidic-acid': ['g', 'mg', 'µg'],
    'behenic-acid': ['g', 'mg', 'µg'],
    'lignoceric-acid': ['g', 'mg', 'µg'],
    'cerotic-acid': ['g', 'mg', 'µg'],
    'montanic-acid': ['g', 'mg', 'µg'],
    'melissic-acid': ['g', 'mg', 'µg'],

    // Omega
    'omega-3-fat': ['g', 'mg', 'µg'],
    'alpha-linolenic-acid': ['g', 'mg', 'µg'],
    'eicosapentaenoic-acid': ['g', 'mg', 'µg'],
    'docosahexaenoic-acid': ['g', 'mg', 'µg'],

    'omega-6-fat': ['g', 'mg', 'µg'],
    'linoleic-acid': ['g', 'mg', 'µg'],
    'arachidonic-acid': ['g', 'mg', 'µg'],
    'gamma-linolenic-acid': ['g', 'mg', 'µg'],
    'dihomo-gamma-linolenic-acid': ['g', 'mg', 'µg'],

    'omega-9-fat': ['g', 'mg', 'µg'],
    'oleic-acid': ['g', 'mg', 'µg'],
    'elaidic-acid': ['g', 'mg', 'µg'],
    'gondoic-acid': ['g', 'mg', 'µg'],
    'mead-acid': ['g', 'mg', 'µg'],
    'erucic-acid': ['g', 'mg', 'µg'],
    'nervonic-acid': ['g', 'mg', 'µg'],

    // Karbohidrat
    carbohydrates: ['g', 'mg', 'µg'],
    sugars: ['g', 'mg', 'µg'],
    sucrose: ['g', 'mg', 'µg'],
    glucose: ['g', 'mg', 'µg'],
    fructose: ['g', 'mg', 'µg'],
    lactose: ['g', 'mg', 'µg'],
    maltose: ['g', 'mg', 'µg'],
    maltodextrins: ['g', 'mg', 'µg'],
    starch: ['g', 'mg', 'µg'],
    polyols: ['g', 'mg', 'µg'],

    // Protein
    proteins: ['g', 'mg', 'µg'],
    casein: ['g', 'mg', 'µg'],
    'serum-proteins': ['g', 'mg', 'µg'],
    nucleotides: ['g', 'mg', 'µg'],

    // Serat
    fiber: ['g', 'mg', 'µg'],

    // Garam
    salt: ['g', 'mg', 'µg'],
    sodium: ['g', 'mg', 'µg'],

    // Alkohol
    alcohol: ['%'],

    // Mineral
    potassium: ['mg', 'µg'],
    calcium: ['mg', 'µg'],
    iron: ['mg', 'µg'],
    magnesium: ['mg', 'µg'],
    zinc: ['mg', 'µg'],
    phosphorus: ['mg', 'µg'],
    copper: ['mg', 'µg'],
    manganese: ['mg', 'µg'],
    fluoride: ['mg', 'µg'],
    selenium: ['µg', 'mg'],
    chromium: ['µg', 'mg'],
    molybdenum: ['µg', 'mg'],
    iodine: ['µg', 'mg'],
    chloride: ['mg', 'µg'],

    // Vitamin
    'vitamin-a': ['µg', 'mg'],
    'beta-carotene': ['µg', 'mg'],
    'vitamin-c': ['mg', 'µg'],
    'vitamin-d': ['µg', 'mg'],
    'vitamin-e': ['mg', 'µg'],
    'vitamin-k': ['µg', 'mg'],

    'vitamin-b1': ['mg', 'µg'],
    'vitamin-b2': ['mg', 'µg'],
    'vitamin-pp': ['mg', 'µg'],
    'vitamin-b6': ['mg', 'µg'],
    'vitamin-b9': ['µg', 'mg'],
    'vitamin-b12': ['µg', 'mg'],
    biotin: ['µg', 'mg'],
    'pantothenic-acid': ['mg', 'µg'],

    // Lainnya
    caffeine: ['mg', 'µg'],
    taurine: ['mg', 'µg'],
    silica: ['mg', 'µg'],
    bicarbonate: ['mg', 'µg'],
    ph: [''],
    'fruits-vegetables-nuts': ['%'],
    'collagen-meat-protein-ratio': ['%'],
    cocoa: ['%'],
    chlorophyl: ['mg', 'µg'],
    'carbon-footprint': ['g', 'mg']
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public _translation_service: TranslationService,
    private _loadingService: LoadingService,
    private location: Location,
    public _admobService: AdmobService
  ) {}

  ngOnInit() {
    
    this._translation_service.init();
    this._loadingService.showLoader();

    this.route.queryParams.subscribe(params => {
      this.productData = { code: params['code'] || '' };
      this.is_add_product = params['is_add_product'] === 'true';
      this.is_redirect_to_bookmark = params['is_redirect_to_bookmark'] === 'true';

      // this.initImageState();
      this.loadProduct();
      
    });


    if (this.product.labels && !this.product.labels_tags) {
      this.product.labels_tags = this.product.labels
        .split(',')
        .map((v: string) => v.trim())
        .filter((v: string) => v !== "");

    }
  }

  // prepareNutrimentsForForm() {
  //   const source = this.product?.nutriments || {};

  //   const list: any[] = [];

  //   // 1. masukkan default nutriments dulu
  //   this.defaultNutriments.forEach(n => {
  //     list.push({
  //       key: n.key,
  //       value: source[n.key] ?? null,
  //       unit: source[n.key + '_unit'] ?? n.unit
  //     });
  //   });

  //   // 2. tambahkan nutriments lain dari server (misalnya vitamin-a)
  //   Object.keys(source).forEach(key => {
  //     // ambil hanya key utama, bukan _unit, _100g, _value, dll
  //     if (
  //       !key.includes('_') &&                     // key utama saja
  //       !list.find(n => n.key === key)           // belum ada di list
  //     ) {
  //       list.push({
  //         key: key,
  //         value: source[key] ?? null,
  //         unit: source[key + '_unit'] ?? ''
  //       });
  //     }
  //   });

  //   this.nutrimentList = list;
  // }

  prepareNutrimentsForForm() {
    const source = this.product?.nutriments || {};
    const list: any[] = [];

    // 1. default nutriments → selalu tampil
    this.defaultNutriments.forEach(n => {
      const value =
        source[n.key + '_value'] ??
        source[n.key] ??
        null;

      list.push({
        key: n.key,
        value: value,
        unit: source[n.key + '_unit'] ?? n.unit
      });
    });

    // 2. additional nutriments → hanya jika punya value
    this.additionalNutriments.forEach(n => {
      const value =
        source[n.key + '_value'] ??
        source[n.key];

      if (value !== undefined && value !== null && value !== '') {
        list.push({
          key: n.key,
          value: value,
          unit: source[n.key + '_unit'] ?? n.unit
        });
      }
    });

    this.nutrimentList = list;
  }




  // initImageState() {
  //   this.imageFields.forEach(f => {
  //     this.imageLoading[f] = false;
  //     this.allImages[f] = [];
  //   });
  // }

  ionViewDidEnter() {
    this._loadingService.hideLoader();
  }

  buildNutrimentPayload() {
    const payload: any = {};

    this.nutrimentList.forEach(n => {
      payload[`nutriment_${n.key}`] = n.value;
      payload[`nutriment_${n.key}_unit`] = n.unit;
      payload[`nutriment_${n.key}_100g`] = n.value;
    });

    return payload;
  }


  loadProduct() {

    // ================= ADD PRODUCT =================
    if (this.is_add_product) {
      this.product = {
        code: this.productData.code,
        product_name: '',
        brands: '',
        nutriments: {}
      };

      // this._loadingService.hideLoader();
      return;
    }

    // ================= EDIT PRODUCT =================

    if (this.productData.code) {
      this.productService.product({ barcode_id: this.productData.code }).subscribe({
        next: (res: any) => {

          const p = res?.product || {};

          this.product = {
            ...p,
            nutriments: p.nutriments || {}
          };

          this.prepareNutrimentsForForm();
          if (!this.nutrimentList || this.nutrimentList.length === 0) {
            this.nutrimentList = [...this.defaultNutriments];
          }

          this._loadingService.hideLoader();
        },
        error: () => {
          this.product = { code: this.productData.code, product_name: '', brands: '' };
          // this.ensureImageFields();
          // this.allFields = Object.keys(this.product);
          this._loadingService.hideLoader();
        }
      });
    }
  }

  trackByKey(index: number, item: any) {
    return item.key;
  }

  humanizeNutrientKey(key: string) {
    return key
      .replace(/_100g|_serving/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  // ensureImageFields() {
  //   this.imageFields.forEach(f => {
  //     if (!this.product[f]) this.product[f] = '';
  //     if (!this.allImages[f]) this.allImages[f] = [];
  //     if (this.imageLoading[f] === undefined) this.imageLoading[f] = false;
  //   });
  // }

  // isImageField(field: string) {
  //   return this.imageFields.includes(field);
  // }

  friendlyLabel(field: string) {
    // nicer label e.g. image_front_url -> Front image
    return field.replace('image_', '').replace('_url', '').replace(/_/g, ' ');
  }

  // choose gallery item as main preview
  setMainPreview(field: string, url: string) {
    this.product[field] = url;
  }

  // file input handler
  onImageSelected(event: any, field: string) {
    const file: File = event.target.files && event.target.files[0];
    if (!file) return;

    const baseOffField = this.offMapping[field];
    if (!baseOffField) {
      console.warn('Unknown mapping for', field);
      return;
    }

    // append locale — using en as default (server expects e.g. packaging_en)
    const offField = `${baseOffField}_en`;

    const code = this.product?.code;
    if (!code) {
      this.showToast('Product code is missing. Please fill code first.');
      return;
    }

    // start loader for this field
    // this.imageLoading[field] = true;

    // immediate local preview (base64) so user sees something
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.product[field] = reader.result;
    // };
    // reader.readAsDataURL(file);

    // upload to OFF

    // this._loadingService.showLoader();
    this.productService.uploadImage(code, offField, file)
      .then((res: any) => {
        // server may return various shapes; handle them gracefully
        // const fileObj = res?.files?.[0] || res?.file || null;

        // if (fileObj?.url) {
        //   const abs = fileObj.url.startsWith('http') ? fileObj.url : `https://world.openfoodfacts.org${fileObj.url}`;

        //   // add to gallery if not present
        //   if (!this.allImages[field]) this.allImages[field] = [];
        //   if (!this.allImages[field].includes(abs)) this.allImages[field].unshift(abs);

        //   // set preview to server url (canonical)
        //   this.product[field] = abs;
        //   this.showToast('Image uploaded');
        // } else if (res?.thumbnailUrl) {
        //   // sometimes server replies with thumbnailUrl only
        //   const absThumb = res.thumbnailUrl.startsWith('http') ? res.thumbnailUrl : `https://world.openfoodfacts.org${res.thumbnailUrl}`;
        //   if (!this.allImages[field].includes(absThumb)) this.allImages[field].unshift(absThumb);
        //   this.product[field] = absThumb;
        //   this.showToast('Image uploaded');
        // } else if (res?.status === 1 || res?.status === '1') {
        //   // success but no URL returned → refresh to get actual urls
        //   this.showToast('Image uploaded (refreshing images)');
        // } else if (res?.error && res.error.includes('already been sent')) {
        //   // duplicate - server may still return files with thumbnailUrl
        //   if (fileObj?.thumbnailUrl) {
        //     const absThumb = fileObj.thumbnailUrl.startsWith('http') ? fileObj.thumbnailUrl : `https://world.openfoodfacts.org${fileObj.thumbnailUrl}`;
        //     if (!this.allImages[field].includes(absThumb)) this.allImages[field].unshift(absThumb);
        //     this.product[field] = absThumb;
        //   }
        //   this.showToast('Image already uploaded (duplicate). Refreshing gallery.');
        // } else {
        //   console.warn('Upload returned unknown format', res);
        //   this.showToast('Upload finished (no URL returned).');
        // }

        // always try to refresh OFF product images to get canonical list (but target loader only to this field)
        // setTimeout(() => this.refreshProductImages(code, field), 900);
        const thumbUrl = this.extractThumbUrl(res);

        // 👉 KHUSUS add product: set thumbnail saja
        if (this.is_add_product && thumbUrl) {
          this.product.image_thumb_url = thumbUrl;
          this.showToast('Image uploaded');
          return;
        }

        // 👉 EDIT MODE / VIEW MODE
        if (!this.is_add_product) {
          this.showToast('Image uploaded, we will check first');
        }

      })
      .catch(err => {

        this._loadingService.hideLoader();
        console.error('UPLOAD FAIL', err);
        this.showToast('Image upload failed');
        // this.imageLoading[field] = false;
      })
      .finally(() => {
        // ⬅️ WAJIB ADA

        this._loadingService.hideLoader();
        // this.refreshPageAll();
        // this.imageLoading[field] = false;
        if (!this.is_add_product) {
          this.refreshPageAll();
        }
      });
  }

  // called when <img> finished loading (network or base64)
  // onImageLoaded(field: string) {
  //   this.imageLoading[field] = false;
  // }

  // called on <img> error (timeout/broken) — clear loader and leave placeholder
  // onImageError(field: string) {
  //   this.imageLoading[field] = false;
  //   // optionally leave previous preview or replace with placeholder
  //   // this.product[field] = '';
  // }

  // refresh images from OFF and populate galleries; if specificField provided, only toggle loader for that
  // refreshProductImages(code: string, specificField?: string) {
  //   if (specificField) {
  //     this.imageLoading[specificField] = true;
  //   } else {
  //     this.imageFields.forEach(f => this.imageLoading[f] = true);
  //   }

  //   this.productService.product({ barcode_id: code }).subscribe({
  //     next: (res: any) => {
  //       const p = res?.product;
  //       if (!p) {
  //         if (specificField) this.imageLoading[specificField] = false;
  //         else this.imageFields.forEach(f => this.imageLoading[f] = false);
  //         return;
  //       }

  //       // parse all images into galleries
  //       this.extractAllImages(p);

  //       // ensure preview fields (legacy p[field]) are used if present, otherwise first gallery item
  //       this.imageFields.forEach(field => {
  //         const offVal = p[field];
  //         if (offVal) {
  //           this.product[field] = offVal;
  //         } else {
  //           const gallery = this.allImages[field] || [];
  //           if (gallery.length) this.product[field] = gallery[0];
  //         }
  //       });

  //       if (specificField) this.imageLoading[specificField] = false;
  //       else this.imageFields.forEach(f => this.imageLoading[f] = false);
  //     },
  //     error: (err) => {
  //       console.warn('Failed to refresh images:', err);
  //       if (specificField) this.imageLoading[specificField] = false;
  //       else this.imageFields.forEach(f => this.imageLoading[f] = false);
  //     }
  //   });
  // }

  // extract product.images into arrays grouped by our imageFields
  // extractAllImages(p: any) {
  //   const images = p?.images || {};
  //   const result: any = {};

  //   this.imageFields.forEach(field => {
  //     const short = field.replace('image_', '').replace('_url', ''); // example: image_front_url -> front
  //     const arr: string[] = [];

  //     Object.keys(images || {}).forEach(key => {
  //       // keys might be: 'front', 'front_1', 'front_en', 'front_en_1', 'nutrition_en_2', etc.
  //       // We consider keys that start with short (e.g. front)
  //       if (key.startsWith(short)) {
  //         const sizes = images[key]?.sizes || {};
  //         // prefer full, then 400, then display
  //         const candidate = sizes.full?.url || sizes['400']?.url || sizes.display?.url || null;
  //         if (candidate) {
  //           const abs = candidate.startsWith('http') ? candidate : `https://world.openfoodfacts.org${candidate}`;
  //           if (!arr.includes(abs)) arr.push(abs);
  //         }
  //       }
  //     });

  //     result[field] = arr;
  //   });

  //   this.allImages = result;
  // }

  // ---------------------------
  // submit product (add / edit)
  // ---------------------------

  async openAddNutrimentPopup() {
    const existingKeys = this.nutrimentList.map(n => n.key);

    const options: AlertInput[] = this.additionalNutriments
      .filter(n => !existingKeys.includes(n.key))
      .map(n => ({
        type: 'radio',
        label: this.translateNutrimentKey(n.key),
        value: n.key
      }));


    if (options.length === 0) {
      this.showToast('All nutriments already added');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Add Nutriment',
      inputs: options,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (selectedKey) => {
            this.addNutrimentByKey(selectedKey);
          }
        }
      ]
    });

    await alert.present();
  }

  addNutrimentByKey(key: string) {
    const item = this.additionalNutriments.find(n => n.key === key);
    if (!item) return;

    this.nutrimentList.push({
      key: item.key,
      value: null,
      unit: item.unit
    });
  }


  async submit() {

    this._loadingService.showLoader();

    this.isSubmitting = true;
    try {
      let res;
      if (this.is_add_product) {
        res = await this.productService.addProduct(this.product);
      } else {
        const nutrimentPayload = this.buildNutrimentPayload();

        const productPayload = {
          ...this.product,
          ...nutrimentPayload
        };
        delete productPayload.nutriments;
        res = await this.productService.editProduct(productPayload);
      }
      this.isSubmitting = false;

      this._loadingService.hideLoader();
      this._admobService.showInterstitial();
      await this.showToast('Product saved successfully');
      if (this.is_redirect_to_bookmark) {
        this.router.navigate(['/tabs/bookmark']);
      } else {
        this.router.navigate(['/get-product', this.productData?.code]);
      }
    } catch (err) {
      
      this._loadingService.hideLoader();
      console.error(err);
      this.isSubmitting = false;
      await this.showToast('Failed to save product');
    }
  }

  async showToast(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 5000, position: 'bottom' });
    t.present();
  }

  isLongText(v: any) {
    return typeof v === 'string' && v.length > 40;
  }

  newLabel = "";

  addLabel() {
    const label = this.newLabel.trim();
    if (!label) return;

    if (!this.product.labels_tags) {
      this.product.labels_tags = [];
    }

    if (!this.product.labels_tags.includes(label)) {
      this.product.labels_tags.push(label);
    }

    this.newLabel = "";

    this.syncLabelsString();
  }

  removeLabel(label: string) {
    this.product.labels_tags = this.product.labels_tags.filter((l: string) => l !== label);

    this.syncLabelsString();
  }

  // convert array → string "a, b, c"
  syncLabelsString() {
    this.product.labels = this.product.labels_tags.join(", ");
  }

  refreshPageAll() {
    const url = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(url);
    });
  }

  private extractThumbUrl(res: any): string | null {
    const thumb =
      res?.thumbnailUrl ||
      res?.image_thumb_url ||
      res?.files?.[0]?.thumbnailUrl ||
      res?.files?.[0]?.url;

    if (!thumb) return null;
    return thumb.startsWith('http')
      ? thumb
      : `https://world.openfoodfacts.org${thumb}`;
  }

  getUnitsFor(nutrimentKey: string): string[] {
    return this.nutrimentUnits[nutrimentKey] || ['g', 'mg', 'µg', '%'];
  }

  removeNutriment(index: number) {
    this.nutrimentList.splice(index, 1);
  }

  async openServingInfo() {
    const alert = await this.alertCtrl.create({
      header: this._translation_service.translateKey('serving_size'),
      message: this._translation_service.translateKey('serving_size_info'),
      buttons: ['OK']
    });

    await alert.present();
  }

  async openNutritionData() {
    const alert = await this.alertCtrl.create({
      header: this._translation_service.translateKey('nutrition_per'),
      message: this._translation_service.translateKey('nutrition_per_info'),
      buttons: ['OK']
    });

    await alert.present();
  }

  async openQuantityInfo() {
    const alert = await this.alertCtrl.create({
      header: this._translation_service.translateKey('quantity'),
      message: this._translation_service.translateKey('quantity_info'),
      buttons: ['OK']
    });

    await alert.present();
  }
    
  
  goBack() {
    if (this.is_add_product) {
      this.router.navigate(['/tabs/search']);
    } else {
      this.location.back();
    }
  }
  
  translateNutrimentKey(key: string): string {
    if (!key) return '';
    const normalizedKey = key.replace(/-/g, '_');
    return this._translation_service.translateKey(normalizedKey);
  }

  
  

}
