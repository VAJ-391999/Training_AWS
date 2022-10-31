import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { ProductService } from '../products.service';
import { CreateProduct } from 'src/app/shared/types/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile!: File;
  task!: AngularFireUploadTask;
  url: string = '';
  isUrlSet: boolean = false;
  basePath = '/images';
  progressValue!: Observable<number | undefined>;
  edit!: string;
  productId!: string;
  checked = true;
  productDetail: CreateProduct = {
    name: '',
    unitPrice: 0,
    imageUrl: '',
    description: '',
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly storage: AngularFireStorage,
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        this.edit = queryParams['edit'];
        this.productId = queryParams['productId'];
        console.log(typeof queryParams['edit']);
        if (this.edit && this.productId !== undefined) {
          this.productService
            .getProductDetail(this.productId)
            .subscribe((res) => {
              if (res) {
                console.log(res);
                this.productDetail.name = res.data.name;
                this.productDetail.description = res.data.description;
                this.productDetail.imageUrl = res.data.imageUrl;
                this.productDetail.unitPrice = res.data.unitPrice;
                this.url = res.data.imageUrl;
                this.initForm();
              }
            });
        } else {
          this.initForm();
        }
      },
    });
  }

  initForm = () => {
    this.productForm = this.formBuilder.group({
      name: [
        this.productDetail.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      unitPrice: [
        this.productDetail.unitPrice,
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      description: [
        this.productDetail.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1000),
        ],
      ],
    });
  };

  onSubmit = (productForm: FormGroup) => {
    if (this.edit === 'true') {
      this.productService
        .editProduct(this.productId, {
          name: productForm.value.name,
          unitPrice: productForm.value.unitPrice,
          imageUrl: this.url,
          description: productForm.value.description,
        })
        .subscribe({
          next: (response) => {
            console.log('Response', response);
          },
          complete: () => {
            this.router.navigate(['/admin/products']);
          },
        });
    } else {
      this.productService
        .createProduct({
          name: productForm.value.name,
          unitPrice: productForm.value.unitPrice,
          imageUrl: this.url,
          description: productForm.value.description,
        })
        .subscribe({
          next: (response) => {
            console.log('Response', response);
          },
          complete: () => {
            this.router.navigate(['/admin/products']);
          },
        });
    }
  };

  onFileSelected = async (event: any) => {
    this.isUrlSet = false;
    console.log('File changes');
    var n = Date.now();
    try {
      this.selectedFile = event.target.files[0];

      const filePath = `${this.basePath}/${n}-${this.selectedFile.name}`;
      this.task = this.storage.upload(filePath, this.selectedFile);

      this.progressValue = this.task.percentageChanges();
      (await this.task).ref.getDownloadURL().then((url: any) => {
        this.url = url;
        this.isUrlSet = true;
      });
      console.log(
        this.progressValue.subscribe({
          next: (res) => {
            console.log(res);
          },
        })
      );
    } catch (error) {
      throw new Error('Not able to upload image. Try after some time');
    }
  };

  imageUpdateToggleChange = (event: any) => {
    this.checked = event.checked;
    this.isUrlSet = !this.checked;
  };

  displayImageUpload = () => {
    const displayImageUpload =
      this.edit === 'false' ? true : this.checked ? true : false;
    return displayImageUpload;
  };
}
