import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/api/product.service';
import { LoadingService } from 'src/app/api/loading.service';

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
  allFields: string[] = [];
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastCtrl: ToastController,
    private _loadingService: LoadingService
  ) {}

  ngOnInit() {
    
    this._loadingService.showLoader();

    this.route.queryParams.subscribe(params => {
      this.productData = { code: params['code'] || '' };
      this.is_add_product = params['is_add_product'] === 'true';
      this.is_redirect_to_bookmark = params['is_redirect_to_bookmark'] === 'true';

      this.initImageState();
      this.loadProduct();
      
    });


    if (this.product.labels && !this.product.labels_tags) {
      this.product.labels_tags = this.product.labels
        .split(',')
        .map((v: string) => v.trim())
        .filter((v: string) => v !== "");

    }
  }

  initImageState() {
    this.imageFields.forEach(f => {
      this.imageLoading[f] = false;
      this.allImages[f] = [];
    });
  }

  ionViewDidEnter() {
    this._loadingService.hideLoader();
  }

  loadProduct() {
    // ADD NEW (from scan)
    if (this.is_add_product) {
      this.product = {
        code: this.productData.code,
        product_name: '',
        brands: ''
      };
      this.ensureImageFields();
      this.allFields = Object.keys(this.product);
      return;
    }

    // EDIT existing product from OFF
    if (this.productData.code) {
      this.productService.product({ barcode_id: this.productData.code }).subscribe({
        next: (response: any) => {
          const p = response?.product;
          this.product = p ? { ...p, code: p.code || this.productData.code } : { code: this.productData.code, product_name: '', brands: '' };
          // debugger
          this.ensureImageFields();

          // extract gallery and choose sensible preview if field empty
          this.extractAllImages(p);
          this.imageFields.forEach(field => {
            if (!this.product[field]) {
              const gallery = this.allImages[field] || [];
              if (gallery.length) this.product[field] = gallery[0];
            }
          });

          this.allFields = Object.keys(this.product);
          // this._loadingService.hideLoader();

        },
        error: () => {
          this.product = { code: this.productData.code, product_name: '', brands: '' };
          this.ensureImageFields();
          this.allFields = Object.keys(this.product);
          // this._loadingService.hideLoader();

        }
      });
      return;
    }

    // Manual add
    this.product = {
      code: '',
      product_name: '',
      product_name_en: '',
      brands: '',
      quantity: '',
      
      // ingredients
      ingredients_text: '',

      // labels
      labels_tags: [],

      // images
      image_front_url: '',
      image_ingredients_url: '',
      image_nutrition_url: '',
      image_packaging_url: ''
    };

    this.ensureImageFields();
    this.allFields = Object.keys(this.product);
    // this._loadingService.hideLoader();
  }

  ensureImageFields() {
    this.imageFields.forEach(f => {
      if (!this.product[f]) this.product[f] = '';
      if (!this.allImages[f]) this.allImages[f] = [];
      if (this.imageLoading[f] === undefined) this.imageLoading[f] = false;
    });
  }

  isImageField(field: string) {
    return this.imageFields.includes(field);
  }

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
    this.imageLoading[field] = true;

    // immediate local preview (base64) so user sees something
    const reader = new FileReader();
    reader.onload = () => {
      this.product[field] = reader.result;
    };
    reader.readAsDataURL(file);

    // upload to OFF
    this.productService.uploadImage(code, offField, file)
      .then((res: any) => {
        // server may return various shapes; handle them gracefully
        const fileObj = res?.files?.[0] || res?.file || null;

        if (fileObj?.url) {
          const abs = fileObj.url.startsWith('http') ? fileObj.url : `https://world.openfoodfacts.org${fileObj.url}`;

          // add to gallery if not present
          if (!this.allImages[field]) this.allImages[field] = [];
          if (!this.allImages[field].includes(abs)) this.allImages[field].unshift(abs);

          // set preview to server url (canonical)
          this.product[field] = abs;
          this.showToast('Image uploaded');
        } else if (res?.thumbnailUrl) {
          // sometimes server replies with thumbnailUrl only
          const absThumb = res.thumbnailUrl.startsWith('http') ? res.thumbnailUrl : `https://world.openfoodfacts.org${res.thumbnailUrl}`;
          if (!this.allImages[field].includes(absThumb)) this.allImages[field].unshift(absThumb);
          this.product[field] = absThumb;
          this.showToast('Image uploaded');
        } else if (res?.status === 1 || res?.status === '1') {
          // success but no URL returned → refresh to get actual urls
          this.showToast('Image uploaded (refreshing images)');
        } else if (res?.error && res.error.includes('already been sent')) {
          // duplicate - server may still return files with thumbnailUrl
          if (fileObj?.thumbnailUrl) {
            const absThumb = fileObj.thumbnailUrl.startsWith('http') ? fileObj.thumbnailUrl : `https://world.openfoodfacts.org${fileObj.thumbnailUrl}`;
            if (!this.allImages[field].includes(absThumb)) this.allImages[field].unshift(absThumb);
            this.product[field] = absThumb;
          }
          this.showToast('Image already uploaded (duplicate). Refreshing gallery.');
        } else {
          console.warn('Upload returned unknown format', res);
          this.showToast('Upload finished (no URL returned).');
        }

        // always try to refresh OFF product images to get canonical list (but target loader only to this field)
        setTimeout(() => this.refreshProductImages(code, field), 900);
      })
      .catch(err => {
        console.error('UPLOAD FAIL', err);
        this.showToast('Image upload failed');
        this.imageLoading[field] = false;
      });
  }

  // called when <img> finished loading (network or base64)
  onImageLoaded(field: string) {
    this.imageLoading[field] = false;
  }

  // called on <img> error (timeout/broken) — clear loader and leave placeholder
  onImageError(field: string) {
    this.imageLoading[field] = false;
    // optionally leave previous preview or replace with placeholder
    // this.product[field] = '';
  }

  // refresh images from OFF and populate galleries; if specificField provided, only toggle loader for that
  refreshProductImages(code: string, specificField?: string) {
    if (specificField) {
      this.imageLoading[specificField] = true;
    } else {
      this.imageFields.forEach(f => this.imageLoading[f] = true);
    }

    this.productService.product({ barcode_id: code }).subscribe({
      next: (res: any) => {
        const p = res?.product;
        if (!p) {
          if (specificField) this.imageLoading[specificField] = false;
          else this.imageFields.forEach(f => this.imageLoading[f] = false);
          return;
        }

        // parse all images into galleries
        this.extractAllImages(p);

        // ensure preview fields (legacy p[field]) are used if present, otherwise first gallery item
        this.imageFields.forEach(field => {
          const offVal = p[field];
          if (offVal) {
            this.product[field] = offVal;
          } else {
            const gallery = this.allImages[field] || [];
            if (gallery.length) this.product[field] = gallery[0];
          }
        });

        if (specificField) this.imageLoading[specificField] = false;
        else this.imageFields.forEach(f => this.imageLoading[f] = false);
      },
      error: (err) => {
        console.warn('Failed to refresh images:', err);
        if (specificField) this.imageLoading[specificField] = false;
        else this.imageFields.forEach(f => this.imageLoading[f] = false);
      }
    });
  }

  // extract product.images into arrays grouped by our imageFields
  extractAllImages(p: any) {
    const images = p?.images || {};
    const result: any = {};

    this.imageFields.forEach(field => {
      const short = field.replace('image_', '').replace('_url', ''); // example: image_front_url -> front
      const arr: string[] = [];

      Object.keys(images || {}).forEach(key => {
        // keys might be: 'front', 'front_1', 'front_en', 'front_en_1', 'nutrition_en_2', etc.
        // We consider keys that start with short (e.g. front)
        if (key.startsWith(short)) {
          const sizes = images[key]?.sizes || {};
          // prefer full, then 400, then display
          const candidate = sizes.full?.url || sizes['400']?.url || sizes.display?.url || null;
          if (candidate) {
            const abs = candidate.startsWith('http') ? candidate : `https://world.openfoodfacts.org${candidate}`;
            if (!arr.includes(abs)) arr.push(abs);
          }
        }
      });

      result[field] = arr;
    });

    this.allImages = result;
  }

  // ---------------------------
  // submit product (add / edit)
  // ---------------------------
  async submit() {
    this.isSubmitting = true;
    try {
      let res;
      if (this.is_add_product) {
        res = await this.productService.addProduct(this.product);
      } else {
        res = await this.productService.editProduct(this.product);
      }
      this.isSubmitting = false;
      await this.showToast('Product saved successfully');
      if (this.is_redirect_to_bookmark) {
        this.router.navigate(['/tabs/bookmark']);
      } else {
        this.router.navigate(['/get-product', this.productData?.code]);
      }
    } catch (err) {
      console.error(err);
      this.isSubmitting = false;
      await this.showToast('Failed to save product');
    }
  }

  async showToast(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 2000, position: 'bottom' });
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


}
