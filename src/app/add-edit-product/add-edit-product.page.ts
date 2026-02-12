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

    // Karbohidrat detail
    { key: 'starch', label: 'Starch', unit: 'g' },
    { key: 'polyols', label: 'Polyols', unit: 'g' },

    // Mineral
    { key: 'potassium', label: 'Potassium', unit: 'mg' },
    { key: 'calcium', label: 'Calcium', unit: 'mg' },
    { key: 'iron', label: 'Iron', unit: 'mg' },
    { key: 'magnesium', label: 'Magnesium', unit: 'mg' },
    { key: 'zinc', label: 'Zinc', unit: 'mg' },
    { key: 'phosphorus', label: 'Phosphorus', unit: 'mg' },

    // Vitamin utama
    { key: 'vitamin-a', label: 'Vitamin A', unit: 'µg' },
    { key: 'vitamin-c', label: 'Vitamin C', unit: 'mg' },
    { key: 'vitamin-d', label: 'Vitamin D', unit: 'µg' },
    { key: 'vitamin-e', label: 'Vitamin E', unit: 'mg' },
    { key: 'vitamin-k', label: 'Vitamin K', unit: 'µg' },

    // Vitamin B complex
    { key: 'vitamin-b1', label: 'Vitamin B1 (Thiamin)', unit: 'mg' },
    { key: 'vitamin-b2', label: 'Vitamin B2 (Riboflavin)', unit: 'mg' },
    { key: 'vitamin-b3', label: 'Vitamin B3 (Niacin)', unit: 'mg' },
    { key: 'vitamin-b5', label: 'Vitamin B5 (Pantothenic acid)', unit: 'mg' },
    { key: 'vitamin-b6', label: 'Vitamin B6', unit: 'mg' },
    { key: 'vitamin-b9', label: 'Vitamin B9 (Folate)', unit: 'µg' },
    { key: 'vitamin-b12', label: 'Vitamin B12', unit: 'µg' },

    // Lainnya
    { key: 'caffeine', label: 'Caffeine', unit: 'mg' },
    { key: 'taurine', label: 'Taurine', unit: 'mg' }
  ];

  nutrimentUnits: { [key: string]: string[] } = {
    'energy-kcal': ['kcal'],
    fat: ['g', 'mg', 'µg'],
    'saturated-fat': ['g', 'mg', 'µg'],
    carbohydrates: ['g', 'mg', 'µg'],
    sugars: ['g', 'mg', 'µg'],
    proteins: ['g', 'mg', 'µg'],
    salt: ['g', 'mg', 'µg'],
    sodium: ['g', 'mg', 'µg'],
    fiber: ['g', 'mg', 'µg'],
    alcohol: ['%'],
    cholesterol: ['g', 'mg', 'µg']
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
        label: n.label,
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
      this._admobService.showInterstitial()
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

  
  

}
